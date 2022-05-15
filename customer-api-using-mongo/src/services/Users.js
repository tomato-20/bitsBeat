const {default : mongoose} = require('mongoose')
const Users = require('../models/Users');
const logger = require('../utils/loggor')
const crypt = require('../utils/bcrypt');
const { updateOne } = require('../models/Users');
const { hash } = require('bcrypt');

/**
 * 
 * @param {String} email 
 * @returns user if found
 */
exports.getUserByEmail = async (email) => {
    try {
        const user = await Users.findOne({ email , deleted: false})
        return user
    } catch (error) {
        throw error
    }
}

/**
 * 
 * @param {string} id 
 * @returns 
 */
exports.getUserByID = async (id) => {
    try {
        let user = await Users.findById(id)
        return user.deleted ? null : user;
    } catch (error) {
        throw error
    }
}


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
        const userExist = await this.getUserByEmail(payload.email)
        if (!!userExist) {
            logger.error('user already exist');
            throw new Error('User already exist');
        }

        // hash the password 
        const hash = await crypt.hash(payload.password);
        userData = {
            ...payload,
            ...userData,
            password: hash,
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
        const user = await this.getUserByID(id); 
        if (!user) {
            throw new Error('User not found')
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
    let update  = {};
   try{
    const user = await this.getUserByID(id);
    if(!user) throw new Error('User not found');
    
    update = {
        ...payload
    }

    if(payload.password) {
        hash = await crypt.hash(payload.password);
        update.password = hash
    }

    await Users.findOneAndUpdate({_id: id},update);

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
        const userExist = await this.getUserByID(id);
        if(!userExist) throw new Error ('User does not exits');
        await Users.findOneAndUpdate({_id : id},{deleted: true});
        return {
            msg: `User successfully deleted`
        }
    } catch (error) {
        throw(error)
    }
    
}