const BaseModel = require(`../BaseModel`);


/**
 * CommandPollQuery class
 */
class CommandPollQuery extends BaseModel {

    /**
     * Creates new CommandPollQuery model
     * @param {object} options - model options object
     * @param {string} options.deviceId - Device ID
     * @param {string} options.names - Command names
     * @param {number} options.timestamp - Timestamp to start from
     * @param {boolean} options.returnUpdatedCommands - Checks if updated commands should be returned
     * @param {number} options.waitTimeout - Wait timeout in seconds
     * @param {number} options.limit - Limit number of commands
     */
    constructor({ deviceId, names, timestamp, returnUpdatedCommands, waitTimeout, limit } = {}) {
        super();

        this.deviceId = deviceId;
        this.names = names;
        this.timestamp = timestamp;
        this.returnUpdatedCommands = returnUpdatedCommands;
        this.waitTimeout = waitTimeout;
        this.limit = limit;
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

    get returnUpdatedCommands() {
        return this._returnUpdatedCommands;
    }

    set returnUpdatedCommands(value) {
        this._returnUpdatedCommands = value;
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
            deviceId: this.deviceId,
            names: this.names,
            timestamp: this.timestamp,
            returnUpdatedCommands: this.returnUpdatedCommands,
            waitTimeout: this.waitTimeout,
            limit: this.limit
        }
    }
}


module.exports = CommandPollQuery;