const bcrypt = require('bcrypt');
require('dotenv').config()

// const SALT = process.env.SALT ;

/**
 * Hash a provided password
 * @param {String} password 
 * @returns string | a hash value
 */
exports.hash = async (password) => {
    try {
        const SALT = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,SALT);
        return hashedPassword;
    }catch(error) {
        throw new Error ('Cannot Hash')
    }
}

/**
 * compare password with a hash
 * @param {String} password 
 * @param {String} hash 
 * @returns Boolean | true if password is correct 
 */
exports.compare = async (password,hash) => {
    try {
        const result = await bcrypt.compare(password,hash);
        return result;
    } catch (error) {
        throw new Error ('Compare Password went wrong')
    }
}

