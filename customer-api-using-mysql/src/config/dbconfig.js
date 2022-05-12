const mysql = require('mysql');
const {host,password,user,database,adminEmail,adminPass,adminUUID} = require('./database')

let connectionPool  = mysql.createPool({
connectionLimit : 50,
host,
user,
password,
database
})


// to seed the database
const insertQuery = `INSERT INTO (uuid, email, password) VALUES ("${adminUUID}","${adminEmail}", "${adminPass}");`

connectionPool.query(`SELECT id, created_at FROM Users where uuid="${adminUUID}"`,(error,results,fields)=>{
    if(error) throw error;
    console.log("ADMIN FOUND? ",results);

    if(!results.length) {
        connectionPool.query(insertQuery, (error,results,fields)=>{
            console.log("Insert Done! ", results);
        })
    }
})

module.exports = connectionPool;

