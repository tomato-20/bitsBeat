const router = require('express').Router();

const roles = require('../helper/constants/roles');
const {validateUserSearch} = require('../helper/joivalidation/Admin')
const adminController = require('../controllers/Admin')
const authenticate = require('../helper/authmiddlewere');
const authorize = require('../helper/authorizemiddlewere');

router.get('/users',
    authenticate,authorize([roles.Admin,roles.SuperAdmin]),
    adminController.get_all_users
)

router.post('/users',
    authenticate,authorize([roles.Admin,roles.SuperAdmin]),
    validateUserSearch,
   adminController.search_users
)

module.exports = router;

