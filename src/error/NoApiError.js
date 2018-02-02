/**
 * Unsupported Transport Error
 */
class noApi extends Error {

    /**
     * Creates noApi
     */
    constructor() {
        super();

        this.message = `No API selected.\nPlease, choose one according to documentation.`;
    }
}

module.exports = noApi;