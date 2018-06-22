/**
 * ReconnectionAttemptFailedError class
 */
class ReconnectionAttemptFailedError extends Error {

    /**
     * Creates new InvalidCredentialsError
     */
    constructor(attempt) {
        super();

        this.message = `Reconnection attempt number ${attempt} is failed`;
    }
}


module.exports = ReconnectionAttemptFailedError;