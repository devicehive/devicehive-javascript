const EventEmitter = require('events');
const Transport = require('./transports/base/Transport');
const HTTP = require('./transports/HTTP');
const WS = require('./transports/WS');
const API = require(`./controllers/API`);
const ApiMap = require(`./controllers/transportResolvers/ApiMap`);
const Utils = require('./utils/Utils');
const UnsupportedTransportError = require('./error/UnsupportedTransportError');


/**
 * ApiStrategy. This class handles all transport specific moments
 * @event message
 * @event error
*/
class ApiStrategy extends EventEmitter {

    static get MESSAGE_EVENT() { return Transport.MESSAGE_EVENT; }
    static get ERROR_EVENT() { return Transport.ERROR_EVENT; }

    /**
     * Returns transport by url
     * @param url
     * @returns Transport Class
     */
    static getTransport(url) {
        if (url.startsWith(HTTP.TYPE)) {
            return HTTP;
        } else if (url.startsWith(WS.TYPE)) {
            return WS;
        } else {
            throw new UnsupportedTransportError();
        }
    }


    /**
     * Creates ApiStrategy
     * @param {object} urls ({ mainServiceURL, authServiceURL, pluginServiceURL })
     */
    constructor({ mainServiceURL, authServiceURL, pluginServiceURL }) {
        super();

        const me = this;

        me.subscriptionMap = new Map();
        me.subscriptionIdsMap = new Map();
        me.subscriptionLastTimestampMap = new Map();
        me.reconnectionHandler = null;
        me.reAuthorizationHandler = null;

        me.urlsMap = new Map();

        me.urlsMap.set(API.MAIN_BASE, mainServiceURL);
        me.urlsMap.set(API.AUTH_BASE, authServiceURL);
        me.urlsMap.set(API.PLUGIN_BASE, pluginServiceURL);

        me.transport = new (ApiStrategy.getTransport(mainServiceURL))({ url: mainServiceURL });

        me._initTransportSpecificFunctionality();

        me.transport.on(Transport.MESSAGE_EVENT, (message) => {
            switch (me.transport.type) {
                case HTTP.TYPE:
                    if (message.subscriptionId) {
                        message.subscriptionId = me._internalSubscriptionIdToExternal(message.subscriptionId);
                    }

                    if (message.subscriptionId && message.timestamp) {
                        me.subscriptionLastTimestampMap.set(message.subscriptionId, message.timestamp)
                    }

                    me.emit(ApiStrategy.MESSAGE_EVENT, message);
                    break;
                case WS.TYPE:
                    if (message.subscriptionId && message.action) {
                        const messageData = message[message.action.split(`/`).shift()];

                        messageData.subscriptionId = me._internalSubscriptionIdToExternal(message.subscriptionId);

                        if (messageData.timestamp) {
                            me.subscriptionLastTimestampMap.set(messageData.subscriptionId, messageData.timestamp)
                        }

                        me.emit(ApiStrategy.MESSAGE_EVENT, messageData);
                    } else {
                        me.emit(ApiStrategy.MESSAGE_EVENT, message);
                    }
                    break;
            }
        });

        me.transport.on(Transport.RECONNECTED_EVENT, () => {
            if (me.reAuthorizationHandler) {
                const subscriptionKeys = Array.from(me.subscriptionMap.keys());
                const subscriptionValues = Array.from(me.subscriptionMap.values());

                me.reAuthorizationHandler()
                    .then(() => Promise.all(subscriptionValues
                        .map(({ key, parameters, body }) => me.send(key, parameters, body))))
                    .then(() => subscriptionKeys
                        .forEach((subscriptionId) => me.subscriptionMap.delete(subscriptionId)))
                    .catch((error) => me.emit(ApiStrategy.ERROR_EVENT, error));
            }
        });

        me.transport.on(Transport.ERROR_EVENT, (error) => me.emit(ApiStrategy.ERROR_EVENT, error));
    }

    get reconnectionAttempts() {
        const me = this;

        return me.transport.reconnectionAttempts;
    }

    set reconnectionAttempts(value) {
        const me = this;

        me.transport.reconnectionAttempts = value;
    }

    get reconnectionInterval() {
        const me = this;

        return me.transport.reconnectionInterval;
    }

    set reconnectionInterval(value) {
        const me = this;

        me.transport.reconnectionInterval = value;
    }

    /**
     * Connect transport
     * @returns {Promise<any>}
     */
    connect() {
        const me = this;

        return me.transport.connect();
    }

    /**
     * Authorize transport
     * @param accessToken
     * @returns {Promise}
     */
    authorize(accessToken) {
        const me = this;

        me.reAuthorizationHandler = () => me.transport.authenticate(accessToken);

        return me.transport.authenticate(accessToken);
    }

    /**
     * Send message via transport
     * @param key
     * @param parameters
     * @param body
     */
    send(key, parameters, body) {
        const me = this;
        const isSubscription = ApiMap.isSubscription(key);
        const isUnsubscription = ApiMap.isUnsubscription(key);
        let externalSubscriptionId, internalSubscriptionId;

        if (isSubscription) {
            me.subscriptionMap.forEach((subscriptionArguments, subscriptionId) => {
                if (subscriptionArguments.key === key &&
                    subscriptionArguments.parameters === parameters &&
                    subscriptionArguments.body === body) {
                    externalSubscriptionId = me._internalSubscriptionIdToExternal(subscriptionId);
                    internalSubscriptionId = subscriptionId;
                    parameters.timestamp = me.subscriptionLastTimestampMap.get(externalSubscriptionId);
                }
            });
        } else if (isUnsubscription) {
            externalSubscriptionId = parameters.subscriptionId;
            parameters.subscriptionId = me.subscriptionIdsMap.get(externalSubscriptionId);
        }

        const sendData = API.build(me.transport.type, key, parameters, body);

        switch (me.transport.type) {
            case HTTP.TYPE:
                sendData.endpoint = `${me.urlsMap.get(sendData.base)}${sendData.endpoint}`;
                break;
            case WS.TYPE:
                sendData.requestId = Utils.randomString();
                break;
        }

        function handleResponse(response) {
            let normalizedResponse = API.normalizeResponse(me.transport.type, key, response);

            if (isSubscription) {
                let newExternalSubscriptionId;

                if (internalSubscriptionId) {
                    me.subscriptionIdsMap.forEach((internalSubId, externalSubId) => {
                        if (internalSubscriptionId === internalSubId) {
                            newExternalSubscriptionId = externalSubId;
                        }
                    });
                } else {
                    newExternalSubscriptionId = Utils.randomString();
                }

                me.subscriptionMap.set(normalizedResponse.subscriptionId, { key, parameters, body });
                me.subscriptionIdsMap.set(newExternalSubscriptionId, normalizedResponse.subscriptionId);
                normalizedResponse = { subscriptionId: newExternalSubscriptionId };
            } else if (isUnsubscription) {
                me.subscriptionMap.delete(parameters.subscriptionId);
                me.subscriptionIdsMap.delete(externalSubscriptionId);
            }

            return normalizedResponse;
        }

        return me.transport.send(sendData)
            .then(handleResponse)
            .catch(error => {
                if (error === Utils.TOKEN_EXPIRED_MARK && me.reconnectionHandler) {
                    return me.reconnectionHandler()
                        .then(() => me.transport.send(sendData))
                        .then(handleResponse)
                        .catch((reconnectionError) => { throw reconnectionError });
                } else {
                    throw error;
                }
            });
    }

    /**
     * Disconnects transport
     */
    disconnect() {
        const me = this;

        me.transport.disconnect();
    }

    /**
     * Initialize all transport specific functionality
     * @private
     */
    _initTransportSpecificFunctionality() {
        const me = this;

        switch (me.transport.type) {
            case HTTP.TYPE:
                me.transport.initPingParameters(`${me.urlsMap.get(API.MAIN_BASE)}/info`, HTTP.GET_METHOD);
                break;
        }
    }

    /**
     *
     * @param subscriptionId
     * @returns {*}
     * @private
     */
    _externalSubscriptionIdToInternal(subscriptionId) {
        const me = this;

        return me.subscriptionIdsMap.get(subscriptionId) || subscriptionId;
    }

    /**
     *
     * @param subscriptionId
     * @returns {*}
     * @private
     */
    _internalSubscriptionIdToExternal(subscriptionId){
        const me = this;
        let result = subscriptionId;

        me.subscriptionIdsMap.forEach((internalSubId, externalSubId) => {
           if (internalSubId === subscriptionId) {
               result = externalSubId;
           }
        });

        return result;
    }
}


module.exports = ApiStrategy;