'use strict';

const API = require('./API');

// API

class TokenAPI extends API {

    /**
     * TokenAPI
     */
    constructor(...args) {
        super(...args);
        this.type = 'token';
    }

    /**
     * Authentificate using login and password
     * @param {object} credentials { login, password }
     */
    auth(body) {
        return this.send({
            auth: false,
            service: 'authServiceURL',
            method: 'POST',
            body
        });
    }

    /**
     * Refresg token
     * @param {object} { refreshToken }
     */
    refresh(body) {
        return this.send({
            auth: false,
            service: 'authServiceURL',
            method: 'POST',
            type: 'refresh',
            body
        });
    }

    /**
     * Create token
     * @param {object} { a, e, t, tpc }
     */
    create(body) {
        return this.send({
            auth: false,
            service: 'authServiceURL',
            method: 'POST',
            type: 'create',
            body
        });
    }
}


// Exports

module.exports = TokenAPI;