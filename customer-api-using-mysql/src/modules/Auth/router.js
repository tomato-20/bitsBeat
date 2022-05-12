const Router = require('express').Router();

Router.post('/login',(req,res, next) => {
    res.send("Loggin user in via auth route");
})

Router.post('/logout',(req,res, next) => {
    res.send("Logging user out via auth route");
})

module.exports = Router;