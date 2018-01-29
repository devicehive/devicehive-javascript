class WebSocketApiReslover {
    constructor({ action, bodyKey }) {
        const me = this;

        me.action = action;
        me.bodyKey = bodyKey;
    }

    build(parameters, body) {
        const me = this;
        const result = {
            ...parameters,
            action: me.action
        };

        if (body && me.bodyKey) {
            result[me.bodyKey] = body;
        }

        return result;
    }
}

module.exports = WebSocketApiReslover;