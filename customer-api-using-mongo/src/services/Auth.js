const { default: mongoose } = require('mongoose')

const {compare} = require('../utils/bcrypt')
const {dateNow} = require('../utils/time')
const sendMail = require('../helper/sendMail/sendGrid')
const {accessTokenExpiracy} = require('../helper/constants/expiracyTime')
const {getUserByEmail} = require('./SearchUser') 
const { BadRequest, Unauthorized } = require('../utils/errors/errors')
const {Users,Sessions, ConfirmationCode, RefreshToken} = require('../models')
const {generateAccessToken, genereateRefreshToken, verifyToken} = require('../utils/jwtauthentication')

/**
 * 
 * @param {String} email 
 * @param {String} password 
 * @returns 
 */
exports.login = async (email,password) => {

    let isPasswordValid = false;
    try {
        const existedUser = await Users.findOne({email, deleted: false});
        if(existedUser) {
             isPasswordValid = await compare(password,existedUser.password);
        }
        if(!existedUser || !isPasswordValid) throw new Unauthorized('Invalid email or password');
        
        // generate token for valid user
        let payload = {
            username: existedUser.username,
            id: existedUser._id,
            role : existedUser.role
        }
        const token =  generateAccessToken(payload);

         // check if there is session for user
        let session = await Sessions.findOne({user_id: existedUser._id});

        if(session == null) {
            session = new Sessions({
                user_id : existedUser._id,
                token,
                is_valid: true
            })
    
            await session.save(); 
        } else if (session.is_valid == false || session?.expires_at <= Date.now()){
            const expires_at = dateNow.addSeconds(accessTokenExpiracy);
            session = await Sessions.findOneAndUpdate({user_id: existedUser._id},{is_valid: true, token: token, expires_at})
        } else{
            return {
                message: 'User already logged in '
            }
        }

        // find refresh token 
        let refreshToken = await RefreshToken.findOne({user_id: existedUser._id, status: 'active', revoked: false});
        if(!refreshToken || !(refreshToken && !refreshToken.expires_at <= new Date())) {
            if(!!refreshToken) {
                await RefreshToken.findOneAndUpdate({_id: refreshToken.id}, {status: 'expired'})
            }
            let generateNewToken = genereateRefreshToken(payload);
            refreshToken = new RefreshToken({user_id: existedUser._id,status: 'active',token: generateNewToken});  
            await refreshToken.save()  
        } 

        return {
            accessToken: token,
            refreshToken: refreshToken.token
        }

    } catch (error) {
        throw (error)
    }
}

/**
 * 
 * @param {String} id 
 * @returns 
 */
exports.logout = async (id) => {
    try {
        const session = await Sessions.findOne({user_id: id}).lean();
        // if there is no session for user
        if(!session || !session.is_valid || session?.expires_at <= new Date()){
            throw new BadRequest('User not logged in!');
        }

        await Sessions.findOneAndUpdate({user_id: id},{is_valid: false})

        return {
            success: true,
            message: "User logged out successfully!"
        }

    } catch (error) {
        throw (error)
    }
}

/**
 * 
 * @param {String} confimationcode 
 * @param {mongoose.Types.ObjectId} userid 
 */
exports.verifyEmail = async (confimationcode, userid) => {
   try {
    // find user with userid
    const existUser = await Users.findOne({uuid: userid}).lean();
    if(!existUser) throw new Unauthorized('Invalid confirmation token!')
    
    // check code validation
    const validCode = await ConfirmationCode.findOne({user_id: existUser._id, code : confimationcode})
    if(validCode?.expires_at<=new Date()) {
        // delete the confirmation code
        await ConfirmationCode.deleteOne({_id: validCode._id})
        throw new Unauthorized('Confirmation token has expired')
    }

    await Users.findOneAndUpdate({_id: existUser._id},{status: 'active'})
    
    return {
        success: true,
        message: 'Email verified !'
    }
   } catch (error) {
       throw (error)
   }
}

/**
 * 
 * @param {mongoose.Types.ObjectId} user_id 
 */
exports.resendToken = async (user_id) => {
    try {
        let existUser = await Users.find({_id: user_id})
        if(!existUser) throw new BadRequest('User does not exist!')
        if(existUser.status == 'active') return {message: 'Email is verified!'} 

        await ConfirmationCode.findOneAndDelete({user_id})

        // create confirmation code and save to db
        const conformationcode = crypto.randomBytes(32).toString('hex');
        const code = new ConfirmationCode({user_id: existUser.id, code: conformationcode})
        await code.save();
        
        let confirmUrl = `${baseURL}/auth/confirm/${conformationcode}/${existUser.uuid}`

        // send verification mail
        const response = await sendMail({
            email: existUser.email,
            subject: 'Please verify your email',
            content: `<p>Thank you for choosing our app!</p>
            <p> please click the following link to verify your mail</p>
            <a href="${confirmUrl}">Verify email</a>
            <p>If you did not register the email ignore the link</p>
            `
        })
        return response;
    } catch (error) {
        throw (error)
    }
}

/**
 * 
 * @param {String} refreshToken 
 * @param {String} accessToken 
 */
exports.refreshToken = async (refreshToken , accessToken) => {
    try{
        let decoded = verifyToken(refreshToken);
        const existRefreshToken = await RefreshToken.findOne({user_id : decoded.id, token: refreshToken, status: 'active'})
        if(!existRefreshToken) throw new Unauthorized('Invalid Refresh Token!')
        let existToken = await Sessions.findOne({user_id: decoded.id, token: accessToken})
        if(!existToken) throw new Unauthorized('Refresh token and access token does not refer to same user')

        let {iat,exp,...payload} = decoded;
        const newAccessToken = generateAccessToken(payload);

        // replace old access token
        const newToken = await Sessions.findOneAndUpdate({user_id: decoded.id, token: accessToken}, {token: newAccessToken, is_valid: true});
    return {
        accessToken: newAccessToken,
        refreshToken
    }
    }catch(error) {
        throw(error)
    }
}

/**
 * 
 * @param {String} refreshToken 
 * @param {Object.Types.id} user_id 
 * @returns 
 */
exports.revokeRefreshToken = async (refreshToken, user_id) => {
    let date = new Date();
    let updateData = {
        revoked: true,
        revoked_at: date,
        status : 'revoked'
    }
    try {  
        const oldTokeModel = await RefreshToken.findOne({token: refreshToken, user_id})
        if(!oldTokeModel) throw new BadRequest('Refresh token not valid')
        await RefreshToken.findOneAndUpdate({id: oldTokeModel.id}, {...updateData} )
        return {
            success: true,
            message: "Token revoked"
        }
    } catch (error) {
        throw error
    }
}