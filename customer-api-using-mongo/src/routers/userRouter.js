const router = require('express').Router();
const userController = require('../controllers/Users')

const authenticate = (req,res,next) => {
    try {
        next()
    } catch (error) {
        next(error)
    }    
}

router.post('/create',userController.create_user);

router.get('/:id',authenticate,userController.get_user_details);

router.post('/edit',authenticate,userController.update_user_details);

router.delete('/delete',authenticate,userController.delete_user)

module.exports  = router;
