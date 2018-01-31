const EventEmitter = require('events');


/**
 * @event message
 */
class Transport extends EventEmitter {

    /**
     *
     */
    authenticate(token) {}

    /**
     *
     */
    send() {}
}


module.exports = Transport;