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
        return new Promise(resolve => {
            this.socket.addEventListener('open', event => resolve(this));
        });
    }

    /**
     * WebSocket API send method
     */
    send(data) {
        return Promise.resolve(`WS send: ${JSON.stringify(data)}`);
        // return new Promise((resolve, reject) => {
        //     this.socket.send(JSON.stringify(data));
        //     const listener = event => {
        //         const messageData = JSON.parse(event.data);
        //         if (messageData.action === data.action) {
        //             if (messageData.requestId === data.requestId) {
        //                 this.socket.removeEventListener('message', listener);
        //                 if (messageData.status === 'success') {
        //                     resolve(messageData);
        //                 } else {
        //                     reject(messageData);
        //                 }
        //             }
        //         }
        //     };
        //
        //     this.socket.addEventListener('message', listener);
        // })
    }

}


module.exports = WS;