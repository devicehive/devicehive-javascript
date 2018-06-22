const EventEmitter = require('events');
const Utils = require(`../../utils/Utils`);


/**
 * Base Transport class
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

    static get INFINITY_RECONNECTION() { return -1; }
    static get RECONNECTION_TIMEOUT_MS() { return 5000; }

    get reconnectionAttempts() {
        return this._reconnectionAttempts;
    }

    set reconnectionAttempts(value) {
        this._reconnectionAttempts = Utils.isDefined(value) ? value : Transport.INFINITY_RECONNECTION;
    }

    get reconnectionInterval() {
        return this._reconnectionInterval;
    }

    set reconnectionInterval(value) {
        this._reconnectionInterval = Utils.isDefined(value) ? value : Transport.RECONNECTION_TIMEOUT_MS;
    }

    /**
     * Connect transport
     */
    connect() {
        console.warn(`Method "connect" should be implemented in nested classes`);
    }

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