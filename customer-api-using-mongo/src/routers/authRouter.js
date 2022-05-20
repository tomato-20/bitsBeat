const router = require('express').Router();
const authController = require('../controllers/Auth');
const authenticate = require('../helper/authmiddlewere');
const {validateUserLogin} = require('../helper/joivalidation/Auth')


router.post('/login',validateUserLogin, authController.login_user)

router.post('/logout',authenticate, authController.logout_user)

router.use('/',(req,res,next)=>{
    res.send('This is auth route')
})


module.exports = router;