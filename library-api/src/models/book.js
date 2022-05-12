const { default: mongoose } = require('mongoose');

const Schema = require('mongoose').Schema;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author', required: true
    },
    summary: {
        type: String,
        required: true,
    },
    isbn: {
        type: String,
        required: true
    },
    genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }]

})

BookSchema.virtual('url').get(() => {
    return '/catalogue/book/' + this._id;
})

module.exports = mongoose.model('Book', BookSchema);