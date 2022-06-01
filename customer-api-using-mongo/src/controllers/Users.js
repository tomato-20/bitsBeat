const userServices = require('../services/Users')
const logger = require('../utils/loggor')

// create user
exports.create_user = (req,res,next) => {
    userServices.createUser(req.body)
        .then(data => {
            res.json(data)
        })
        .catch(error=>{
            logger.error(error)
            next(error)
        })
}

// get user details
exports.get_user_details = (req,res,next) => {
    userServices.getUserDetailById(req.user.id)
        .then(data=>{
            res.json(data)
        }).catch(error=>{
            logger.error(error)
            next(error)
        })
}

// delete user
exports.delete_user = (req,res,next) => {
    userServices.deleteUserById(req.user.id)
        .then(data => {
            res.json(data)
        }).catch(error=>{
            logger.error(error)
            next(error)
        })
}

// update user
exports.update_user_details = (req,res,next) => {
    const  {...payload} = req.body;
    userServices.updateUserById(req.user.id, payload)
        .then(data=>{
            res.json(data)
        }).catch(error=>{
            logger.error(error)
            next(error)
        })
}

// change user password
exports.change_password = (req,res,next) => {
    const {oldPassword, newPassword} = req.body;
    const {id} = req.user
    userServices.changeUserPassword(id, oldPassword,newPassword) 
        .then(data=>res.json(data))
        .catch(error=>next(error))
}

