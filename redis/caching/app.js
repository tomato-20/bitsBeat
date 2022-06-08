const express = require('express');
const redis = require('redis');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))

// without redis
/* app.get('/todos/:id',(req,res,next) => {
    let id = req.params.id;

    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(response => response.json())
        .then(data=>res.status(200).json(data))
        .catch(error=> next(new Error('cannot fetch todos')))
}) */

// using redis
const redisPort = process.env.REDIS_PORT
const client = redis.createClient()
client.on("error", error => {
    console.log(error)
})

app.get('/todos/:id',async (req,res,next)=>{
    const searchId = req.params.id;
    try{
        await client.connect();
        let todo = await client.get(searchId)
        if(todo){
           return res.status(200).json({
                message: 'data fetched from cache',
                data: JSON.parse(todo)
            })
        }

        let response =  await fetch(`https://jsonplaceholder.typicode.com/todos/${searchId}`)
        todo = await response.json() 

        await client.set(searchId, JSON.stringify(todo))

        return res.status(200).json({
            message : 'Cache miss',
            data: todo
        })
        
    }catch(error){
        console.log(error);
        next(new Error(error.message))
    }finally {
        await client.quit()
    }
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
