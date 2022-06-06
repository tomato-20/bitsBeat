class CustomError extends Error {
    constructor(message = 'Something went wrond', status = 500, errorType = 'Internal server error') {
        super(message);
        this.status = status
        this.errorType = errorType
    }
}

module.exports = CustomError