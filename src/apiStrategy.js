'use strict';

// Requirements

const EventEmitter = require('events');
const Rest = require('./transports/rest');
const WS = require('./transports/ws');


// API Strategy

/**
* @event onMessage
*/
class APIStrategy extends EventEmitter {

    /**
     * APIStrategy
     */
    constructor(urls) {
        super();

        const SelectedAPI = this.getType(urls.mainServiceURL);

        if (SelectedAPI) {
            this.strategy = new SelectedAPI(urls);
        } else {
            throw new Error('unexpected mainServiceURL, please use allowed protocol');
        }
    }
    
    /**
     * Returns current API
     * 
     * @returns {function} new model
     */
    getType(url) {
        switch (true) {
            case url.startsWith('http'): {
                return Rest;
                break;
            }

            case url.startsWith('https'): {
                return Rest;
                break;
            }

            case url.startsWith('ws'): {
                return WS;
                break;
            }

            default: {
                return;
                break;
            }
        }
    }

    /**
     * Sending data
     * @param {object} data 
     */
    send(data) {
        return this.strategy.send(data);
    }

}

module.exports = APIStrategy;