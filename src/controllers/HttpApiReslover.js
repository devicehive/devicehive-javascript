const format = require("string-template");
const queryString = require('query-string');

class HttpApiReslover {

    static buildUrl(base, parameters) {
        return `${format(base, parameters)}?${queryString.stringify(parameters)}`;
    }

    constructor({ method, uri }) {
        const me = this;

        me.method = method;
        me.uri = uri;
    }

    build(parameters, body) {
        const me = this;
        const result = {
            method: me.method,
            endpoint: HttpApiReslover.buildUrl(me.uri, parameters)
        };

        if (body) {
            result.body = body;
        }

        return result;
    }
}

module.exports = HttpApiReslover;