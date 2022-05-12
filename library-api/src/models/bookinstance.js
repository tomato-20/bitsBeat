const { default: mongoose } = require('mongoose');

const Schema = require('mongoose').Schema;

const BookInstanceSchema = new Schema({
    book: {
        type: String, requiredt: true
    },
    imprint: { type: String, required: true },
    status: { type: String, required: true, enum: ['Available', 'Maintaineance', 'Loaned', 'Reserved'], default: "Maintenance" },

    due_back: { type: Date, default: Date.now() }
})

BookInstanceSchema.virtual('url').get(() => {
    return `/catalogu/bookinstance/` + _.id;
})

module.exports = mongoose.model('BookInstance', BookInstanceSchema)