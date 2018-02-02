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
        return `${format(base, parameters)}?${queryString.stringify(parameters)}`;
    }

    /**
     *
     * @param method
     * @param uri
     * @param base
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