
/**
 * Notification Poll Query model
 */
class NotificationPollQuery {

    /**
     * Creates Notification Poll Query model
     * @param {object} options - Options for instance
     * @param {string} options.deviceId - Device ID
     * @param {string} options.names - Notification names
     * @param {number} options.timestamp - Timestamp to start from
     * @param {number} options.waitTimeout - Wait timeout in seconds
     */
    constructor({ deviceId, names, timestamp, waitTimeout } = {}) {
        const me = this;

        me.deviceId = deviceId;
        me.names = names;
        me.timestamp = timestamp;
        me.waitTimeout = waitTimeout;
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
     *
     * @returns {{deviceId: *, names: *, timestamp: *, returnUpdatedCommands: *, waitTimeout: *, limit: *}}
     */
    toObject() {
        const me = this;

        return {
            deviceId: me.deviceId,
            names: me.names,
            timestamp: me.timestamp,
            waitTimeout: me.waitTimeout
        }
    }
}


module.exports = NotificationPollQuery;