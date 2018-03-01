/**
 * InvalidCredentialsError class
 */
class InvalidCredentialsError extends Error {

    /**
     * Creates new InvalidCredentialsError
     */
    constructor(message) {
        super();

        this.message = `Invalid credentials error during attempt to authenticate. Error: ${message}`;
    }
}


module.exports = InvalidCredentialsError;