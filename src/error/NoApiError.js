/**
 * Unsupported Transport Error
 */
class NoApiError extends Error {

    /**
     * Creates NoApiError
     */
    constructor() {
        super();

        this.message = `No API selected.\nPlease, choose one according to documentation.`;
    }
}

module.exports = NoApiError;