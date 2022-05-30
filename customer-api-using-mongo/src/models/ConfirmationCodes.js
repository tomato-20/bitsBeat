const mongoose = require('mongoose')

let EXPIRY_TIME_SEC =   24 * 60 * 60; //expires in one day
// let EXPIRY_TIME_SEC =   60; //expires in a minute

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
    let date = new Date();
    date.setSeconds(date.getSeconds() + parseInt(EXPIRY_TIME_SEC));
    this.expires_at = date;
    next()
  })

module.exports = mongoose.model('confirmation_code',ConfirmationCodeSchema)