const User = require('../models/Users')

const {generateAccessToken} = require('../utils/jwtauthentication')
const {compare} = require('../utils/bcrypt')
const {getUserByEmail} = require('./SearchUser') 
const Sessions = require('../models/Sessions')

exports.login = async (email,password) => {
    // input validation
    if (!email || !password) throw new Error('Email and password are requried')

    let isPasswordValid = false;
    try {
        const existedUser = await getUserByEmail(email);
        if(existedUser) {
             isPasswordValid = await compare(password,existedUser.password);
        }
        if(!existedUser || !isPasswordValid) throw new Error('Invalid email or password');
        
        // generate token for valid user
        const token = await generateAccessToken({
            username: existedUser.username,
            id: existedUser._id
        });

         // check if there is session for user
        const user = await Sessions.findOne({user_id: existedUser._id}).lean();

        let session = null;
        if(user == null) {
            session = new Sessions({
                user_id : existedUser._id,
                token,
                is_valid: true
            })
    
            await session.save(); 
        } else if (user.is_valid == false){
            session = await Sessions.findOneAndUpdate({user_id: existedUser._id},{is_valid: true, token: token})
        } else{
            return {
                msg: 'User already logged in '
            }
        }
        return {
            token: token
        }
    } catch (error) {
        throw (error)
    }
}

exports.logout = async (id) => {
    try {
        const session = await Sessions.findOne({user_id: id}).lean();
        // if there is no session for user
        if(!session || !session.is_valid){
            throw new Error('User not logged in!');
        }

        await Sessions.findOneAndUpdate({user_id: id},{is_valid: false})

        return {
            msg: "User logged out successfully!"
        }

    } catch (error) {
        throw (error)
    }
}