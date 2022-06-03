const express = require('express');
const {MongoClient} = require('mongodb');
require('dotenv').config();

// const connect = require('./src/config/dbconfig')
const indexRouter = require('./src/routers')

const dbConnectionURL = process.env.DB_CONNECTION;

const app = express();

// parse req body 
app.use(express.json());
app.use(express.urlencoded({
  extended : false
}))


// connect();
app.use(async(req,res,next) => {
  let db_name = 'petAPI'
  const client = new MongoClient(dbConnectionURL);
  try {
    await client.connect()
    db = client.db(db_name)
    console.log(`connected to ${db_name}` )
    req.dbConfig = {client, db}
    next()
  } catch (error) {
    next(error)
  } 
})


app.use('/',indexRouter)

app.use('/*', (req,res,next)=>{
    res.status(404).json({
        msg: `Cannot ${req.method} ${req.url}}`
    })
})


module.exports = app;





