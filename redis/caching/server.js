const http = require('http');
require('dotenv').config()

const app = require('./app')

const PORT = process.env.PORT || 8800;
const HOST = process.env.HOST;

const server = http.createServer(app);

server.listen(PORT,HOST,()=>{
    console.log(`listening on http://${HOST}:${PORT}`)
})