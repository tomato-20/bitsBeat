const { Schema, default: mongoose } = require('mongoose');
const { v4: uuidv4 } = require('uuid')
const crypt = require('../utils/bcrypt')
const roles = require('../helper/constants/roles')

let validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserSchema = new Schema({
    uuid: {
        type: String,
        default: () => uuidv4()
    },
    username: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    role: {
        type: String,
        enum: Object.values(roles),
        default: roles.User,
    },
    status: {
        type: String,
        enum: ['pending', 'active'],
        default: 'pending'
    },
    deleted_at: {
        type: Date,
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    const hash = await crypt.hash(this.password);
    this.password = hash;
    next();
})

module.exports = mongoose.model('Users', UserSchema);