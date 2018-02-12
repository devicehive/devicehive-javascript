const BaseModel = require(`../BaseModel`);


/**
 * NotificationPollManyQuery class
 */
class NotificationPollManyQuery extends BaseModel {

    /**
     * Creates new NotificationPollManyQuery model
     * @param {object} options - model options object
     * @param {string} options.deviceIds - List of device IDs
     * @param {string} options.networkIds - List of network IDs
     * @param {string} options.deviceTypeIds - List of devicetype IDs
     * @param {string} options.names - Notification names
     * @param {number} options.timestamp - Timestamp to start from
     * @param {number} options.waitTimeout - Wait timeout in seconds
     */
    constructor({ deviceIds, networkIds, deviceTypeIds, names, timestamp, waitTimeout } = {}) {
        super();

        this.deviceIds = deviceIds;
        this.networkIds = networkIds;
        this.deviceTypeIds = deviceTypeIds;
        this.names = names;
        this.timestamp = timestamp;
        this.waitTimeout = waitTimeout;
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
        return {
            deviceIds: this.deviceIds,
            networkIds: this.networkIds,
            deviceTypeIds: this.deviceTypeIds,
            names: this.names,
            timestamp: this.timestamp,
            waitTimeout: this.waitTimeout
        }
    }
}


module.exports = NotificationPollManyQuery;