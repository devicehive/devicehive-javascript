/**
 * Unsupported Transport Error
 */
class UnsupportedApiTransportError extends Error {

    /**
     * Creates UnsupportedApiTransportError
     */
    constructor() {
        super();

        this.message = `No API selected.\nPlease, choose one according to documentation.`;
    }
}

module.exports = UnsupportedApiTransportError;