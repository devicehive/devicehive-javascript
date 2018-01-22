'use strict';

const API = require('./API');

// API

class DeviceAPI extends API {

    /**
     * DeviceAPI
     */
    constructor(...args) {
        super(...args);
        this.startEndporint = '/info'
    }

    static create () {
        
    }

    static get () {

    }
    
}


// Exports

module.exports = DeviceAPI;