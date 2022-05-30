const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Users = require('./Users')
const Sessions = require('./Sessions')
const PasswordResetToken = require('./Users')
const RefreshToken = require('./RefreshToken')
const ConfirmationCode =  require('./ConfirmationCodes')

let db = {
    mongoose,
    Users,
    Sessions,
    PasswordResetToken,
    ConfirmationCode,
    RefreshToken
}

module.exports = db;
