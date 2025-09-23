

export class InvalidInputError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400; // Bad Request

        Error.captureStackTrace(this, this.constructor);
    }
}

export class AuthenticationFailedError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 401; // Unauthorized

        Error.captureStackTrace(this, this.constructor);
    }
}


export class UnAuthorizedError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 403; // Forbidden

        Error.captureStackTrace(this, this.constructor);
    }
}

export class InvalidResourceError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 404; // Not Found

        Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 422; // Unprocessable Entity

        Error.captureStackTrace(this, this.constructor);
    }
}

export class InvalidIdError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400; // Bad Request

        Error.captureStackTrace(this, this.constructor);
    }
}

