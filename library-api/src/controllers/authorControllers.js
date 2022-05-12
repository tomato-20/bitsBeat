const Author = require('../models/author');
const authorServices = require('../services/autherServices')

// Display list of all authors
exports.author_create_post = (req, res) => {
    try {
        res.send('NOT IMPLEMENTED : AUTHOR list')
    } catch (error) {
        next(error)
    }
}

// Display detail of a specific Author 
exports.author_detail = (req, res) => {
    try {
        res.send('NOT IMPLEMENTED : AUTHOR detail')
    } catch (error) {
        next(error)
    }
}


// Display Author create from POST
exports.author_create_post = function (req, res) {
    try {
        res.send('NOT IMPLEMENTED : AUTHOR create POST')
    } catch (error) {
        next(error)
    }
}

// Display Author create from POST
exports.author_create_post = function (req, res) {
    try {
        res.send('NOT IMPLEMENTED : AUTHOR create POST')
    } catch (error) {
        next(error)
    }
}

// Handle Author delete on POST.
exports.author_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Author delete POST');
};


// Handle Author update on POST.
exports.author_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Author update POST');
};

// Display all author list
exports.author_list = function (req, res) {
    try {
        const data = authorServices.getAllAuthors();
    } catch (error) {
        next(error)
    }
};

