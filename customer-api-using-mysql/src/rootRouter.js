const Router = require("express").Router();

const authRouter = require('./modules/Auth/router');
const userRouter = require('./modules/User/router');


Router.get('/',(req,res,next)=>{
    res.status(200).json({
        msg: "login/logout apt",
        version : '1.0.0'
    })
});

// authentication routes
Router.use('/auth',authRouter);

// user routes
Router.use('/user',userRouter);


module.exports = Router;
