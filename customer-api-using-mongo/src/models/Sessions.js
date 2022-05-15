const {default: mongoose } = require('mongoose');

const {Schema} = mongoose;

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
    }
},{
    timestamps:{
        createdAt : 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('Sessions', SessionSchema);