const logger = require("../utils/loggor")
const jwtauthentication = require('../utils/jwtauthentication');
const Sessions = require('../models/Sessions');
const { Unauthorized } = require("../utils/errors/errors");
const { dateNow } = require("../utils/time");
// const sessions = require('../services/')

const authenticate = async (req,res,next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) throw new Unauthorized ('Token required!');

        const decoded = jwtauthentication.verifyToken(token);
        if(decoded == null) throw new Unauthorized ('Unauthorized access! Invalid token');

        const exsitSession = await Sessions.findOne({user_id: decoded.id, token, is_valid: true})
        if(!exsitSession) throw new Unauthorized('User Logged out');
        if(exsitSession?.expires_at <= new Date()) throw new Unauthorized('Unauthorized access! Invalid token');

        req.user = decoded;
        
        next()
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

module.exports = authenticate;