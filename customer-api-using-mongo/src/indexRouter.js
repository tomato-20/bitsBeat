const router = require('express').Router();

const userRouter= require('./routers/userRouter')
const authRouter= require('./routers/authRouter') 
const adminRouter= require('./routers/adminRouter') 


router.use('/auth',authRouter)
router.use('/users',userRouter)
router.use('/admin',adminRouter)

router.get('/', (req,res,next) => {
  next()
}, (req,res,next)=>{
    console.log(req.user)
    res.status(200).json({
        app : "customerAPI",
        version: "1.0.1"
      })
})

module.exports = router;