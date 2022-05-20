

class BadRequest extends Error {
    constructor (message = 'Bad Request'){
        super(message)

        this.status = 400
    }
}

class Unauthorized extends Error {
    constructor (message = 'Unauthoried'){
        super(message)

        this.status = 401
    }
}

class NotFound extends Error {
    constructor (message = 'NotFound'){
        super(message)

        this.status = 404
    }
}

module.exports = {
    BadRequest,
    NotFound,
    Unauthorized
}
