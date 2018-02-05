/**
 * Unsupported Transport Error
 */
class UnsupportedApiTransportError extends Error {

    /**
     * Creates UnsupportedApiTransportError
     */
    constructor({ key, transport }) {
        super();

        this.message = `${key} API is not supported by the ${transport} transport.`;
    }
}

module.exports = UnsupportedApiTransportError;