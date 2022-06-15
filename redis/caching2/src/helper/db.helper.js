
require('dotenv').config();
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASS;

((databaseHelper) => {
    
    'use strict';
    
    const { MongoClient, ServerApiVersion } = require('mongodb');
    
    const uri = `mongodb+srv://${db_user}:${db_password}@customer011.m6iec.mongodb.net/?retryWrites=true&w=majority`;

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    databaseHelper.init = app => {

        client.connect(err => {

            if(err) console.log("Database Connection Error", err)

            // const collection = client.db("test").collection("devices");
            app.locals.db = client.db("todoAPI");

            // perform actions on the collection object
            console.log("Database Connection Success")

        })
    }

    databaseHelper.close = app => {
        client.close(err=>{
            if(err) {
                console.log('Error closing database', err);
            }
            console.log('Db closed')
        })
    }
})(module.exports);