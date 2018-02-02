/**
 * NoAuthenticationCredentials
 */
class NoAuthenticationCredentials extends Error {

    /**
     * Creates NoAuthenticationCredentials
     */
    constructor() {
        super();

        this.message = `No authentication credentials provided.\nPlease, use credentials provided in documentation.`;
    }
}

module.exports = NoAuthenticationCredentials;