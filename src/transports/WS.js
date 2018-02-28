const Transport = require(`./base/Transport`);
const Utils = require('../utils/Utils');
const WebSocket = require('universal-websocket-client');
const WebSocketError = require('../error/WebSocketError');


/**
 * WebSocket Transport
 */
class WS extends Transport {

    static get TYPE() { return `ws`; }


    /**
     * Creates WS
     * @param {String} mainServiceURL - WebSocket URL
     */
    constructor({ mainServiceURL }) {
        super();

        this.type = WS.TYPE;
        this.isOpend = false;
        this.socket = new WebSocket(mainServiceURL);

        this.socket.addEventListener('message', event => {
            try {
                const messageData = JSON.parse(event.data);

                if (messageData.requestId) {
                    this.emit(messageData.requestId, messageData);
                } else {
                    this.emit('message', messageData);
                }
            } catch (error) {
                console.warn(error);
            }
        });

        this.socket.addEventListener('error', error => {
            this.emit('error', new WebSocketError(error));
        });

        this.socket.addEventListener('open', () => this.isOpend = true);
    }

    /**
     * Gettting socket according to if it opened
     * @returns {Promise} when socket opened
     */
    _getSocket() {
        return new Promise(resolve => {
            if (this.isOpend === true) {
                resolve(this.socket);
            } else {
                this.socket.addEventListener('open', () => {
                    this.isOpend = true;
                    resolve(this.socket);
                });
            }
        });
    }

    /**
     * TODO
     * Authenticate transport
     * @param {String} token - Auth token
     */
    authenticate(token) {
        this.send({
            action: `authenticate`,
            token: token
        });
    }

    /**
     * WebSocket API send method
     */
    send(params) {
        return this._getSocket()
            .then(() => {
                const { requestId = Utils.randomString() } = params;

                params.requestId = requestId;

                return new Promise((resolve) => {
                    this.socket.send(JSON.stringify(params));

                    const listener = messageData => {
                        if (messageData.requestId === requestId) {
                            this.removeListener(params.requestId, listener);

                            resolve(messageData);
                        }
                    };

                    this.addListener(params.requestId, listener);
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
}


module.exports = WS;