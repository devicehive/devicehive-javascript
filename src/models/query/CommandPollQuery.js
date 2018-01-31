
/**
 *
 */
class CommandPollQuery {

    /**
     *
     */
    constructor({ deviceId, names, timestamp, returnUpdatedCommands, waitTimeout, limit }) {
        const me = this;

        me.deviceId = deviceId;
        me.names = names;
        me.timestamp = timestamp;
        me.returnUpdatedCommands = returnUpdatedCommands;
        me.waitTimeout = waitTimeout;
        me.limit = limit;
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
     *
     * @returns {Object}
     */
    toObject() {
        const me = this;

        return {
            deviceId: me.deviceId,
            names: me.names,
            timestamp: me.timestamp,
            returnUpdatedCommands: me.returnUpdatedCommands,
            waitTimeout: me.waitTimeout,
            limit: me.limit,
        }
    }
}


module.exports = CommandPollQuery;