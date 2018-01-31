const randomString = require(`randomstring`);
const EventEmitter = require('events');
const HTTP = require('./transports/HTTP');
const WS = require('./transports/WS');
const API = require(`./controllers/API`);


/**
* @event onMessage
*/
class ApiStrategy extends EventEmitter {

    /**
     *
     * @param url
     * @returns {Class} Transport Class
     */
    static getType(url) {
        let result;

        if (url.startsWith('http') || url.startsWith('https')) {
            result = HTTP;
        } else if (url.startsWith('ws')) {
            result = WS;
        } else {
            //TODO
        }

        return result;
    }

    /**
     * ApiStrategy
     */
    constructor({ mainServiceURL, authServiceURL, pluginServiceURL }) {
        super();

        const me = this;

        me.urlsMap = new Map();

        me.urlsMap.set(API.MAIN_BASE, mainServiceURL);
        me.urlsMap.set(API.AUTH_BASE, authServiceURL);
        me.urlsMap.set(API.PLUGIN_BASE, pluginServiceURL);

        me.strategy = new (ApiStrategy.getType(mainServiceURL))({ mainServiceURL, authServiceURL, pluginServiceURL });

        me.strategy.on(`message`, (message) => { me.emit(`message`, message) });
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

        switch(me.strategy.type) {
            case HTTP.TYPE:
                sendData.endpoint = `${me.urlsMap.get(sendData.base)}${sendData.endpoint}`;
                break;
            case WS.TYPE:
                sendData.requestId = randomString.generate();
                break;
        }

        return me.strategy.send(sendData);
    }
}


module.exports = ApiStrategy;