const router = require('express').Router();
const authController = require('../controllers/Auth');
const authenticate = require('../helper/authmiddlewere');
const {validateUserLogin,validateRefreshToken} = require('../helper/joivalidation/')


router.post('/login',validateUserLogin, authController.login_user)

router.post('/logout',authenticate, authController.logout_user)

router.post('/confirm/:confirmationcode/:userid', authController.verify_email)

router.post('/refresh-token',validateRefreshToken,authController.refresh_token)

router.post('/revoke-token',authenticate, authController.revoke_refresh_token)

// router.use('/',(req,res,next)=>{
//     res.send('This is auth route')
// })


module.exports = router;