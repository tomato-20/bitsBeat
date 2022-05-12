const Router = require('express').Router();

const {createUserController,editUserProfileController, deleteUserController} = require('./Controller/user')

const authenticateUser = (req,res,next) => {
    // check token validity 
    // check valid session
    // check email and password
    next();
}

Router.post('/signup',createUserController);

Router.post('/edit', authenticateUser, editUserProfileController);

Router.delete('/deleteAccount', authenticateUser, deleteUserController)

module.exports = Router;