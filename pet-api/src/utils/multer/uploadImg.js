const multer = require('multer');
const path = require('path')
const crypto = require('crypto')
const dirname = __dirname

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        // cb(null,path.normalize(`${dirname}/../../uploads`))
        cb(null,path.normalize(`./uploads/pets`))
    },
    filename: function(req,file,cb) {
        let date = Date.now()
        let random = crypto.randomBytes(16).toString('hex');
        const savename = `${random}_${file.originalname}`
        cb(null,savename)
    }
})

const uploadImg = multer({storage}).single('image');
const uploadImgs= multer({storage}).array('gallary', 10)
const uploadImgsDifferently = multer({storage}).fields({name : 'profilePicture', maxCount: 1},{name: 'gallary', maxCount: 10})



module.exports = {
    uploadImg,
    uploadImgs,
    uploadImgsDifferently
}