const Router = require('express').Router();

const authorRouter = require('./authorRouter')


Router.use('/author', authorRouter);

// books router 
// genre router

module.exports = Router;