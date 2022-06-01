const mongoose  = require('mongoose');
const crypt = require('../utils/bcrypt');
const { dateNow } = require('../utils/time');

let EXPIRY_TIME_SEC = 5*60; // expires in 5 min

const resetPasswordSchema = new mongoose.Schema({
  user_id : {
      type : mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Users'
  },
  token: {
    type: String,
    required: true
  },
  created_at : {
    type: Date,
    default: Date.now,
    expires: EXPIRY_TIME_SEC
  },
  expires_at : {
    type: Date
  }
})

resetPasswordSchema.pre('save', async function(next) {
  // save hash of the token before save
  const tokenHash = await crypt.hash(this.token);
  this.token = tokenHash;

  // set the expiry date to +5 min of token creation
  this.expires_at = dateNow.addSeconds(EXPIRY_TIME_SEC);
  next()
})


 module.exports = ResetToken = mongoose.model('reset_password_token', resetPasswordSchema)