const Joi = require('joi');
const { BadRequest } = require('../../utils/errors/errors');
const roles = require('../constants/roles');

const userSearchSchema = Joi.object().keys({
    page: Joi.number().min(0).required(),
    limit: Joi.number().min(0).required(),
    sort: Joi.object({
        by : Joi.string().valid('created_at', 'email').required(),
        reverse : Joi.bool().required()
    }),
    filter: Joi.object({
        email : Joi.string(),
        deleted : Joi.bool(),
        role : Joi.string().valid(...Object.values(roles)),
        status : Joi.string().valid('pending', 'active'),
        date: Joi.object({
            from : Joi.date().required(),
            to : Joi.date().required()
        })
    }).min(1)
})

exports.validateUserSearch = (req,res,next) => {
    try {
        let value = userSearchSchema.validate(req.body);
        if(value.error) {
            throw new BadRequest(value.error.details[0].message)
        }
        next()
        
    } catch (error) {
        next(error)
    }
}

// body 
/* {
    "page" : 0,
    "limit": 10,
    "sort" : {
        "by": "created_at",
        "reverse": false
    },
    "filter": {
        "email" : "keyword",
        "username" : "keyword",
        "status" : enum ["pending", "active"]
        "deleted" : true,
        date: {
            from : Date format
            to : Date format
        }
      
    }
} */