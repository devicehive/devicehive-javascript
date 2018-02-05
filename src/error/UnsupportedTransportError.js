/**
 * Unsupported Transport Error
 */
class UnsupportedTransportError extends Error {

    /**
     * Creates UnsupportedTransportError
     */
    constructor() {
        super();

        this.message = `You are trying to use unsupported transport type.\nPlease, use one of provided in documentation.`;
    }
}

module.exports = UnsupportedTransportError;