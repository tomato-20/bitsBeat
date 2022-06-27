exports.findAll = async(collection) => {
    try {
        let result = await collection.find().toArray();
        return !result.length? [] : result;
    } catch (error) {
        let errorMsg = error.message || `Cannot find all`
        throw new Error(errorMsg)
    }
}

exports.findById = async (collection,id) => {
    try {
        let result = await collection.findOne({id});
        return result
    } catch(error) {
        let errorMsg = error.message || `Error trying to find with id ${id}`
        throw new Error(errorMsg)
    }
}