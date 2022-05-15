const authController = require('../services/Auth')

// login user 
exports.login_user = (req,res,next) => {
    const {email , password} = req.body
    authController.login(email,password)
    .then(data=> {res.json(data)})
    .catch(err => {next(err)})
}

// logout user
exports.logout_user = (req,res,next) => {
    authController.logout(req.user.id)
    .then(data=>{res.json(data)})
    .catch(error=>{next(error)})
    // res.send('NOT IMPLEMENTED logout')
}

