const EventEmitter = require('events');


/**
 * @event open
 * @event message
 * @event error
 * @event reconnected
 */
class Transport extends EventEmitter {

    static get OPEN_EVENT() { return `open`; }
    static get MESSAGE_EVENT() { return `message`; }
    static get ERROR_EVENT() { return `error`; }
    static get RECONNECTED_EVENT() { return `reconnected`; }

    static get RECONNECTION_TIMEOUT_MS() { return 5000; }


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

    /**
     * Disconnects transport
     */
    disconnect() {
        console.warn(`Method "disconnect" should be implemented in nested classes`);
    }
}


module.exports = Transport;