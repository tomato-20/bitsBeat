const router = require('express').Router();

const userRouter= require('./routers/userRouter')
const authRouter= require('./routers/authRouter')
const Users = require('./models/Users')

router.use('/auth',authRouter)
router.use('/users',userRouter)

router.get('/',async (req,res,next)=>{
    getAllUsers().then((UsersList)=>{
        res.status(200).json({
            app : "customerAPI",
            version: "1.0.1",
            users: UsersList
          })
    }).catch(err=>{next(err)})
})

const getAllUsers = async() => {
    const newUser = new Users({
        username: "kirtee",
        email : "kirtee@gmail.com",
        password: "kirtee321"
    })

    console.log(newUser);

    try {
        await newUser.save();
        const usersList = await Users.find();
        console.log(usersList)
    }catch(err) {
        console.log(err);
    }
    
}

module.exports = router;