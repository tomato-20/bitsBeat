const router = require('express').Router();
const authController = require('../controllers/Auth');
const authenticate = require('../helper/authmiddlewere');

router.post('/login',authController.login_user)

router.post('/logout',authenticate, authController.logout_user)


module.exports = router;