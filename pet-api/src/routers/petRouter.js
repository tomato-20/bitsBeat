const router = require('express').Router();
const petControllers = require('../controllers/Pet');
const {uploadImg, uploadImgs, uploadImgsDifferently} = require('../utils/multer')


router.get('/',petControllers.getAllPet);
router.get('/:id',petControllers.getOnePet)
router.post('/',uploadImg,petControllers.addPet);
router.delete('/:id',petControllers.deleteOnePet)

router.post('/upload/images', uploadImgs, petControllers.uploadImages)


module.exports = router;