require('dotenv').config();
const jwt = require('jsonwebtoken');

const logger = require('./loggor')
const {refreshTokenExpiracy,accessTokenExpiracy} = require('../helper/constants/expiracyTime'); 
const { Unauthorized } = require('./errors/errors');

const TOKEN_SECRET = process.env.TOKEN_SECRET

exports.generateAccessToken = (payload = {}) => {
    return jwt.sign(payload,TOKEN_SECRET,{
        expiresIn : '2h'
    })
}

exports.genereateRefreshToken = (payload = {}) => {
    return jwt.sign(payload,TOKEN_SECRET,{
        expiresIn: refreshTokenExpiracy
    })
}

exports.verifyToken = (token) => {
    try {
        var decoded = jwt.verify(token,TOKEN_SECRET);
    } catch(error) {
        logger.error(error);
        // console.log(error)
        // decoded = {error: 'Token expired!'};
        throw new Unauthorized(error.message)
    }
    return decoded;
}


