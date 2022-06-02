const Joi = require('joi');

const requestResetPasswordSchema = Joi.object().keys({
    email : Joi.string().email().required()
}).required()

const resetPasswordSchema = Joi.object({
    password : Joi.string().not(null).min(8).required()
})

exports.validatePasswordResetRequest = async (req,res,next) => {
    try {
        const value = requestResetPasswordSchema.validate(req.body);
        if(value.error) throw new Error(value.error.details[0].message);
        next()
    }catch(error) {
        next(error)
    }
}

exports.validatePasswordReset = async (req,res,next) => {
    try {
        const value = resetPasswordSchema.validate(req.body);
        if(value.error) throw new Error(value.error.details[0].message);
        next()
    }catch(error) {
        next(error)
    }
}