
/**
 *
 */
class NotificationPollManyQuery {

    /**
     *
     */
    constructor({ deviceId, networkIds, deviceTypeIds, names, timestamp, waitTimeout }) {
        const me = this;

        me.deviceId = deviceId;
        me.networkIds = networkIds;
        me.deviceTypeIds = deviceTypeIds;
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
            deviceId: me.deviceId,
            networkIds: me.networkIds,
            deviceTypeIds: me.deviceTypeIds,
            names: me.names,
            timestamp: me.timestamp,
            waitTimeout: me.waitTimeout
        }
    }
}


module.exports = NotificationPollManyQuery;