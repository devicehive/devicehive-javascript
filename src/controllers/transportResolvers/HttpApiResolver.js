const format = require("string-template");
const queryString = require('query-string');


/**
 * HttpApiResolver
 */
class HttpApiResolver {

    /**
     * Builds URL
     * @param {string} base - base URI
     * @param {object} parameters - URI parameters
     * @returns {string}
     */
    static buildUrl(base, parameters) {
        const stringParameters = queryString.stringify(parameters);
        const url = format(base, parameters);

        return stringParameters ? `${url}?${stringParameters}` : url;
    }

    /**
     * Normalaizes response
     * @param {object} response
     * @returns {{*}} - Normalized response
     */
    static normalizeResponse(response) {
        if (response.error) {
            throw response.message;
        }

        return response;
    }

    /**
     * @param {object} options
     * @param {string} options.method
     * @param {string} options.uri
     * @param {string} options.base
     * @param {boolean} options.subscription
     * @param {boolean} options.unsubscription
     */
    constructor({ method, uri, base, subscription, unsubscription }) {
        const me = this;

        me.method = method;
        me.uri = uri;
        me.base = base;
        me.subscription = subscription;
        me.unsubscription = unsubscription;
    }

    /**
     * Builds request
     * @param {object} parameters
     * @param {object} body
     * @returns {{method: *, endpoint: string}}
     */
    build(parameters, body) {
        const me = this;
        let result;
        
        if (me.unsubscription === true) {
            result = {
                unsubscription: me.unsubscription,
                body: {
                    subscriptionId: parameters.subscriptionId
                }
            };
        } else {
            result = {
                method: me.method,
                endpoint: HttpApiResolver.buildUrl(me.uri, parameters),
                base: me.base,
                subscription: me.subscription
            };

            if (body) {
                result.body = body;
            }
        }

        return result;
    }
}


module.exports = HttpApiResolver;