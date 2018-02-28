const EventEmitter = require('events');
const HTTP = require('./transports/HTTP');
const WS = require('./transports/WS');
const API = require(`./controllers/API`);
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

        me.reconnectionHandler = null;

        me.urlsMap = new Map();

        me.urlsMap.set(API.MAIN_BASE, mainServiceURL);
        me.urlsMap.set(API.AUTH_BASE, authServiceURL);
        me.urlsMap.set(API.PLUGIN_BASE, pluginServiceURL);

        me.strategy = new (ApiStrategy.getType(mainServiceURL))({ mainServiceURL, authServiceURL, pluginServiceURL });

        me.strategy.on(`message`, (message) => {
            if (message.subscriptionId && message.action) {
                me.emit(`message`, message[message.action.split(`/`)[0]]);
            } else {
                me.emit(`message`, message);
            }
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
            .then((response) => API.normalizeResponse(me.strategy.type, key, response))
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
}


module.exports = ApiStrategy;