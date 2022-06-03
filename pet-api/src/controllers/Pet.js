exports.getAllPet = async (req,res, next) =>{
    const {client,db} = req.dbConfig
    try {
        res.json({
            success: true,
            message: "GET all pet"
    })
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
        res.json({
            success: true,
            message: "GET one pet"
    })
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
    try {
        res.json({
            success: true,
            message: "POST new Pet"
    })
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
        res.json({
            success: true,
            message: "DELETE a pet"
})
    }catch(error) {
        next(error)
    } finally {
        console.log('closing db')
        await client.close()
    }
}

