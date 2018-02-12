/**
 * NoApiError class
 */
class NoApiError extends Error {

    /**
     * Creates new NoApiError
     */
    constructor() {
        super();

        this.message = `No API selected.\nPlease, choose one according to documentation.`;
    }
}


module.exports = NoApiError;