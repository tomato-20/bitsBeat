const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))


app.get('/todos/:id',(req,res,next) => {
    let id = req.params.id;

    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(response => response.json())
        .then(data=>res.status(200).json(data))
        .catch(error=> next(new Error('cannot fetch todos')))
})

// generic error handler
app.use((err,req,res,next) => {
    if(!err.status) console.log(err.stack);
    res.status(err.status || 500).json({
    error: err.errorType || 'Internal server Error',
    message: err.message || err.msg || 'Something went wrong',
  })
})


module.exports = app
