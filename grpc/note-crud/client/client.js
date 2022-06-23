const path = require('path')

const PROTO_PATH = path.normalize(__dirname + '/../proto/customers.proto');

const grpc = require("@grpc/grpc-js")
const protoLoader = require("@grpc/proto-loader")

let packageDefinition = protoLoader.loadSync(PROTO_PATH,{
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
})

const CustomerService = grpc.loadPackageDefinition(packageDefinition).customer.CustomerService;

const client = new CustomerService("localhost:33000", grpc.credentials.createInsecure())

module.exports = client;