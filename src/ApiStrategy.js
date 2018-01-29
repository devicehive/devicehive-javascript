const EventEmitter = require('events');
const HTTP = require('./transports/HTTP');
const WebSocket = require('./transports/WebSocket');
const ApiMap = require('./controllers/transportResolvers/ApiMap');


/**
* @event onMessage
*/
class ApiStrategy extends EventEmitter {

    static get HTTP_STRATEGY() { return HTTP.TYPE; }
    static get WS_STRATEGY() { return WebSocket.TYPE; }

    /**
     * Returns current API
     *
     * @returns {function} new model
     */
    static getType(serviceURL) {
        let result;
        switch (true) {
            case serviceURL.startsWith('http'):
            case serviceURL.startsWith('https'):
                result = HTTP;
                break;

            case serviceURL.startsWith('ws'):
                result = WebSocket;
                break;

            default:
                break;
        }

        return result;
    }

    /**
     * ApiStrategy
     */
    constructor(urls) {
        super();

        const SelectedTransport = ApiStrategy.getType(urls.mainServiceURL);

        if (SelectedTransport) {
            this.strategy = new SelectedTransport(urls);
        } else {
            throw new Error('unexpected mainServiceURL, please use allowed protocol');
        }
    }

    /**
     * Init method
     * @returns {promise} when initialized
     */
    initTransport() {
        return this.strategy.init();
    }

    /**
     * Authorize method
     * @param {object} credentials { accessToken }
     * @returns {promise} when authorized
     */
    authTransport({ accessToken }) {
        this.accessToken = accessToken;

        let promise;

        if (this.strategy.type === 'ws') {
            promise = this.send({
                apiType: 'authenticate',
                body: {
                    token: this.accessToken
                }
            });
        } else {
            promise = new Promise(resolve => resolve());
        }


        return promise;
    }

    /**
     *
     * @param key
     * @param parameters
     * @param body
     */
    send(key, parameters, body) {
        const me = this;

        return me.strategy.send(ApiMap.build(me.strategy.type, key, parameters, body));
    }

}

module.exports = ApiStrategy;