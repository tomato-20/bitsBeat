const Router = require('express').Router();
const author_controller = require('../src/controllers/authorControllers');

// POST request for creating Author.
Router.post('/author/create', author_controller.author_create_post);

// POST request to delete Author.
Router.post('/author/:id/delete', author_controller.author_delete_post);

// POST request to update Author.
Router.post('/author/:id/update', author_controller.author_update_post);
// GET request for one Author.

Router.get('/author/:id', author_controller.author_detail);

// GET request for list of all Authors.
Router.get('/', author_controller.author_list);


module.exports = Router;