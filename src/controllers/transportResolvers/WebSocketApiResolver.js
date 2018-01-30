
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
        const result = Object.assign(
            parameters,
            {
                action: me.action
            }
        );

        if (body && me.bodyKey) {
            result[me.bodyKey] = body;
        }

        return result;
    }
}


module.exports = WebSocketApiResolver;