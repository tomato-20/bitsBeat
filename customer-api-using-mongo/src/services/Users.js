const {default : mongoose} = require('mongoose')
const Users = require('../models/Users');

const logger = require('../utils/loggor')
const {getUserByEmail, getUserByID} = require('./SearchUser');
const { Unauthorized, BadRequest } = require('../utils/errors/errors');




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

        // return the responst
        return {
            userName: user.username,
            id: user.id
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