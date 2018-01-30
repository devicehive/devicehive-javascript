const Utils = require(`../../utils/Utils`);


/**
 *
 */
class WebSocketApiResolver {

    /**
     *
     * @param action
     * @param bodyKey
     */
    constructor({ action, bodyKey }) {
        const me = this;

        me.action = action;
        me.bodyKey = bodyKey;
    }

    /**
     *
     * @param parameters
     * @param body
     * @returns {{action: *}}
     */
    build(parameters, body) {
        const me = this;
        const result = Utils.isObjectEmpty(parameters) && !me.bodyKey ? body : parameters;

        result.action = me.action;

        if (body && me.bodyKey) {
            result[me.bodyKey] = body;
        }

        return result;
    }
}


module.exports = WebSocketApiResolver;