const Joi = require("joi");
const { BadRequest } = require("../../utils/errors/errors");

const loginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
}).options({
    presence: "required"
})

const refreshTokenSchema = Joi.object().keys({
    refreshToken : Joi.string().required(),
    oldAccessToken : Joi.string().required()
})

exports.validateUserLogin = async(req,res,next) => {
    try {
        const value = loginSchema.validate(req.body);
        if(value.error) {
            throw new BadRequest (value.error)
        }
        next();
    } catch (error) {
        next(error)
    }
}

exports.validateRefreshToken = async(req,res,next) => {
    try {
        const value = refreshTokenSchema.validate(req.body);
        if(value.error) {
            throw new BadRequest (value.error)
        }
        next();
    } catch (error) {  
        next(error)
    }
}

