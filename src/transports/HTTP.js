require('isomorphic-fetch');
const Transport = require(`./base/Transport`);


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
     * Rest API send method
     */
    send({ endpoint, method, body }) {
        return fetch(endpoint, {
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            method: method,
            body: body ? JSON.stringify(body) : ``
        }).then(response => response.json());
    }
}


module.exports = HTTP;