const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

// const logger = require('./src/utils/loggor');
const connection = require('./src/config/dbconfig')
const indexRouter = require('./src/indexRouter');


const app = express();

app.use((req,res,next)=>{
  let date = new Date()
  console.log(`${req.headers}`)
  next();
})

app.options('*',cors( ));
app.use(cors())

// parse req body 
app.use(express.json());
app.use(express.urlencoded({
  extended : false
}))

// db connection
connection();


// logging request
app.use((req,res,next)=>{
  let date = new Date()
  console.log(`${req.method} ${req.url} : ${date}`)
  next();
})

app.use('/api',indexRouter)

// 404 error
// app.use('/*', (req,res,next)=>{
//     res.status(404).json({
//         msg: `Cannot ${req.method} ${req.url} Not found`
//     })
// })

// error handles
app.use((err,req,res, next) => {
  if(!err.status) console.error(err.stack|| err)
  res.status(err.status || 500).json({
    message: err.message || err.msg || 'Internal Server Error'
  })
})

module.exports = app;





