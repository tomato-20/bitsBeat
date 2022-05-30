require('dotenv').config()
const crypto = require('crypto')
const {Users,Sessions,ConfirmationCode} = require('../models')

const logger = require('../utils/loggor')
const crypt = require('../utils/bcrypt')
const sendMail = require('../helper/sendMail/sendGrid')
const {getUserByEmail, getUserByID} = require('./SearchUser')
const { Unauthorized, BadRequest } = require('../utils/errors/errors')

const baseURL = process.env.BASE_URL

/**
 * Create a new user
 * @param {*} payload 
 * @returns response data 
 */
exports.createUser = async (payload) => {
    let userData = {
        username: payload.username,
        email: payload.email,
    };

    try {
        // check if user already existed
        const userExist = await getUserByEmail(payload.email)
        if (!!userExist) {
            logger.error('user already exist');
            throw new BadRequest('User already exist');
        }

        // hash the password 
        userData = {
            ...payload,
            ...userData,
        }

        // save new user to database
        const user = new Users(userData);
        await user.save()

        // create confirmation code and save to db
        const conformationcode = crypto.randomBytes(32).toString('hex');
        const code = new ConfirmationCode({user_id: user.id, code: conformationcode})
        await code.save();
        
        let confirmUrl = `${baseURL}/auth/confirm/${conformationcode}/${user.uuid}`

        // send verification mail
        const response = await sendMail({
            email: user.email,
            subject: 'Please verify your email',
            content: `<p>Thank you for choosing our app!</p>
            <p> please click the following link to verify your mail</p>
            <a href="${confirmUrl}">Verify email</a>
            <p>If you did not register the email ignore the link</p>
            `
        })

        // return the responst
        return {
            message: 'Check your mail to verify the account!',
            data: {
                userName: user.username,
                id: user.id,
            }
        }

    } catch (error) {
        logger.error(error)
        throw (error)
    }
}

/**
 * 
 * @param {string} id 
 * @returns user if found
 */
exports.getUserDetailById = async (id) => {
    try { 
        const user = await getUserByID(id); 
        if (!user) {
            throw new Unauthorized('User not found')
        };
        user.password = undefined,
        user.uuid = undefined
        user.deleted = undefined
        return user
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} id 
 * @param {Object} payload 
 * @returns 
 */
exports.updateUserById =  async (id,payload) => {

   try{
    const user = await getUserByID(id);
    if(!user) throw new Unauthorized('User not found');
    

    await Users.findOneAndUpdate({_id: id},payload);

    return {
        msg : "User Update Successful!"
    }

   }catch(err) {
       throw err
   }
}

/**
 * 
 * @param {String} id 
 */
exports.deleteUserById = async (id) => {
    try {
        const userExist = await getUserByID(id);
        if(!userExist) throw new Unauthorized ('User does not exits');
       
        await Users.findOneAndUpdate({_id : id},{deleted: true, deleted_at: Date.now()});

        return {
            msg: `User successfully deleted`
        }
    } catch (error) {
        throw(error)
    }
    
}

/**
 * 
 * @param {String} id 
 * @param {String} oldPassword 
 * @param {String} newPassword 
 * @returns Object {message : <String>}
 */
exports.changeUserPassword = async (id, oldPassword, newPassword) => {
    try{
        const existUser = await getUserByID(id);
        if(!existUser) throw new BadRequest('Cannot get user!')
        
        // compare the previous password
        if(! await crypt.compare(oldPassword,existUser.password)) throw new Unauthorized('Old password does not match');

        // new password cannot be old password
        if( await crypt.compare(newPassword,existUser.password)) throw new BadRequest('New password cannot be old password');

        // replace the old password
        const newPasswordHash = await crypt.hash(newPassword)
        await Users.findOneAndUpdate({_id: id},{password: newPasswordHash})

        // TODO : logout user 
        await Sessions.findOneAndUpdate({user_id: id},{is_valid: false})

        return {
            message: "Password change successful!"
        }

    }catch(error) {
        throw (error)
    }
} 
