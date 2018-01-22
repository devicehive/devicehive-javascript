'use strict';

const API = require('./API');

// API

class TokenAPI extends API {

    /**
     * TokenAPI
     */
    constructor(...args) {
        super(...args);
        this.startEndporint = '/token'
    }

    /**
     * 
     * @param {object} credentials (login, password)
     */
    create({ login, password }) {
        return this.send({
            url: 'authServiceURL',
            endpoint: this.startEndporint,
            method: 'POST',
            body: {
                login,
                password
            },
            authorize: false
        });
    }

    get() {

    }

}


// Exports

module.exports = TokenAPI;