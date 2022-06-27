const {MongoClient}  = require('mongodb')
require('dotenv').config()

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

((dbhelper)=>{

    // const CONNECTION_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@<cluster-url>?retryWrites=true&writeConcern=majority`;
    const CONNECTION_URL = `mongodb://${DB_HOST}:${DB_PORT}`;
    const client = new MongoClient(CONNECTION_URL)

    dbhelper.init = async (app) => {
        try {
            await client.connect();
            let db = client.db('grpc-test');
            app.db = db;
            let test = db.collection('testCollection')
            console.log('connected successfully to db')
        }catch(error) {
            console.log('Error connecting to db. ', error)
        }
}



})(module.exports)