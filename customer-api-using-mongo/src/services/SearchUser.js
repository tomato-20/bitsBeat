
const {Users} = require('../models');
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
        let user = await Users.findById(id).lean()
        if(!user) return null
        return user.deleted ? null : user;
    } catch (error) {
        throw error
    }
}