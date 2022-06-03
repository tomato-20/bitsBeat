const http = require('http');
const  app = require('./app');
require('dotenv').config();

port = process.env.PORT;
host = process.env.HOST;

const server = http.createServer(app);

server.listen(port,host,()=>{
    console.log(`listening on http://${host}:${port}`)
})

