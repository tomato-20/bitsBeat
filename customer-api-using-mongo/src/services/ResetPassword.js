require('dotenv').config();
const crypto = require('crypto');
const BASE_URL = process.env.BASE_URL;

const Users = require('../models/Users')
const ResetToken = require('../models/PasswordResetToken')
const crypt = require('../utils/bcrypt')
const {BadRequest, Unauthorized} = require('../utils/errors/errors');
const sendMail = require('../helper/sendMail/sendGrid');
const Sessions = require('../models/Sessions');

exports.requestResetPassword = async (email) =>{
    let token = "this is token"

    try {
        const existUser = await Users.findOne({email});
        if(!existUser) throw new BadRequest('User does not exist!');

        // generate token and save token into db
        // hash of the token is generated before create 
        const token = crypto.randomBytes(32).toString('hex');

        // replace previous token with the new token if already exist
        const existToken = await ResetToken.findOne({user_id : existUser._id});
        if (existToken) {
            await ResetToken.deleteOne({user_id: existUser._id});
        }

        const newTokenDoc =await new ResetToken({
            user_id : existUser._id,
            token
        }).save()   

        // create an reset pass link to the user 
        const resetUrl = `${BASE_URL}/password_reset/${existUser.uuid}/${token}`

        const response = await sendMail({
            email: existUser.email,
            subject: 'Reset password',
            content: `<p>Please click the following link to reset your email<p>
            <p>${resetUrl}</>
            <p>If you did not request password reset please ignore this mail</p>
            `
        })

        // logout user
        await Sessions.deleteOne({user_id: existUser._id})

        return  {
            message: 'Mail sent success!'
        }
    } catch ( error) {
        throw(error)
    }
}

exports.resetPassword = async (userId, tokenId, newPassword) => {
   
    const currentDateTime = Date.now();
    try {
    // search in user table for user with uuid = userId 
       const exitUser = await Users.findOne({uuid: userId});

       if(!exitUser) {
           throw new Unauthorized('Invalid token');
       }

    // get hashed token from reset token table for user._id 
       
       const foundToken = await ResetToken.findOne({user_id: exitUser._id});
       
       if(!foundToken) {
           throw new BadRequest('Invalid token');
        }

    // check if the token is valid 
        let isValid = await crypt.compare(tokenId,foundToken.token) 
        let hasExpired = currentDateTime > foundToken.expires_at;
        if(!isValid || hasExpired) {
            throw new BadRequest('Token is invalid or expired!');
        }

        await Users.findOneAndUpdate({uuid: userId}, {newPassword});

        await ResetToken.deleteOne({user_id: existUser._id});

        return {
            msg: "Password reset successful"
        }
    }catch(error){
        throw(error)
    }
}