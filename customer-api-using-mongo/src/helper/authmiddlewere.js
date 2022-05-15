const logger = require("../utils/loggor")
const jwtauthentication = require('../utils/jwtauthentication')

const authenticate = (req,res,next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) throw new Error ('Unauthorized access! Invalid token!');

        const decoded = jwtauthentication.verifyToken(token);
        if(decoded == null) throw new Error ('Unauthorized acess! Invalid token');

        req.user = decoded;
        next()
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

module.exports = authenticate;