const Transport = require(`./base/Transport`);
const Utils = require('../utils/Utils');
const WebSocket = require('universal-websocket-client');
const WebSocketError = require('../error/WebSocketError');
const ReconnectionAttemptFailedError = require('../error/ReconnectionAttemptFailedError');


/**
 * WebSocket Transport class
 * @event open
 * @event message
 * @event error
 * @event reconnected
 */
class WS extends Transport {

    static get TYPE() { return `ws`; }

    static get OPEN_EVENT() { return `open`; }
    static get MESSAGE_EVENT() { return `message`; }
    static get ERROR_EVENT() { return `error`; }
    static get CLOSE_EVENT() { return `close`; }

    static get ERROR_CONNECTION_RESET_CODE() { return `ECONNRESET`; }
    static get ERROR_CONNECTION_REFUSED_CODE() { return `ECONNREFUSED`; }


    /**
     * Creates WS
     * @param {String} url - WebSocket URL
     */
    constructor({ url } = {}) {
        super();

        const me = this;

        me.type = WS.TYPE;
        me.url = url;
        me.isOpend = false;
        me.isReconnecting = false;
        me.reconnectionCounter = 0;
    }

    /**
     * Connect WebSocket transport
     * @returns {Promise<any>}
     */
    connect() {
        const me = this;

        return new Promise((resolve) => {
            me.once(Transport.OPEN_EVENT, resolve);
            me._open();
        });
    }

    /**
     * Authenticate transport
     * @param {String} token - Auth token
     * @returns {*}
     */
    authenticate(token) {
        const me = this;

        return me.send({ action: `authenticate`, token: token });
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
     * Disconnects WS transport
     */
    disconnect() {
        const me = this;

        me.socket.close();
    }

    /**
     * Opens WS connection
     * @private
     */
    _open() {
        const me = this;

        me.socket = new WebSocket(me.url);

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
        });

        me.socket.addEventListener(WS.OPEN_EVENT, () => {
            me.isOpend = true;
            me.reconnectionCounter = 0;

            if (me.isReconnecting === true) {
                me.isReconnecting = false;

                me.emit(Transport.RECONNECTED_EVENT);
            } else {
                me.emit(Transport.OPEN_EVENT);
            }
        });

        me.socket.addEventListener(WS.CLOSE_EVENT, () => me.isOpend = false);
    }

    /**
     * Gettting socket according to if it opened
     * @returns {Promise} when socket opened
     */
    _getSocket() {
        const me = this;

        return new Promise((resolve, reject) => {
            if (me.isOpend === true) {
                resolve(me.socket);
            } else if (me.isReconnecting === true) {
                reject(new Error(`WebSocket is reconnecting`));
            } else {
                me.socket.addEventListener(WS.OPEN_EVENT, () => {
                    me.isOpend = true;
                    resolve(me.socket);
                });
            }
        });
    }

    /**
     * Reconnection routine
     * @private
     */
    _reconnect() {
        const me = this;

        if (me.reconnectionCounter) {
            me.emit(Transport.ERROR_EVENT, new ReconnectionAttemptFailedError(me.reconnectionCounter));
        }

        me.isOpend = false;
        me.isReconnecting = true;
        me.socket.removeAllListeners();

        if (me.reconnectionCounter !== me.reconnectionAttempts) {
            setTimeout(() => me._open(), me.reconnectionInterval);
        }

        me.reconnectionCounter++;
    }
}


module.exports = WS;