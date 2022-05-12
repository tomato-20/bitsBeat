const mongoose = require('mongoose');

const { db_password, db_user } = require('./databse')

// setup connection

const connectionString = `mongodb+srv://astrea:${db_password}@customer011.m6iec.mongodb.net/localLibraryAPI?retryWrites=true&w=majority`

mongoose.connect(`mongodb+srv://${db_user}:${db_password}@customer011.m6iec.mongodb.net/localLibraryAPI?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: false
})


//get default connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.once('open', () => {
    console.log("connected successfully");
})

module.exports = db;