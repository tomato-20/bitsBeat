const mongoose  = require('mongoose');
const crypt = require('../utils/bcrypt')

const EXPIRY_TIME_SEC = 5*60; // expires in 5 min

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
    expires: 60
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
  let date = new Date();
  date.setSeconds(date.getSeconds() + parseInt(EXPIRY_TIME_SEC));
  this.expires_at = date;
  next()
})


 module.exports = ResetToken = mongoose.model('reset_password_token', resetPasswordSchema)