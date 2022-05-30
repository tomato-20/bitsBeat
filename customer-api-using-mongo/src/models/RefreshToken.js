const { MongoMissingCredentialsError } = require('mongodb');
const mongoose = require('mongoose');

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
        enum: ['revoked','active'],
        required : true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('refresh_token',refreshTokenSchema)