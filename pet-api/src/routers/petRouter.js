const router = require('express').Router();
const petControllers = require('../controllers/Pet');


router.get('/',petControllers.getAllPet);
router.get('/:id',petControllers.getOnePet)
router.post('/', petControllers.addPet);
router.delete('/:id',petControllers.deleteOnePet)


module.exports = router;