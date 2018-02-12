/**
 * Notification Poll Many Query model
 */
class NotificationPollManyQuery {

    /**
     * Creates Notification Poll Many Query model
     * @param {object} options - Options for instance
     * @param {string} options.deviceIds - List of device IDs
     * @param {string} options.networkIds - List of network IDs
     * @param {string} options.deviceTypeIds - List of devicetype IDs
     * @param {string} options.names - Notification names
     * @param {number} options.timestamp - Timestamp to start from
     * @param {number} options.waitTimeout - Wait timeout in seconds
     */
    constructor({ deviceIds, networkIds, deviceTypeIds, names, timestamp, waitTimeout } = {}) {
        const me = this;

        me.deviceIds = deviceIds;
        me.networkIds = networkIds;
        me.deviceTypeIds = deviceTypeIds;
        me.names = names;
        me.timestamp = timestamp;
        me.waitTimeout = waitTimeout;
    }

    get deviceIds() {
        return this._deviceIds;
    }

    set deviceIds(value) {
        this._deviceIds = value;
    }

    get networkIds() {
        return this._networkIds;
    }

    set networkIds(value) {
        this._networkIds = value;
    }

    get deviceTypeIds() {
        return this._deviceTypeIds;
    }

    set deviceTypeIds(value) {
        this._deviceTypeIds = value;
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
     * @returns {Object}
     */
    toObject() {
        const me = this;

        return {
            deviceIds: me.deviceIds,
            networkIds: me.networkIds,
            deviceTypeIds: me.deviceTypeIds,
            names: me.names,
            timestamp: me.timestamp,
            waitTimeout: me.waitTimeout
        }
    }
}


module.exports = NotificationPollManyQuery;