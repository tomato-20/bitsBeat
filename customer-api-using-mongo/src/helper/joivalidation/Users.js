const Joi = require('joi');
const { BadRequest } = require('../../utils/errors/errors');

const UserRegistrationSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8)
})


const UserUpdateSchema = Joi.object().keys({
    username:Joi.string().min(3).max(30).required(),
}).required().min(1);


exports.validateCreateUSer = async (req,res,next) => {
try {
    const value =  await UserRegistrationSchema.validate(req.body);
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