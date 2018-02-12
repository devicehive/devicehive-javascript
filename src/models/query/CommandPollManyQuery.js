const BaseModel = require(`../BaseModel`);


/**
 * CommandPollManyQuery class
 */
class CommandPollManyQuery extends BaseModel {

    /**
     * Creates new CommandPollManyQuery model
     * @param {object} options - model options object
     * @param {string} options.deviceIds - List of device IDs
     * @param {string} options.networkIds - List of network IDs
     * @param {string} options.deviceTypeIds - List of devicetype IDs
     * @param {string} options.names - Command names
     * @param {number} options.timestamp - Timestamp to start from
     * @param {number} options.waitTimeout - Wait timeout in seconds
     * @param {number} options.limit - Limit number of commands
     */
    constructor({ deviceIds, networkIds, deviceTypeIds, names, timestamp, waitTimeout, limit } = {}) {
        super();

        this.deviceIds = deviceIds;
        this.networkIds = networkIds;
        this.deviceTypeIds = deviceTypeIds;
        this.names = names;
        this.timestamp = timestamp;
        this.waitTimeout = waitTimeout;
        this.limit = limit;
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

    get limit() {
        return this._limit;
    }

    set limit(value) {
        this._limit = value;
    }

    /**
     * Returns instance as a plain JS object
     * @returns {Object}
     */
    toObject() {
        return {
            deviceIds: this.deviceIds,
            networkIds: this.networkIds,
            deviceTypeIds: this.deviceTypeIds,
            names: this.names,
            timestamp: this.timestamp,
            waitTimeout: this.waitTimeout,
            limit: this.limit
        }
    }
}


module.exports = CommandPollManyQuery;