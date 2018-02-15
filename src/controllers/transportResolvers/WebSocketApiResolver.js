const Utils = require(`../../utils/Utils`);


/**
 * WebSocketApiResolver
 */
class WebSocketApiResolver {

    /**
     * Normalaizes response
     * @param {object} response - Response
     * @param {object} normalizationObject -  Normalization object
     * @returns {{}} - Normalized response
     */
    static normalizeResponse(response, normalizationObject) {
        let result = {};

        if (response.status === "error") {
            throw response.error;
        }

        if (normalizationObject) {
            if (normalizationObject.length) {
                normalizationObject.forEach(responseField =>
                    result[responseField] = response[responseField]);
            } else if (normalizationObject.bodyKey) {
                result = response[normalizationObject.bodyKey];
            }
        } else if (normalizationObject !== null) {
            result = response;
        }

        return result;
    }

    /**
     * @param action
     * @param bodyKey
     */
    constructor({ action, bodyKey }) {
        const me = this;

        me.action = action;
        me.bodyKey = bodyKey;
    }

    /**
     * Builds request
     * @param {object} parameters
     * @param {object} body
     * @returns {{action: *}}
     */
    build(parameters, body) {
        const me = this;
        const result = Utils.isObjectEmpty(parameters) && !me.bodyKey ? Object.assign({}, body) : Object.assign({}, parameters);

        result.action = me.action;

        if (body && me.bodyKey) {
            result[me.bodyKey] = body;
        }

        return result;
    }
}


module.exports = WebSocketApiResolver;