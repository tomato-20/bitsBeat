require('dotenv').config();
const jwt = require('jsonwebtoken');
const {Unauthorized} = require('../utils/errors/errors')
const jwtauthenticate = require('../utils/jwtauthentication');


const authorize =  (Roles = []) => {
    return (req, res, next) => {
        // let token = req?.header["Authorization"] || req?.header["authorization"];
       // authenticate user

        // if (!req && !token)
        // {
        //     next(new Unauthorized('Unauthorized'))
        // }

        // if(token.split(' ')[0] !== 'Bearer' &&  !token.split(' ')[1])
        // {
        //     next(new Unauthorized('Unauthorized'))
        // }

        // token = token.split(' ')[1];

        // const user =  jwtauthenticate.verifyToken(token)

        // if(!user) next(new Unauthorized('Invalid token'))

        // authorize user 
        let isAuthorized = false;
        const user = req.user;

        isAuthorized = typeof Roles == "string" ? Roles == user.role : Roles.find(role => user.role == role);

        if (!isAuthorized) {next(new Unauthorized('Unauthorized access'))}

        next();
    }
}

module.exports = authorize;