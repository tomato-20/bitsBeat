const logger = require("../utils/loggor")
const jwtauthentication = require('../utils/jwtauthentication');
const Sessions = require('../models/Sessions');
const { Unauthorized } = require("../utils/errors/errors");
// const sessions = require('../services/')

const authenticate = async (req,res,next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) throw new Unauthorized ('Token required!');

        const decoded = jwtauthentication.verifyToken(token);
        if(decoded == null) throw new Unauthorized ('Unauthorized access! Invalid token');

        const exsitSession = await Sessions.findOne({user_id: decoded.id, token, is_valid: true})
        if(!exsitSession || exsitSession?.expires_at <= new Date()) throw new Unauthorized('Unauthorized access! Token expired or invalid!');

        req.user = decoded;
        
        return next()
    } catch (error) {
        logger.error(error)
        return next(error)
    }
}

module.exports = authenticate;