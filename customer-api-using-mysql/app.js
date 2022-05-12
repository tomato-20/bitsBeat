const express = require('express');
const cookieParser = require('cookie-parser');
const rootRouter = require('./src/rootRouter')

const app = express();

// parse request body to json
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))

// parse cookie
app.use(cookieParser());

app.use(`/api/v1`, rootRouter);


// for invalid routes
app.use('/*',(req,res,next)=>{
    res.status(404);
    res.json({
        status : '404',
        error: `Not Found . Cannot ${req.method} ${req.url}` 
    })
})

app.use((err,req,res,next) => {
    console.log(err);
    res.status(500);
    res.json({
        error : err
    })
})

module.exports = app;



