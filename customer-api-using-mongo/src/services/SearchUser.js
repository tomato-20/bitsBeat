
const Users = require('../models/Users');
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