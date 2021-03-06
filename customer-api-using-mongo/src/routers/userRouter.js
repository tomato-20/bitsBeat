const router = require('express').Router();
const userController = require('../controllers/Users')
const authenticate = require('../helper/authmiddlewere');
const authorize = require('../helper/authorizemiddlewere');
const roles = require('../helper/constants/roles');

const {validateCreateUser, validateUserUpdate, validateChangePassword} = require('../helper/joivalidation')

router.post('/register', validateCreateUser, userController.create_user);

router.get('/details',authenticate,userController.get_user_details);

router.post('/edit',validateUserUpdate, authenticate,userController.update_user_details);

router.delete('/delete',authenticate,userController.delete_user)

router.put('/change-password',validateChangePassword,authenticate,userController.change_password)


router.use('/',(req,res,next)=>{
    res.send('This is user route')
})


module.exports  = router;
