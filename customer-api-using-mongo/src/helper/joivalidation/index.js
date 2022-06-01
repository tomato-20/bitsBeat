const {validateUserSearch }= require('./Admin')
const {validateUserLogin,validateRefreshToken} = require('./Auth');
const {validatePasswordReset,validatePasswordResetRequest} = require('./resetPassword')
const {validateCreateUser,validateUserUpdate,validateChangePassword} = require('./Users')

module.exports = {
    validatePasswordReset,
    validatePasswordResetRequest,
    validateRefreshToken,
    validateUserSearch,
    validateUserLogin,
    validateCreateUser,
    validateUserUpdate,
    validateChangePassword
}