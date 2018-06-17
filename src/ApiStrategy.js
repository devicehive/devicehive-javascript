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
        let result;

        if (url.startsWith(HTTP.TYPE)) {
            result = HTTP;
        } else if (url.startsWith(WS.TYPE)) {
            result = WS;
        } else {
            throw new UnsupportedTransportError();
        }

        return result;
    }

    /**
     * Creates ApiStrategy
     * @param {object} urls ({ mainServiceURL, authServiceURL, pluginServiceURL })
     */
    constructor({ mainServiceURL, authServiceURL, pluginServiceURL }) {
        super();

        const me = this;

        me.subscriptionMap = new Map();
        me.reconnectionHandler = null;

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
            console.log(`reconnected`);

            me.subscriptionMap.forEach(({ key, parameters, body }) => me.send(key, parameters, body));
        });
    }


    /**
     *
     * @param accessToken
     * @returns {Promise}
     */
    authorize(accessToken) {
        const me = this;

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
        const sendData = API.build(me.strategy.type, key, parameters, body);

        switch (me.strategy.type) {
            case HTTP.TYPE:
                sendData.endpoint = `${me.urlsMap.get(sendData.base)}${sendData.endpoint}`;
                break;
            case WS.TYPE:
                sendData.requestId = Utils.randomString();
                break;
        }

        return me.strategy.send(sendData)
            .then((response) => {
                const normalizedResponse = API.normalizeResponse(me.strategy.type, key, response);

                if (me._isSubscriptionRequest(key)) {
                    me._handleSubscriptionRequest(normalizedResponse.subscriptionId, key, parameters, body);
                } else if (me._isUnsubscriptionRequest(key)) {
                    me._handleUnsubscriptionRequest(parameters.subscriptionId);
                }

                return normalizedResponse;
            })
            .catch(error => {
                if (error === Utils.TOKEN_EXPIRED_MARK && me.reconnectionHandler) {
                    return me.reconnectionHandler()
                        .then(() => me.strategy.send(sendData))
                        .then((response) => API.normalizeResponse(me.strategy.type, key, response));
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

    /**
     *
     * @param key
     * @private
     */
    _isSubscriptionRequest(key) {
        return key === ApiMap.subscribeNotification || key === ApiMap.subscribeCommand;
    }

    /**
     *
     * @param key
     * @private
     */
    _isUnsubscriptionRequest(key) {
        return key === ApiMap.unsubscribeNotification || key === ApiMap.unsubscribeCommand;
    }

    /**
     *
     * @param subscriptionId
     * @param key
     * @param parameters
     * @param body
     * @private
     */
    _handleSubscriptionRequest(subscriptionId, key, parameters, body) {
        const me = this;

        me.subscriptionMap.set(subscriptionId, { key, parameters, body });
    }

    /**
     *
     * @param subscriptionId
     * @private
     */
    _handleUnsubscriptionRequest(subscriptionId) {
        const me = this;

        me.subscriptionMap.delete(subscriptionId);
    }
}


module.exports = ApiStrategy;