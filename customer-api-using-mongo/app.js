// DB_CONNECTION=mongodb+srv://testuser:test321@customer011.m6iec.mongodb.net/?retryWrites=true&w=majority

// SENDGRID_API_KEY=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

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// const logger = require('./src/utils/loggor');
const connection = require('./src/config/dbconfig')
const indexRouter = require('./src/indexRouter');

const app = express();

// parse req body 
app.use(express.json());
app.use(express.urlencoded({
  extended : false
}))

// db connection
connection();


// logging request
app.use((req,res,next)=>{
  console.log(`${req.method} ${req.url}`)
  next();
})

app.use('/api',indexRouter)

// 404 error
app.use('/*', (req,res,next)=>{
    res.status(404).json({
        msg: `Cannot ${req.method} ${req.url}. Not found`
    })
})

// error handles
app.use((err,req,res, next) => {
  if(!err.status) console.error(err.stack)
  res.status(err.status || 500).json({
    message: err.message || err.msg || 'Internal Server Error'
  })
})

module.exports = app;





