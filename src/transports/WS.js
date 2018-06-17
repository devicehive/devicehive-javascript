const Transport = require(`./base/Transport`);
const Utils = require('../utils/Utils');
const WebSocket = require('universal-websocket-client');
const WebSocketError = require('../error/WebSocketError');


/**
 * WebSocket Transport
 * @event open
 * @event message
 * @event error
 * @event reconnected
 */
class WS extends Transport {

    static get TYPE() { return `ws`; }

    static get OPEN_EVENT() { return `open` };
    static get MESSAGE_EVENT() { return `message` };
    static get ERROR_EVENT() { return `error` };
    static get CLOSE_EVENT() { return `close` };

    static get ERROR_CONNECTION_RESET_CODE() { return `ECONNRESET`; }
    static get ERROR_CONNECTION_REFUSED_CODE() { return `ECONNREFUSED`; }


    /**
     * Creates WS
     * @param {String} mainServiceURL - WebSocket URL
     */
    constructor({ mainServiceURL }) {
        super();

        const me = this;

        me.type = WS.TYPE;
        me.mainServiceURL = mainServiceURL;
        me.isOpend = false;
        me.isReconnecting = false;

        me._open();
    }

    /**
     * Opens WS connection
     * @private
     */
    _open() {
        const me = this;

        me.socket = new WebSocket(this.mainServiceURL);

        me.socket.addEventListener(WS.MESSAGE_EVENT, event => {
            try {
                const messageData = JSON.parse(event.data);

                if (messageData.requestId) {
                    me.emit(messageData.requestId, messageData);
                } else {
                    me.emit(Transport.MESSAGE_EVENT, messageData);
                }
            } catch (error) {
                console.warn(error);
            }
        });

        me.socket.addEventListener(WS.ERROR_EVENT, (error) => {
            me.isReconnecting = false;

            switch (error.code){
                case WS.ERROR_CONNECTION_RESET_CODE:
                case WS.ERROR_CONNECTION_REFUSED_CODE:
                    me._reconnect();
                    break;
                default:
                    me.emit(Transport.ERROR_EVENT, new WebSocketError(error));
                    break;
            }

            console.log(error);
        });

        me.socket.addEventListener(WS.OPEN_EVENT, () => {
            if (me.isReconnecting === true) {
                me.isReconnecting = false;

                me.emit(Transport.RECONNECTED_EVENT);
            } else {
                me.emit(Transport.OPEN_EVENT);
            }

            me.isOpend = true;
        });

        me.socket.addEventListener(WS.CLOSE_EVENT, () => {
            console.log(`closed`);
            me.isOpend = false;
        });
    }

    /**
     * Gettting socket according to if it opened
     * @returns {Promise} when socket opened
     */
    _getSocket() {
        const me = this;

        return new Promise(resolve => {
            if (me.isOpend === true) {
                resolve(me.socket);
            } else {
                me.socket.addEventListener(WS.OPEN_EVENT, () => {
                    me.isOpend = true;
                    resolve(me.socket);
                });
            }
        });
    }

    /**
     * WebSocket API send method
     */
    send(params) {
        const me = this;

        return me._getSocket()
            .then(() => {
                const { requestId = Utils.randomString() } = params;

                params.requestId = requestId;

                return new Promise((resolve) => {
                    me.socket.send(JSON.stringify(params));

                    const listener = messageData => {
                        if (messageData.requestId === requestId) {
                            me.removeListener(params.requestId, listener);

                            resolve(messageData);
                        }
                    };

                    me.addListener(params.requestId, listener);
                });
            });
    }

    /**
     * Reconnection routine
     * @private
     */
    _reconnect() {
        const me = this;

        me.isOpend = false;
        me.isReconnecting = true;
        me.ws.removeAllListeners();

        setTimeout(() => me._open(), Transport.RECONNECTION_TIMEOUT_MS);
    }

    /**
     * Disconnects WS transport
     */
    disconnect() {
        const me = this;

        me.socket.close();
    }

    /**
     * Authenticate transport
     * @param {String} token - Auth token
     */
    authenticate(token) {
        const me = this;

        me.send({ action: `authenticate`, token: token });
    }
}


module.exports = WS;