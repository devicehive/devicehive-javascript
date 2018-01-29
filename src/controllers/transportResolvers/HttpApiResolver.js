const format = require("string-template");
const queryString = require('query-string');


/**
 *
 */
class HttpApiResolver {

    /**
     *
     * @param base
     * @param parameters
     * @returns {string}
     */
    static buildUrl(base, parameters) {
        return `${format(base, parameters)}?${queryString.stringify(parameters)}`;
    }

    /**
     *
     * @param method
     * @param uri
     */
    constructor({ method, uri }) {
        const me = this;

        me.method = method;
        me.uri = uri;
    }

    /**
     *
     * @param parameters
     * @param body
     * @returns {{method: *, endpoint: string}}
     */
    build(parameters, body) {
        const me = this;
        const result = {
            method: me.method,
            endpoint: HttpApiResolver.buildUrl(me.uri, parameters)
        };

        if (body) {
            result.body = body;
        }

        return result;
    }
}


module.exports = HttpApiResolver;