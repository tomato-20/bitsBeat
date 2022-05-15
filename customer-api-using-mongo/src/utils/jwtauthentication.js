const jwt = require('jsonwebtoken');
require('dotenv').config();
const logger = require('./loggor')

const TOKEN_SECRET = process.env.TOKEN_SECRET

exports.generateAccessToken = (payload = {}) => {
    return jwt.sign(payload,TOKEN_SECRET)
}

exports.verifyToken = (token) => {
    try {
        var decoded = jwt.verify(token,TOKEN_SECRET);
    } catch(error) {
        logger.error(error);
        decoded = null;
    }
    return decoded;
}

