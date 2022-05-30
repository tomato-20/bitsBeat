const authServices = require('../services/Auth')

// login user 
exports.login_user = (req,res,next) => {
    const {email , password} = req.body
    authServices.login(email,password)
        .then(data=> {res.json(data)})
        .catch(err => {next(err)})
}

// logout user
exports.logout_user = (req,res,next) => {
    authServices.logout(req.user.id)
        .then(data=>{res.json(data)})
        .catch(error=>{next(error)})
}

// verify email
exports.verify_email = (req,res,next) => {
    const {confirmationcode, userid} =  req.params; 
    authServices.verifyEmail(confirmationcode,userid)
        .then(data => res.json(data))
        .catch(error => next(error))
    }

// refresh token
exports.refresh_token = (req,res,next) => {
    const {refreshToken, accessToken} = req.body
    authServices.refreshToken(refreshToken,accessToken)
        .then(data=>res.json(data))
        .catch(error=>next(error))
}

