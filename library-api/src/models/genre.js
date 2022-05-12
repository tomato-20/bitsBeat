const { default: mongoose } = require('mongoose');

const Schema = require('mongoose').Schema;

const GenreSchema = new Schema({
    name: { type: String, require: true, minlength: 3, maxlength: 100 }
})

GenreSchema.virtual('url').get(() => {
    return '/catalogue/genre/' + this._id;
})

module.exports = mongoose.model('Genre', GenreSchema);