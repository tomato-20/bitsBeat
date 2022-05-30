const router = require('express').Router();

const userRouter= require('./routers/userRouter')
const authRouter= require('./routers/authRouter') 
const adminRouter= require('./routers/adminRouter') 
const passwordResetRouter = require('./routers/passwordResetRouter')

const Roles = require('./helper/constants/roles')
const authorize = require('./helper/authorizemiddlewere');
const Users = require('./models/Users');

router.use('/auth',authRouter)
router.use('/users',userRouter)
router.use('/password_reset',passwordResetRouter)
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