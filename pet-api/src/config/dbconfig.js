// const {MongoClient} = require('mongodb');
// require('dotenv').config();

// const db_user = process.env.DB_USER;
// const db_password = process.env.DB_PASS;

// const url = `mongodb+srv://${db_user}:${db_password}@customer011.m6iec.mongodb.net/?retryWrites=true&w=majority`;

// async function connect()  {
//     const client = new MongoClient(url)
//     try {
//         await client.connect()
//         const db = client.db('sample_mflix')
//         const movies = db.collection('movies')
//         let movieList =  movies.find({}).limit(20);
//          console.log(await movieList.toArray())
//     } catch (error) {
//         console.error(`something went bad ${error}`)   
//     } finally {
//         client.close()
//     }
// }

// module.exports = connect
