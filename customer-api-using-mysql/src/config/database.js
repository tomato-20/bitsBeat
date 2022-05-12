require('dotenv').config();


module.exports = {
    host : process.env.HOST,
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    adminUUID : process.env.ADMIN_UUID,
    adminEmail : process.env.ADMIN_EMAIL,
    adminPass : process.env.ADMIN_PASSWORD
}
