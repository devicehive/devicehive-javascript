const Transport = require(`./base/Transport`);


/**
 *
 */



class WS extends Transport {
    
    static get TYPE() { return `ws`; }
    
    /**
     * WebSocket API
     */
    constructor({ mainServiceURL }) {
        super();
        this.type = WS.TYPE;
        this.urls = { mainServiceURL };
        
        // if it's node.js environment
        if (!process.env.BROWSER) {
            this.WSClient = require('ws');
        } else {
            this.WSClient = WebSocket;
        }
    }

    /**
     * Initialize WebSocket API
     * 
     * @returns {promise} when initialized
     */
    init(serverURL) {
        this.socket = new this.WSClient(this.urls.mainServiceURL);
        this.socket.on('message', message => {
            const data = JSON.parse(message);

            if (data.requestId) {
                this.emit(data.requestId, data);
            } else {
                this.emit('message', data);
            }
        });

        return new Promise(resolve => {
            this.socket.addEventListener('open', event => resolve(this));
        });
    }

    /**
     * WebSocket API send method
     */
    send(params) {
        const requestId = params.requestId;

        return new Promise((resolve, reject) => {
            // this.socket.once(requestId, message => resolve(message));

            this.socket.send(JSON.stringify(params));
            const listener = event => {
                let messageData;
                try {
                    messageData = JSON.parse(event.data);
                } catch (error) {
                    return reject(error);
                }
                if (messageData.requestId === requestId) {
                    this.socket.removeEventListener(requestId, listener);
                    if (messageData.status === 'success') {
                        resolve(messageData);
                    } else {
                        reject(messageData);
                    }
                }
            }

            this.socket.addEventListener(requestId, listener);
        });
    }

}


module.exports = WS;