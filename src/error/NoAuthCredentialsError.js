/**
 * NoAuthenticationCredentials class
 */
class NoAuthenticationCredentials extends Error {

    /**
     * Creates new NoAuthenticationCredentials
     */
    constructor() {
        super();

        this.message = `No authentication credentials provided.\nPlease, use credentials provided in documentation.`;
    }
}


module.exports = NoAuthenticationCredentials;