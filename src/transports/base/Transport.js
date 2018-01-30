const EventEmitter = require('events');


/**
 * @event message
 */
class Transport extends EventEmitter {

    /**
     *
     */
    authorize() {}

    /**
     *
     */
    send() {}
}


module.exports = Transport;