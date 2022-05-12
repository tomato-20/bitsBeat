const { ListIndexesCursor } = require('mongodb');
const { default: mongoose } = require('mongoose');

const Schema = require('mongoose').Schema;

const AuthorSchema = new Schema({
    first_name : {
        type: String,
        required: true,
        maxlength: 100
    },
    family_name : {
        type: String,
        required: true,
        maxlength: 100
    },
    date_of_birth: {
        type: Date
    },
    date_of_death: {
        type: Date
    }
})

AuthorSchema.virtual('name').get(()=>{
    let fullname = '';
    if(this.first_name && this.family_name) {
        fullname = `${first_name} ${fullname}`;
    }
    if(!this.first_name || this.family_name) {
        fullname = first_name?first_name:family_name;
    }
    return fullname;
})

AuthorSchema.virtual('lifespan').get(()=>{
    var lifetime = '';
    if(this.date_of_birth) {
        lifetime = ''
        this.date_of_birth.getYear().toString();
    }
    lifetime += ' - ';
    if(this.date_of_death) {
        lifetime +=
        this.date_of_death.getYear().toString();
    }
    return lifetime;

})

AuthorSchema.virtual('url').get( () => {
    return '/catalogue/author/' + this._id;
})


module.exports = mongoose.model('Author', AuthorSchema);


