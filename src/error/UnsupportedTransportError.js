/**
 * UnsupportedTransportError class
 */
class UnsupportedTransportError extends Error {

    /**
     * Creates new UnsupportedTransportError
     */
    constructor() {
        super();

        this.message = `You are trying to use unsupported transport type.\nPlease, use one of provided in documentation.`;
    }
}


module.exports = UnsupportedTransportError;