const router = require('express').Router();
const authController = require('../controllers/Auth')

router.post('/login',authController.login_user)

router.post('/logout', authController.logout_user)


module.exports = router;