const express = require('express');
const app = express();
const indexRouter = require('./src/indexRouter')

// parse req body 
app.use(express.json());
app.use(express.urlencoded({
  extended : false
}))

app.use('/',indexRouter)

app.use('/*', (req,res,next)=>{
    res.status(404).json({
        msg: `Cannot ${req.method} ${req.url}}`
    })
})

module.exports = app;





