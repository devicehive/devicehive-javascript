class API {
    /**
     * API
     */
    constructor({ strategy }) {
        this.send = (data) => {
            return strategy.send({
                ...data,
                apiType: this.type
            });
        }
    }
}

module.exports = API;