const BaseModel = require(`../BaseModel`);


/**
 * NotificationPollQuery class
 */
class NotificationPollQuery extends BaseModel {

    /**
     * Creates new NotificationPollQuery model
     * @param {object} options - model options object
     * @param {string} options.deviceId - Device ID
     * @param {string} options.names - Notification names
     * @param {number} options.timestamp - Timestamp to start from
     * @param {number} options.waitTimeout - Wait timeout in seconds
     */
    constructor({ deviceId, names, timestamp, waitTimeout } = {}) {
        super();

        this.deviceId = deviceId;
        this.names = names;
        this.timestamp = timestamp;
        this.waitTimeout = waitTimeout;
    }

    get deviceId() {
        return this._deviceId;
    }

    set deviceId(value) {
        this._deviceId = value;
    }

    get names() {
        return this._names;
    }

    set names(value) {
        this._names = value;
    }

    get timestamp() {
        return this._timestamp;
    }

    set timestamp(value) {
        this._timestamp = value;
    }

    get waitTimeout() {
        return this._waitTimeout;
    }

    set waitTimeout(value) {
        this._waitTimeout = value;
    }

    /**
     * Returns instance as a plain JS object
     * @returns {Object}
     */
    toObject() {
        return {
            deviceId: this.deviceId,
            names: this.names,
            timestamp: this.timestamp,
            waitTimeout: this.waitTimeout
        }
    }
}


module.exports = NotificationPollQuery;