const client = require('./client')

const path = require('path');
const express = require('express')

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))

app.get('/', (req, res, next) => {
    client.getAll(null, (err, response) => {
        if (!err) {
            res.json({
                data: response.customers
            })
        } else {
            res.status(500).json({ message: err.details })
        }
    })
})

app.get('/:id', (req, res, next) => {
    client.get({ id: req.params.id }, (err, response) => {
        if (!err) {
            res.json(response)
        }else {
            console.log(err)
            res.status(500).json({ message: err.details })
        }
    })
})

app.post('/create', (req, res, next) => {
    let name = req.body.name; 
    let age = req.body.age;
    let address = req.body.address ;
    if(!name || !age || !address) return res.status(400).json({message: "name, age and address are required"})
    let newCustomer = {name,age,address}
    client.insert(newCustomer,(err,response)=>{
        if(!err) res.status(201).json(response)
    })
})

app.post('/update', (req,res,next)=>{
    let updateCustomer = {
        id: req.body.id,
        name: req.body.name,
        age: req.body.age,
        address : req.body.address
    }

    client.update(updateCustomer, (err,response) => {
        if(!err) {
            res.json({message: " user updated successfully", data: response})
        }else {
            res.status(500).json({message: err.details})
        }
    })
})

app.delete('/remove', (req,res,next)=>{
    client.remove({id: req.body.id},(err,response)=>{
        if(!err) {
            res.json({message: "User deleted successfully"})
        } else {
            res.status(500).json(({message: err.details}))
        }
    })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
})