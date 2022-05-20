const router = require('express').Router();

const userRouter= require('./routers/userRouter')
const authRouter= require('./routers/authRouter') 
const passwordResetRouter = require('./routers/passwordResetRouter')

const Users = require('./models/Users')

router.use('/auth',authRouter)
router.use('/users',userRouter)
router.use('/password_reset',passwordResetRouter)

router.get('/',async (req,res,next)=>{
    res.status(200).json({
        app : "customerAPI",
        version: "1.0.1"
      })
})

module.exports = router;