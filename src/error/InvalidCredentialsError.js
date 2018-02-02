
/**
 * Unsupported Transport Error
 */
class InvalidCredentialsError extends Error {

    /**
     * Creates InvalidCredentialsError
     */
    constructor() {
        super();

        this.message = `Invalid credentials error during attempt to authenticate.`;
    }
}

module.exports = InvalidCredentialsError;