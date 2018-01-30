const Transport = require(`./base/Transport`);
const request = require('request');


/**
 *
 */
class HTTP extends Transport {

    static get TYPE() { return `http`; }

    /**
     * Rest API
     */
    constructor() {
        super();

        this.type = HTTP.TYPE;
    }

    /**
     * Init
     */
    init() {
        return new Promise(resolve => resolve());
    }

    /**
     * Rest API send method
     */
    send({ method, endpoint, body }) {
        return Promise.resolve(`HTTP send: ${method} ${endpoint} ${body ? JSON.stringify(body) : ''}`);
    }
}


module.exports = HTTP;