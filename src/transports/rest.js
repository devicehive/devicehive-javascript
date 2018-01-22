// Requirements

const request = require('request');

// Source

class Rest {

    /**
     * Rest API
     */
    constructor(urls) {
        this.urls = urls;
    }

    /**
     * Rest API send method
     */
    send({ url = 'mainServiceURL', access, endpoint, query, body, method = 'GET', authorize = true }) {

        const promise = new Promise((resolve, reject) => {

            let fullURL = this.urls[url] + endpoint;
    
            if (query) {
                let queryPart = '';
                Object.keys(query).forEach(key => {
                    queryPart += `${key}=${query[key]}&`;
                });
                fullURL = `${fullURL}?${queryPart}`;
            }
    
            const options = {
                method,
                headers: {},
                url: fullURL
            }
            
            if (body) {
                options.json = true;
                options.body = body;
                options.headers['Accept'] = 'application/json';
                options.headers['Content-Type'] = 'application/json';
            }
    
            if (authorize) {
                options.headers.Authorization = `Bearer ${access}`;
            }

            request(options, (err, res, body) => {
                if (err) return reject(err);
                return resolve(body);
            });
    
        });

        return promise;
    }
}

module.exports = Rest;