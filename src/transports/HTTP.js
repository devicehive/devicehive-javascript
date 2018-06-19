require('isomorphic-fetch');
const Transport = require(`./base/Transport`);
const Utils = require('../utils/Utils');


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
    send({ endpoint, method, body, subscription, unsubscription, noAuth, polling=false }) {
        const me = this;

        if (subscription === true) {
            const subscriptionId = Utils.randomString();
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

                return Promise.resolve({ status: `success` });
            } else {
                return Promise.resolve({ status: `No such subscription` });
            }
        } else {
            return fetch(endpoint, { headers: me._getHeaders(noAuth), method: method, body: JSON.stringify(body) })
                .then(response => response.text())
                .then(responseText => responseText ? JSON.parse(responseText) : responseText)
                .catch(error => {
                    if (!polling) {
                        me.emit(Transport.ERROR_EVENT, error);
                    }
                });
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
            me.send({ endpoint, method, body, polling: true })
                .then((messageList) => {
                    if (!stopped) {
                        if (messageList && messageList.length) {
                            messageList.forEach((message) => me.emit(Transport.MESSAGE_EVENT, message));
                        }

                        poll(endpoint, method, body);
                    }
                })
                .catch((error) => me.emit(Transport.ERROR_EVENT, error));
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
    _getHeaders(noAuth = false) {
        const me = this;
        const headers = {
            "Content-type": `application/json`,
            "Accept": `application/json`
        };

        if (me.token && !noAuth) {
            headers.Authorization = `Bearer ${me.token}`;
        }

        return headers;
    }

    /**
     * Disconnects HTTP transport
     */
    disconnect() {
        const me = this;

        me.token= ``;
    }
}


module.exports = HTTP;