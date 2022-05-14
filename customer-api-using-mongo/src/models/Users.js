const {Schema, default: mongoose} = require('mongoose');
const {v4 : uuidv4} = require('uuid') 


let validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserSchema = new Schema({
    uuid : {
        type: String,
        default: ()=>uuidv4()
    },
    username : {
        type : String,
        required: true,
        minlength:3 
    },
    email: {
        type: String,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    },
    created_by : {
        type: String, 
    },
    updated_by : {
        type: String,
    },
    deleted_at: {
        type : Date,
    },
    deleted_by: {
        type : String,
    },
    deleted: {
        type: Boolean,
        default: false
    } 
},{timestamps: {
    createdAt : 'created_at',
    updatedAt : 'updated_at'
}});

module.exports = mongoose.model('Users',UserSchema);