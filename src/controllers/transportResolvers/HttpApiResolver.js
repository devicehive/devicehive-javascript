const format = require("string-template");
const queryString = require('query-string');

/**
 * HttpApiResolver
 */
class HttpApiResolver {

    /**
     *
     * @param base
     * @param parameters
     * @returns {string}
     */
    static buildUrl(base, parameters) {
        const stringParameters = queryString.stringify(parameters);
        const readyUrl = stringParameters ? `${format(base, parameters)}?${queryString.stringify(parameters)}` : format(base, parameters);
        return readyUrl;
    }

    /**
     *
     * @param response
     * @returns {{}}
     */
    static normalizeResponse(response) {
        if (response.error) {
            throw response.message;
        }

        return response;
    }


    /**
     *
     * @param options
     * @param options.method
     * @param options.uri
     * @param options.base
     * @param options.subscription
     * @param options.unsubscription
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
     *
     * @param parameters
     * @param body
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