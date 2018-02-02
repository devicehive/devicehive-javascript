require('isomorphic-fetch');
const Transport = require(`./base/Transport`);
const randomString = require(`randomstring`);

/**
 * Rest API
 */
class HTTP extends Transport {

    static get TYPE() { return `http`; }

    /**
     * Creates HTTP
     */
    constructor() {
        super();

        const me = this;

        me.type = HTTP.TYPE;
        me.token= ``;
        me.subscriptionMap = new Map();
    }

    /**
     * Authenticate transport
     * @param {string} token - Auth token
     */
    authenticate(token) {
        const me = this;
        me.token = token;
        return Promise.resolve();
    }

    /**
     * Rest API send method
     */
    send({ endpoint, method, body, subscription, unsubscription }) {
        const me = this;

        if (subscription === true) {
            const subscriptionId = randomString.generate();
            const longPollingHandler = me.initLongPolling(endpoint, method, body);

            longPollingHandler.poll();

            me.subscriptionMap.set(subscriptionId, longPollingHandler);

            return Promise.resolve({ subscriptionId: subscriptionId })
        } else if (unsubscription === true) {
            const subscriptionId = body.subscriptionId;
            const longPollingHandler = me.subscriptionMap.get(subscriptionId);

            if (longPollingHandler) {
                longPollingHandler.stop();
                me.subscriptionMap.delete(subscriptionId);

                return Promise.resolve({ status: `success` })
            } else {
                return Promise.resolve({ status: `No such subscription` })
            }
        } else {
            return fetch(endpoint, { headers: me._getHeaders(), method: method, body: JSON.stringify(body) })
                .then(response => response.text())
                .then(responseText => responseText ? JSON.parse(responseText) : responseText);
        }
    }

    /**
     *
     * @param endpoint
     * @param method
     * @param body
     * @returns {{poll: poll, stop: stop}}
     */
    initLongPolling(endpoint, method, body) {
        const me = this;
        let stopped = false;

        /**
         * Poll notifications
         */
        function poll () {
            me.send({ endpoint, method, body })
                .then((data) => {
                    if (!stopped) {
                        data.forEach((data) => me.emit(`message`, data));
                        poll(endpoint, method, body)
                    }
                })
                .catch((error) => console.warn(error));
        }

        /**
         * Stop polling
         */
        function stop () {
            stopped = true;
        }

        return { poll, stop };
    }

    /**
     *
     * @returns {Object}
     * @private
     */
    _getHeaders() {
        const me = this;
        const headers = {
            "Content-type": `application/json`,
            "Accept": `application/json`
        };

        if (me.token) {
            headers[`Authorization`] = `Bearer ${me.token}`;
        }

        return headers;
    }
}


module.exports = HTTP;