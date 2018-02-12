/**
 * UnsupportedApiTransportError class
 */
class UnsupportedApiTransportError extends Error {

    /**
     * Creates new UnsupportedApiTransportError
     */
    constructor({ key, transport }) {
        super();

        this.message = `${key} API is not supported by the ${transport} transport.`;
    }
}


module.exports = UnsupportedApiTransportError;