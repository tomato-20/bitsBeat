const router = require('express').Router()

router.post('/',(req,res,next)=>{
    res.send('POST a todo')
})

router.get('/',(req,res,next)=>{
    res.send('GET a todo')
})

router.get('/:id',(req,res,next)=>{
    fetch(`https://jsonplaceholder.typicode.com/todos/${req.params.id}`)
        .then(response=>response.json())
        .then(data=>{
            if(!Object.keys(data).length) return res.json({message: "todo not found", data})
            req.responseData = data 
            next();
        })
        .catch(error=>next(error))
})

router.delete('/',(req,res,next)=>{
    res.send('DELETE todo')
})

module.exports = router;