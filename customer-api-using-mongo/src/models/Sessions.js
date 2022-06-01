const {default: mongoose } = require('mongoose');

const {Schema} = mongoose;

const {accessTokenExpiracy} = require('../helper/constants/expiracyTime');
const { dateNow } = require('../utils/time');

const SessionSchema = new Schema({
    user_id : {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    is_valid: {
        type: Boolean,
        required: true,
        default: false
    },
    expires_at : {
        type: Date
    }
},{
    timestamps:{
        createdAt : 'created_at',
        updatedAt: 'updated_at'
    }
})

SessionSchema.pre('save',async function(next) {
    this.expires_at = dateNow.addSeconds(accessTokenExpiracy)
    next()
})


module.exports = mongoose.model('Sessions', SessionSchema);