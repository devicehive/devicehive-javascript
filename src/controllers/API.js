class API {

    static get DEVICE_TYPE() { return 'device'; }
    static get TOKEN_TYPE() { return 'token'; }
    static get INFO_TYPE() { return 'info'; }
    static get NETWORK_TYPE() { return 'network'; }
    static get USER_TYPE() { return 'user'; }

    /**
     * API
     */
    constructor({ strategy }) {
        this.send = data => {
            return strategy.send({
                ...data,
                apiType: this.type
            });
        }
    }
}

module.exports = API;