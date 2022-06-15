const { ObjectId } = require('mongodb');

const router = require('express').Router()

router.post('/test', async(req,res,next) => {
    res.responseData = {message : "test route"};
    next()
})

// post new todo
router.post('/',async (req,res,next)=>{
    try {
        const todos = req.db.collection('todo'); 
        let data = await todos.insertOne(req.body);
        res.status(200).json({id: data.insertedId});
        next()
    } catch (error) {
        next(error)
    }
})


// update a todo
router.get('/:id',async (req,res,next)=>{
    try {
        const todos = req.db.collection('todo');
        let data = await todos.findOne({_id : ObjectId(req.params.id)})
        if(!data) throw new Error('User not found')
        req.responseData = {success: "true",data}
        req.setCacheData = data
        next()
    } catch (error) {
        next(error)
    }
})

// edit a todo
router.post('/:id',(req,res,next)=>{
    
})

// get all datas
router.get('/',async (req,res,next)=>{
    const todos = req.db.collection('todo');
    try {
        let page = parseInt(req.query.page);
        let offset = parseInt(req.query.offset);
        let datas = await todos.find({}).skip(page*offset).limit(offset).toArray();
        req.responseData = {todos: datas};
        req.setCacheData = {todos: datas};
        next();
    } catch (error) {
        next(error)
    }
     
})


router.delete('/:id',async (req,res,next)=>{
    
})

module.exports = router;