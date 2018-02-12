/**
 * DeviceCommand model
 */
class DeviceCommand {

    /**
     * DeviceCommand model
     * @param {Object} params ({
     *      id,
     *      command,
     *      timestamp,
     *      lastUpdated,
     *      userId, deviceId,
     *      networkId,
     *      deviceTypeId,
     *      parameters,
     *      lifetime,
     *      status,
     *      result
     * })
     */
    constructor({ id, command, timestamp, lastUpdated, userId, deviceId, networkId,
                    deviceTypeId, parameters, lifetime, status, result } = {}) {
        this.id = id;
        this.command = command;
        this.timestamp = timestamp;
        this.lastUpdated = lastUpdated;
        this.userId = userId;
        this.deviceId = deviceId;
        this.networkId = networkId;
        this.deviceTypeId = deviceTypeId;
        this.parameters = parameters;
        this.lifetime = lifetime;
        this.status = status;
        this.result = result;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get command() {
        return this._command;
    }

    set command(value) {
        this._command = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get notification() {
        return this._notification;
    }

    set notification(value) {
        this._notification = value;
    }

    get timestamp() {
        return this._timestamp;
    }

    set timestamp(value) {
        this._timestamp = value;
    }

    get lastUpdated() {
        return this._lastUpdated;
    }

    set lastUpdated(value) {
        this._lastUpdated = value;
    }

    get userId() {
        return this._userId;
    }

    set userId(value) {
        this._userId = value;
    }

    get deviceId() {
        return this._deviceId;
    }

    set deviceId(value) {
        this._deviceId = value;
    }

    get networkId() {
        return this._networkId;
    }

    set networkId(value) {
        this._networkId = value;
    }

    get deviceTypeId() {
        return this._deviceTypeId;
    }

    set deviceTypeId(value) {
        this._deviceTypeId = value;
    }

    get parameters() {
        return this._parameters;
    }

    set parameters(value) {
        this._parameters = value;
    }

    get lifetime() {
        return this._lifetime;
    }

    set lifetime(value) {
        this._lifetime = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get result() {
        return this._result;
    }

    set result(value) {
        this._result = value;
    }

    /**
     * Returns a copy of instance
     * @returns {object} A copy of instance
     */
    toObject() {
        return {
            id: this.id,
            command: this.command,
            timestamp: this.timestamp,
            lastUpdated: this.lastUpdated,
            userId: this.userId,
            deviceId: this.deviceId,
            networkId: this.networkId,
            deviceTypeId: this.deviceTypeId,
            parameters: this.parameters,
            lifetime: this.lifetime,
            status: this.status,
            result: this.result
        };
    }

    /**
     * Returns a stringified instance
     * @returns {string} A stringified instance
     */
    toString() {
        return JSON.stringify(this.toObject());
    }
}


module.exports = DeviceCommand;