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

// resend confirmation code
exports.resend_email_verification_token = (req,res,next) => {
    authServices.resendToken(req.user.id)
        .then(data => res.json(data))
        .catch(error => next(error))
}

// refresh token
exports.refresh_token = (req,res,next) => {
    const {refreshToken, oldAccessToken} = req.body
    authServices.refreshToken(refreshToken,accessToken = oldAccessToken)
        .then(data=>res.json(data))
        .catch(error=>next(error))
}

// revoke refresh token
exports.revoke_refresh_token = (req,res,next) => {
    authServices.revokeRefreshToken(req.body.refreshToken, req.user.id)
        .then(data=>res.json(data))
        .catch(error=>next(error))
}

