'use strict';

const API = require('./API');

// API

class InfoAPI extends API {

    /**
     * InfoAPI
     */
    constructor(...args) {
        super(...args);
        this.startEndporint = '/info'
    }

    /**
     * Get info
     */
    get() {
        return this.send({
            endpoint: this.startEndporint,
            authorize: false
        });
    }
}


// Exports

module.exports = InfoAPI;