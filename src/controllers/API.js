const ApiMap = require(`./transportResolvers/ApiMap`);

/**
 * API
 */
class API {

    static get HTTP_API() { return ApiMap.HTTP_API; }
    static get WS_API() { return ApiMap.WS_API; }

    static get MAIN_BASE() { return ApiMap.MAIN_BASE; }
    static get AUTH_BASE() { return ApiMap.AUTH_BASE; }
    static get PLUGIN_BASE() { return ApiMap.PLUGIN_BASE; }

    /**
     * Builds data for selected transport
     * @param transport
     * @param key
     * @param parameters
     * @param body
     */
    static build(transport, key, parameters, body) {
        return ApiMap.build(transport, key, parameters, body);
    }


    /**
     * Creates API
     */
    constructor({ strategy }) {
        const me = this;

        me.strategy = strategy;
    }

    /**
     *
     */
    send(key, parameters, body) {
        const me = this;

        return me.strategy.send(key, parameters, body);
    }
}


module.exports = API;