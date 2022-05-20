const router = require('express').Router();
const userController = require('../controllers/Users')
const authenticate = require('../helper/authmiddlewere')
const {validateCreateUSer, validateUserUpdate} = require('../helper/joivalidation/Users')

router.post('/create', validateCreateUSer, userController.create_user);

router.post('/:id',authenticate,userController.get_user_details);

router.put('/edit',validateUserUpdate, authenticate,userController.update_user_details);

router.delete('/delete',authenticate,userController.delete_user)

router.use('/',(req,res,next)=>{
    res.send('This is user route')
})


module.exports  = router;
