const request = require('request');


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
    send(url, body) {
        return new Promise((resolve, reject) => {

            request(options, (err, res, body) => {
                if (err) {
                    return reject(err);
                }
                return resolve(body);
            });
    
        });
    }
}


module.exports = Rest;