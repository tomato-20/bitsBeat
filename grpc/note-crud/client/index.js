const client = require('./client')

const path = require('path');
const express = require('express')

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))

app.set("views",path.join(__dirname,'views'))
app.set("view engine","hbs")

app.get('/', (req,res,next)=>{
    client.getAll(null,(err,data) => {
        if(!err) {
            res.json({
               data: data.customers
            })
        }
    })
})

app.get('/:id', (req,res,next)=> {
    client.get()
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server running on http://127.0.0.1:${PORT}`);
})