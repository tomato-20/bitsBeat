const mongoose = require('mongoose');
require('dotenv').config();


const connectionURI = process.env.DB_CONNECTION;
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

module.exports = connection = async () => {
    try {
        const dbconnection = await mongoose.connect(connectionURI,connectionParams);
        console.log('connected to db');
        return dbconnection;
    }catch (err) {
        console.log('cannot connect to db', err);
        logger.error(err)
      }
}