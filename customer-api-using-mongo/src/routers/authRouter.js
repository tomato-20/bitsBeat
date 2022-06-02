const router = require('express').Router();
const passwordResetRouter = require('./passwordResetRouter')
const authController = require('../controllers/Auth');
const authenticate = require('../helper/authmiddlewere');
const {validateUserLogin,validateRefreshToken} = require('../helper/joivalidation/')


router.post('/login',validateUserLogin, authController.login_user)

router.post('/logout',authenticate, authController.logout_user)

router.post('/verify-email/:confirmationcode/:userid', authController.verify_email)

router.post('/verify-email/resend-token',authenticate,authController.resend_email_verification_token)

router.post('/refresh-token',validateRefreshToken,authController.refresh_token)

router.post('/revoke-token',authenticate, authController.revoke_refresh_token)

router.use('/reset-password', passwordResetRouter)

// router.use('/',(req,res,next)=>{
//     res.send('This is auth route')
// })


module.exports = router;