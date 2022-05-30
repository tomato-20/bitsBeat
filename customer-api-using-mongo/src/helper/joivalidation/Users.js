const Joi = require('joi');
const { changeUserPassword } = require('../../services/Users');
const { BadRequest } = require('../../utils/errors/errors');

const UserRegistrationSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8),
    role: Joi.string(),
})


const UserUpdateSchema = Joi.object().keys({
    username:Joi.string().min(3).max(30).required(),
}).required().min(1);


const ChangePasswordSchema = Joi.object().keys({
    oldPassword: Joi.string().required(),
    newPassword : Joi.string().min(5).required()
})

exports.validateCreateUser = async (req,res,next) => {
try {
    const value =  await UserRegistrationSchema.validate(req.body);
    console.log(value)
    if(value.error) throw new BadRequest(value.error)
    next()
} catch (error) {
    next(error)
}
}

exports.validateUserUpdate = async (req,res,next) => {
    try {
       const value =  await UserUpdateSchema.validate(req.body);
       if(value.error) throw new BadRequest(value.error)
       next()
    } catch (error) {
        next(error)
    }
}

exports.validateChangePassword = async (req,res,next) => {
    try{
        const value = await ChangePasswordSchema.validate(req.body);
        if(value.error) throw new BadRequest(value.error) 
        next() 
    }catch (error) {
        next(error)
    }
}