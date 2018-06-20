require('isomorphic-fetch');
const Transport = require(`./base/Transport`);
const Utils = require('../utils/Utils');
const ReconnectionAttemptFailedError = require('../error/ReconnectionAttemptFailedError');


/**
 * HTTP Transport class
 * @event open
 * @event message
 * @event error
 * @event reconnected
 */
class HTTP extends Transport {

    static get TYPE() { return `http`; }
    static get GET_METHOD() { return `GET`; }

    /**
     * Creates HTTP
     */
    constructor() {
        super();

        const me = this;

        me.type = HTTP.TYPE;
        me.token= ``;
        me.subscriptionMap = new Map();
        me.reconnectionIntervalHandler = null;
        me.pingUrl = ``;
        me.pingMethod = ``;
    }

    /**
     * Connect HTTP transport
     */
    connect() {
        const me = this;

        return new Promise((resolve) => {
            me._ping()
                .then(resolve)
                .catch(() => me._startReconnection());
        });
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
     * HTTP transport send method
     * @param endpoint
     * @param method
     * @param body
     * @param subscription
     * @param unsubscription
     * @param noAuth
     * @param polling
     * @returns {*}
     */
    send({ endpoint, method, body, subscription, unsubscription, noAuth, polling=false }) {
        const me = this;

        if (subscription === true) {
            const subscriptionId = Utils.randomString();
            const longPollingHandler = me._initLongPolling(endpoint, method, body);

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
                    if (!polling) { throw error; }
                    else { return me._ping().catch(() => me._startReconnection()); }
                })
        }
    }

    /**
     * Disconnects HTTP transport
     */
    disconnect() {
        const me = this;

        me._stopAllPolling();

        me.token= ``;
    }

    /**
     * Initialize http sever ping parameters
     * @param pingUrl
     * @param pingMethod
     */
    initPingParameters(pingUrl, pingMethod) {
        const me = this;

        me.pingUrl = pingUrl;
        me.pingMethod = pingMethod;
    }

    /**
     * Ping server
     * @returns {Promise<Response>}
     * @private
     */
    _ping() {
        const me = this;

        return fetch(me.pingUrl, { headers: me._getHeaders(true), method: me.pingMethod });
    }

    /**
     * Initialize polling functionality
     * @param endpoint
     * @param method
     * @param body
     * @returns {{poll: poll, stop: stop}}
     */
    _initLongPolling(endpoint, method, body) {
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
     * Reconnection routine
     * @private
     */
    _startReconnection() {
        const me = this;
        let successfulPinged = false;
        let reconnectionCounter = 0;

        me._stopAllPolling();

        me.reconnectionIntervalHandler = setInterval(() => {
            me._ping()
                .then(() => {
                    if (!successfulPinged) {
                        successfulPinged = true;
                        clearInterval(me.reconnectionIntervalHandler);

                        me.emit(Transport.RECONNECTED_EVENT);
                    }
                })
                .catch(() => {
                    if (!successfulPinged) {
                        reconnectionCounter++;

                        if (reconnectionCounter === me.reconnectionAttempts) {
                            clearInterval(me.reconnectionIntervalHandler);
                        }

                        me.emit(Transport.ERROR_EVENT, new ReconnectionAttemptFailedError(reconnectionCounter));
                    }
                });
        }, me.reconnectionInterval);
    }

    /**
     * Stop all polling handlers
     * @private
     */
    _stopAllPolling() {
        const me = this;

        me.subscriptionMap.forEach((pollingHandler) => pollingHandler.stop());
        me.subscriptionMap.clear();
    }

    /**
     * Returns request headers
     * @param noAuth
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
}


module.exports = HTTP;