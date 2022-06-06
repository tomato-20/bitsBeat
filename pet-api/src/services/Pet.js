const path = require('path')
const fs = require('fs')
const { ObjectId } = require('mongodb');
const CustomError = require('../utils/Errors/CustomError')

const baseURL = 'http://localhost:8848'


// create a new pet profile
exports.createNewPet = async (db,data) => {
    const Pets = db.collection('pets');
    try {
        let foundPet = await Pets.findOne({petname : data.petname})
        if(foundPet) throw new CustomError('Petname already exists! Give another name!')
        const newPet = await Pets.insertOne(data)
        return  {
            success: true,
            data : newPet,
            message : "New pet added!"
        }
    } catch (error) {
        console.log(error)
        throw(error)
    }
}

// get details of  one pet
exports.getOnePet = async (db,id) =>{
    const Pets = db.collection('pets');
    const pet_gallary = db.collection('pet-gallary');
    try {
        let foundPet  = await Pets.findOne({_id: ObjectId(id)});
        if(!foundPet) throw new CustomError('Pet not found', 400, 'Bad Request')
        const {file,...data} = foundPet;
        data.url = `${baseURL}/${file}`

        
        // get all images from gallary
        let gallary = [];
        // let gallaryCursor =  await pet_gallary.find({pet_id : ObjectId(id)}).toArray();
        let gallaryCursor =  await pet_gallary.find({pet_id : ObjectId(id)});
        while(await gallaryCursor.hasNext()) {
            let doc = await gallaryCursor.next();
            gallary.push(`${baseURL}/${doc.file}`)
        }

        return  {
            success: true,
            data: {...data, gallary} ,
        }
    } catch (error) {
        throw(error)
    }
}


// get all pets
exports.getAllPet = async (db) =>{
    try {
        return({
            success: true,
            message: "GET all pet"
        })
    } catch (error) {
        throw(error)
    }
}

// delete a pet by id
exports.deleteOnePet = async (db, id) =>{
    const Pets = db.collection('pets')
    const pet_gallary = db.collection('pet-gallary')
    try {
        let foundPet  = await Pets.findOne({_id: ObjectId(id)});
        if(!foundPet) throw new CustomError('Cannot find pet with the id!', 400,'Bad Request');
        console.log(path.basename(foundPet.file))
        
        // remove dependent images
        let gallaryCursor = await pet_gallary.find({pet_id : ObjectId(id)});
        while (await gallaryCursor.hasNext()) {
            let doc = await gallaryCursor.next();
            fs.unlink(doc.file,error=>{
                console.log('Error removing files', error)
            })
        }

        // remove refrence collection
        await pet_gallary.deleteMany({pet_id : ObjectId(id)});
        
        fs.unlink(foundPet.file, error=>{
            if(error)throw new CustomError('Cannot Remove File',500, 'Internal Server Error')
            console.log(`pet deleted with id ${id}`)
        })

        // remove data from database
        let data = await Pets.deleteOne({_id: ObjectId(id)});

        return({
            success: true,
            message: "Pet deleted successful"
        })
    } catch (error) {
        throw(error)
    }
}

// upload multiple images of a pet
exports.uploadImages = async (db, {id, images}) =>{
    console.log(images)
    const Pets = db.collection('pets')
    
    try {
        let foundPet = await Pets.findOne({_id : ObjectId(id)})

        // if not found remove saved files
        if(!foundPet) {
            images.forEach(async(image) => {
                fs.unlink(image.path, error=>{
                    if(error)throw new CustomError('Cannot find File',500, 'Internal Server Error')
                    console.log(error)
                })
            })
            if(!foundPet) throw new CustomError('Cannot find pet with the id!', 400,'Bad Request');
        }
        
        // if found pet 
        const pet_gallary = db.collection('pet-gallary');
        let documents = images.map((image) => {
            return  {
                "pet_id" : ObjectId(id),
                "file": image.path
            }
        });

        await pet_gallary.insertMany([...documents]);

        return({
            success: true,
            message: "Images uploaded!"
        })
    } catch (error) {
        throw(error)
    }
}

