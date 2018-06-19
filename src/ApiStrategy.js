const EventEmitter = require('events');
const HTTP = require('./transports/HTTP');
const WS = require('./transports/WS');
const API = require(`./controllers/API`);
const ApiMap = require(`./controllers/transportResolvers/ApiMap`);
const Utils = require('./utils/Utils');
const UnsupportedTransportError = require('./error/UnsupportedTransportError');


/**
 * ApiStrategy
 * @event onMessage
*/
class ApiStrategy extends EventEmitter {

    /**
     * 
     * @param url
     * @returns Transport Class
     */
    static getType(url) {
        if (url.startsWith(HTTP.TYPE)) {
            return HTTP;
        } else if (url.startsWith(WS.TYPE)) {
            return WS;
        } else {
            throw new UnsupportedTransportError();
        }
    }

    /**
     *
     * @param key
     * @private
     */
    static _isSubscription(key) {
        return key === ApiMap.subscribeNotification || key === ApiMap.subscribeCommand;
    }

    /**
     *
     * @param key
     * @private
     */
    static _isUnsubscription(key) {
        return key === ApiMap.unsubscribeNotification || key === ApiMap.unsubscribeCommand;
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
        me.reconnectionHandler = null;
        me.reAuthorizationHandler = null;

        me.urlsMap = new Map();

        me.urlsMap.set(API.MAIN_BASE, mainServiceURL);
        me.urlsMap.set(API.AUTH_BASE, authServiceURL);
        me.urlsMap.set(API.PLUGIN_BASE, pluginServiceURL);

        me.strategy = new (ApiStrategy.getType(mainServiceURL))({ mainServiceURL, authServiceURL, pluginServiceURL });

        me.strategy.on(`message`, (message) => {
            switch (me.strategy.type) {
                case HTTP.TYPE:
                    me.emit(`message`, message);
                    break;
                case WS.TYPE:
                    if (message.subscriptionId && message.action) {
                        me.emit(`message`, message[message.action.split(`/`)[0]]);
                    } else {
                        me.emit(`message`, message);
                    }
                    break;
            }
        });

        me.strategy.on(`reconnected`, () => {
            if (me.reAuthorizationHandler) {
                const subscriptionKeys = Array.from(me.subscriptionMap.keys());
                const subscriptionValues = Array.from(me.subscriptionMap.values());

                me.reAuthorizationHandler()
                    .then(() => Promise.all(subscriptionValues
                        .map(({ key, parameters, body }) => me.send(key, parameters, body))))
                    .then(() => subscriptionKeys
                        .forEach((subscriptionId) => me.subscriptionMap.delete(subscriptionId)))
                    .catch((error) => me.emit(`error`, error));
            }
        });

        me.strategy.on(`error`, (error) => me.emit(`error`, error));
    }


    /**
     *
     * @param accessToken
     * @returns {Promise}
     */
    authorize(accessToken) {
        const me = this;

        me.reAuthorizationHandler = () => me.strategy.authenticate(accessToken);

        return me.strategy.authenticate(accessToken);
    }

    /**
     *
     * @param key
     * @param parameters
     * @param body
     */
    send(key, parameters, body) {
        const me = this;
        const isSubscription = ApiStrategy._isSubscription(key);
        const isUnsubscription = ApiStrategy._isUnsubscription(key);
        let externalSubscriptionId, internalSubscriptionId;

        if (isSubscription) {
            me.subscriptionMap.forEach((subscriptionArguments, subscriptionId) => {
                if (subscriptionArguments.key === key &&
                    subscriptionArguments.parameters === parameters &&
                    subscriptionArguments.body === body) {
                    internalSubscriptionId = subscriptionId;
                }
            });
        } else if (isUnsubscription) {
            externalSubscriptionId = parameters.subscriptionId;
            parameters.subscriptionId = me.subscriptionIdsMap.get(externalSubscriptionId);
        }

        const sendData = API.build(me.strategy.type, key, parameters, body);

        switch (me.strategy.type) {
            case HTTP.TYPE:
                sendData.endpoint = `${me.urlsMap.get(sendData.base)}${sendData.endpoint}`;
                break;
            case WS.TYPE:
                sendData.requestId = Utils.randomString();
                break;
        }

        function handleResponse(response) {
            let normalizedResponse = API.normalizeResponse(me.strategy.type, key, response);

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

        return me.strategy.send(sendData)
            .then(handleResponse)
            .catch(error => {
                if (error === Utils.TOKEN_EXPIRED_MARK && me.reconnectionHandler) {
                    return me.reconnectionHandler()
                        .then(() => me.strategy.send(sendData))
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

        me.strategy.disconnect();
    }
}


module.exports = ApiStrategy;