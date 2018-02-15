/**
 * InvalidCredentialsError class
 */
class InvalidCredentialsError extends Error {

    /**
     * Creates new InvalidCredentialsError
     */
    constructor() {
        super();

        this.message = `Invalid credentials error during attempt to authenticate.`;
    }
}


module.exports = InvalidCredentialsError;