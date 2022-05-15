const userServices = require('../services/Users')
const logger = require('../utils/loggor')

// create user
exports.create_user = (req,res,next) => {
    userServices.createUser(req.body)
    .then(data => {
        res.json({
            data ,
            msg: 'User created successfully!'
        })
    })
    .catch(error=>{
        logger.error(error)
        next(error)
    })
}

// get user details
exports.get_user_details = (req,res,next) => {
    userServices.getUserDetailById(req.params.id)
    .then(data=>{
        res.json({
            data
        })
    }).catch(error=>{
        logger.error(error)
        next(error)
    })
}

// delete user
exports.delete_user = (req,res,next) => {
    userServices.deleteUserById(req.body.id)
    .then(data => {
        res.json(data)
    }).catch(error=>{
        logger.error(error)
        next(error)
    })
}

// update user
exports.update_user_details = (req,res,next) => {
    const  {id, ...payload} = req.body;
    userServices.updateUserById(id, payload)
    .then(data=>{
        res.json(data)
    }).catch(error=>{
        logger.error(error)
        next(error)
    })
}