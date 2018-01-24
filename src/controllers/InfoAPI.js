'use strict';

const API = require('./API');

// API

class InfoAPI extends API {

    /**
     * TokenAPI
     */
    constructor(...args) {
        super(...args);
        this.type = 'info';
    }

    /**
     * Get info
     */
    get() {
        return this.strategy.send();
    }
}


// Exports

module.exports = InfoAPI;