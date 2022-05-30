const { default: mongoose } = require('mongoose')

const {Users,Sessions, ConfirmationCode, refreshToken, RefreshToken} = require('../models')

const {generateAccessToken, genereateRefreshToken, verifyToken} = require('../utils/jwtauthentication')
const {compare} = require('../utils/bcrypt')
const {getUserByEmail} = require('./SearchUser') 
const { BadRequest, Unauthorized } = require('../utils/errors/errors')

/**
 * 
 * @param {String} email 
 * @param {String} password 
 * @returns 
 */
exports.login = async (email,password) => {

    let isPasswordValid = false;
    try {
        const existedUser = await getUserByEmail(email);
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
        let session = await Sessions.findOne({user_id: existedUser._id}).lean();

        if(session == null) {
            session = new Sessions({
                user_id : existedUser._id,
                token,
                is_valid: true
            })
    
            await session.save(); 
        } else if (session.is_valid == false){
            session = await Sessions.findOneAndUpdate({user_id: existedUser._id},{is_valid: true, token: token})
        } else{
            return {
                msg: 'User already logged in '
            }
        }

        // find refresh token 
        let refreshToken = await RefreshToken.findOne({user_id: existedUser._id, status: 'active'});
        if(!refreshToken) {
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
        if(!session || !session.is_valid){
            throw new BadRequest('User not logged in!');
        }

        await Sessions.findOneAndUpdate({user_id: id},{is_valid: false})

        return {
            msg: "User logged out successfully!"
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
    const dateNow = new Date();
   try {
    // find user with userid
    const existUser = await Users.findOne({uuid: userid}).lean();
    if(!existUser) throw new Unauthorized('Invalid confirmation token!')
    
    // check code validation
    const validCode = await ConfirmationCode.findOne({user_id: existUser._id, code : confimationcode})
    if(validCode?.expires_at<dateNow) {
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
 * @param {String} refreshToken 
 * @param {String} accessToken 
 */
exports.refreshToken = async (refreshToken , accessToken) => {
    try{
        let decoded = verifyToken(refreshToken);
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