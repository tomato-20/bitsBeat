const mongoose = require('mongoose')
const {dateNow} = require('../utils/time')


let EXPIRY_TIME_SEC =   24 * 60 * 60; //expires in one day

const ConfirmationCodeSchema = new mongoose.Schema({
    user_id :{
        type:  mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'Users'
    },
    code: {
        type: String,
        required: true,
    },
    created_at : {
        type : Date,
        default: Date.now,
        required: true
    },
    expires_at : {
        type: Date,
    }
})

ConfirmationCodeSchema.pre('save', async function(next) {
    // set the expiry date to +5 min of token creation
    this.expires_at = dateNow.addSeconds(EXPIRY_TIME_SEC);
    next()
  })

module.exports = mongoose.model('confirmation_code',ConfirmationCodeSchema)