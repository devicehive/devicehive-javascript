const EventEmitter = require('events');


/**
 * @event message
 */
class Transport extends EventEmitter {

    /**
     * Authenticate transport with token
     * @param token
     */
    authenticate(token) {
        console.warn(`Method "authenticate" should be implemented in nested classes`);
    }

    /**
     * Send message via transport
     */
    send() {
        console.warn(`Method "send" should be implemented in nested classes`);
    }
}


module.exports = Transport;