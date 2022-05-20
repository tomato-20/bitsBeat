const router = require('express').Router();
const resetPassword = require('../controllers/ResetPassword')
const { validatePasswordReset, validatePasswordResetRequest } = require('../helper/joivalidation/resetPassword');

// password reset request
router.post('/',validatePasswordResetRequest,resetPassword.requestResetPassword)

// password reset link verification route
router.post('/:userid/:token',validatePasswordReset,resetPassword.resetPassword)

// page to display reset form
router.get('/:userid/:token',(req,res,next)=>{
    res.send(
        "Hi this is reset password page"
    )
})

module.exports = router;