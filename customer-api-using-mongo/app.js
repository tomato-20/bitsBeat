const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const indexRouter = require('./src/indexRouter')

const app = express();

// parse req body 
app.use(express.json());
app.use(express.urlencoded({
  extended : false
}))

// db connection
console.log(process.env.DB_CONNECTION)
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser : true
},()=>{
  console.log('connected to db')
})

app.use('/',indexRouter)

app.use('/*', (req,res,next)=>{
    res.status(404).json({
        msg: `Cannot ${req.method} ${req.url}}`
    })
})

module.exports = app;





