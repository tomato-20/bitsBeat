const mongoose = require('mongoose');

const { dateNow } = require('../utils/time');
const {refreshTokenExpiracy} = require('../helper/constants/expiracyTime');


const refreshTokenSchema = mongoose.Schema({
    user_id : {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
        required : true
    },
    token : {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['revoked','active','invalid'],
        required : true
    },
    revoked : {
        type: Boolean,
        default: false
    },
    revoked_at : {
        type: Date
    },
    expires_at : {
        type: Date
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

refreshTokenSchema.pre('save', async function(next){
    this.expires_at = dateNow.addSeconds(refreshTokenExpiracy);
    next()
})


module.exports = mongoose.model('refresh_token',refreshTokenSchema)