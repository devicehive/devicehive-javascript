const Transport = require(`./base/Transport`);
const randomString = require(`randomstring`);
const WebSocket = require('universal-websocket-client');

const WebSocketError = require('../error/WebSocketError');

/**
 * WebSocket Transport
 */
class WS extends Transport {

    static get TYPE() { return `ws`; }

    /**
     * Creates WS
     * @param {string} mainServiceURL - WebSocket URL
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
    }

    /**
     * Gettting socket according to if it opened
     * @returns {promise} when socket opened
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
     * @param {string} token - Auth token
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
                const { requestId = randomString.generate() } = params;

                params.requestId = requestId;

                return new Promise((resolve, reject) => {
                    this.socket.send(JSON.stringify(params));

                    const listener = messageData => {
                        if (messageData.requestId === requestId) {
                            this.removeListener(params.requestId, listener);

                            if (messageData.status === 'success') {
                                resolve(messageData);
                            } else {
                                reject(messageData);
                            }
                        }
                    };

                    this.addListener(params.requestId, listener);
                });
            });
    }

}


module.exports = WS;