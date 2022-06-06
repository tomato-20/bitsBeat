const petServices = require('../services/Pet')

exports.getAllPet = async (req,res, next) =>{
    const {client,db} = req.dbConfig
    try {
        let data = await petServices.getAllPet(db)
        res.status(200).json(data)
    }catch(error) {
        next(error)
    } finally {
        console.log('closing db')
        await client.close()
    }
}

// get one pet
exports.getOnePet = async (req,res, next) =>{
    const {client,db} = req.dbConfig
    try {
        let data = await petServices.getOnePet(db,req.params.id)
        res.status(200).json(data)
    }catch(error) {
        next(error)
    } finally {
        console.log('closing db')
        await client.close()
    }
}

// add pet
exports.addPet =  async (req,res,next) => {
    const {client,db} = req.dbConfig
    let payload = req.body;
    payload.file = req.file.path
    try {
    let data = await petServices.createNewPet(db,payload)
    res.status(200).json(data)
    }catch(error) {
        next(error)
    } finally {
        console.log('closing db')
        await client.close()
    }
}

// DELETE a pet
exports.deleteOnePet = async (req,res, next) =>{
    const {client,db} = req.dbConfig
    try {
        let data = await petServices.deleteOnePet(db, req.params.id)
        res.status(200).json(data)
    }catch(error) {
        next(error)
    } finally {
        console.log('closing db')
        await client.close()
    }
}

// Upload images
exports.uploadImages = async (req,res, next) =>{
    const {client, db} = req.dbConfig;
    try {
        let data = await petServices.uploadImages(db, {id: req.body.id, images : req.files})
        res.status(200).json(data)
    }catch(error) {
        next(error)
    } finally {
        console.log('closing db')
        await client.close()
    }
}

