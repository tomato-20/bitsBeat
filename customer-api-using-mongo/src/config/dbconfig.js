const {MongoClient} = require('mongodb');
require('dotenv').config();

const db_user = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;

const url = `mongodb+srv://${db_user}:${db_password}@customer011.m6iec.mongodb.net/customerAPI?retryWrites=true&w=majority`;

// create a client
const client = new MongoClient(url);

const connect = async () => {
    try {
        await client.connect();
        const database = client.db('sample_mflix');
        const collections =  await database.collections();
        // collections.forEach(collection=>{console.log(collection)})
        const movies = database.collection('movies');

        //Query movie that has title "Titanic"
      /*   const result = await movies.findOne({title : 'Titanic'});
        console.log(result); */

        //Query to find movies released in year 1953
        // find returns cursor that fetches documents in array
        const findResult = await movies.find({year : 1953});
        // await findResult.forEach(doc => console.log(doc));

        const allValues = await findResult.toArray();
        // console.log(`${allValues.length} movies found those released in 1953  , `, allValues);

        while(await findResult.hasNext()){
            console.log(await findResult.next())
        }

        // const documentCount = await findResult.counts();
        // console.log(documentCount)

    } catch(err) {
        console.log(err);
    } 
    finally {
        await client.close()
    }
}

connect()


