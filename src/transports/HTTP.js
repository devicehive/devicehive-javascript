const Transport = require(`./base/Transport`);
require('isomorphic-fetch');


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
    //send({ method, endpoint, body }) {
    //    return Promise.resolve(`HTTP send: ${method} ${endpoint} ${body ? JSON.stringify(body) : ''}`);
    send({ endpoint, method, body, headers }) {
        return Promise.resolve(`HTTP send: ${method} ${endpoint} ${body ? JSON.stringify(body) : ''}`);
        // return fetch(endpoint, {
        //     method,
        //     headers,
        //     body: body ? JSON.stringify(body) : undefined
        // }).then(response => response.json());
    }
}


module.exports = HTTP;