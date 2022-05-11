const express = require('express');
const app = express();

// parse req body 
app.use(express.json());
app.use(express.urlencoded({
  extended : false
}))

app.use('/',(req,res,next)=>{
  res.status(200).json({
    app : "customerAPI",
    version: "1.0.1"
  })
})

app.use('/*', (req,res,next)=>{
    res.status(404).json({
        msg: `Cannot ${req.method} ${req.url}}`
    })
})

module.exports = app;





