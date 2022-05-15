const router = require('express').Router();
const userController = require('../controllers/Users')
const authenticate = require('../helper/authmiddlewere')

router.post('/create',userController.create_user);

router.post('/:id',authenticate,userController.get_user_details);

router.put('/edit',authenticate,userController.update_user_details);

router.delete('/delete',authenticate,userController.delete_user)



module.exports  = router;
