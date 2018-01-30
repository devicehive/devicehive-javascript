require('isomorphic-fetch');

/**
 *
 */
class HTTP {

    static get TYPE() { return `http`; }

    /**
     * Rest API
     */
    constructor(urls) {
        this.type = HTTP.TYPE;
        this.urls = urls;
    }

    /**
     * Init
     * 
     */
    init() {
        return new Promise(resolve => resolve());
    }

    /**
     * Rest API send method
     */
    send({ endpoint, method, body, headers }) {
        return fetch(endpoint, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined
        }).then(response => response.json());
    }
}


module.exports = HTTP;