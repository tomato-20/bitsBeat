const path = require('path')
const { v4: uuidv4 } = require("uuid");
const PROTO_PATH = path.normalize(__dirname + '/../proto/customers.proto');

const dbhelper = require('../db/db.helper');
const dbservices = require('../db/customer.db.service')

const app = {};

dbhelper.init(app);

console.log(app)

let grpc = require('@grpc/grpc-js');
let protoLoader = require('@grpc/proto-loader')

// sample data
const customers = [
    {
        id: "a68b823c-7ca6-44bc-b721-fb4d5312cafc",
        name: "John Bolton",
        age: 23,
        address: "Address 1"
    },
    {
        id: "34415c7c-f82d-4e44-88ca-ae2a1aaa92b7",
        name: "Mary Anne",
        age: 45,
        address: "Address 2"
    }
]

// proto transcript into a js object
// set its package definitions 
let packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

// create server
const server = new grpc.Server();

// pass package definition object to loadPackageDefinition 
// create grpc object
let customersProto = grpc.loadPackageDefinition(packageDefinition).customer;

server.addService(customersProto.CustomerService.service, {
    getAll: async (_, callback) => {
        // console.log(app)
        let customers = app.db.collection('customer');

        try {
            let data = await dbservices.findAll(customers);
            return callback(null, { customers: data });
        } catch (error) {
            return callback({ details: error })
        }
    },

    get: async (call, callback) => {

        let customers = app.db.collection('customer');

        try {
            let data = await customers.findOne({ id: call.request.id })
            if (data) return callback(null, data)
            else return callback({ code: grpc.status.NOT_FOUND, details: `Customer with id : ${call.request.id} Not found` })
        } catch (error) {
            callback({ details: error })
        }
    },

    insert: async (call, callback) => {

        let customers = app.db.collection('customer')

        let insertData = call.request;
        insertData.id = uuidv4();

        try {
            let oldUSer = await customers.findOne({ email: insertData.email })
            if (oldUSer) return callback({ code: grpc.status.ALREADY_EXISTS, details: "User already exist" })
            await customers.insert(insertData)
            callback(null, { id: insertData.id })
        } catch (error) {
            return callback({ details: error })
        }
    },

    update: async (call, callback) => {

        let customers = app.db.collection('customer')
        let id = call.request.id

        try {
            let oldUSer = await customers.findOne({ id })
            if (!oldUSer) {
                callback({ code: grpc.status.NOT_FOUND, details: "Customer not found" })
            } else {
                let updated = await customers.findOneAndUpdate({ id }, { $set: { ...customers.request } })
                callback(null, updated.value)
            }
        } catch (error) {
            return callback({ details: error })
        }
    },

    remove: async (call, callback) => {
        const customers = app.db.collection('customer')
        let id = call.request.id

        try {
            let foundCustomer = await customers.findOne({ id })
            if (!foundCustomer) {
                callback({ code: grpc.status.NOT_FOUND, details: "Customer not found" })
            } else {
                await customers.deleteOne({ id })
                callback(null, {})
            }
        } catch (error) {
            callback({ details: error })
        }
    }

})

server.bindAsync('127.0.0.1:33000', grpc.ServerCredentials.createInsecure(), (err, port) => {
    console.log("server running at http://127.0.0.1:33000");
    server.start()
})
