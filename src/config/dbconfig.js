const {MongoClient} = require('mongodb');
const { Cursor } = require('mongoose');
require('dotenv').config();

const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;

const url = `mongodb+srv://astrea:${db_password}@customer011.m6iec.mongodb.net/customerAPI?retryWrites=true&w=majority`;

const client = new MongoClient(url);

const run = async () => {
    try {
        await client.connect();
        const database = client.db('sample_mflix');
        const movies = database.collection('movies');

        //Query movie that has title "Titanic"
        const result = await movies.findOne({title : 'Titanic'});
        console.log(result);

        //Query to find movies released in year 1953
        const findResult = await movies.find({year : 1953});
        // await findResult.forEach(console.dir);
        await findResult.forEach(doc => console.log(doc));
    } finally {
        await client.close()
    }
}

run().catch(console.dir)

