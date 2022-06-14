const client = require('./init_redis');

exports.setKeyEx = async (key,data,ex) => {
    try {
        await client.setEx(key,ex,JSON.stringify(data));
        return {
            [key]: data
        }
    }catch (error) {
        return {
            error
        }
    }
}


exports.getData = async(key) => {
    try {
        let data = await client.get(key);
        if (!data) return null;
        return JSON.parse(data); 
    } catch (error) {
        return {
            error
        }
    }
}