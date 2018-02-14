const BaseModel = require(`./BaseModel`);


/**
 * DeviceNotification model
 */
class DeviceNotification extends BaseModel {

    /**
     * Creates new DeviceNotification model
     * @param {Object} options - model options object
     * @param {} options.id
     * @param {} options.deviceId
     * @param {} options.networkId
     * @param {} options.deviceTypeId
     * @param {} options.notification
     * @param {} options.timestamp
     * @param {} options.parameters
     */
    constructor({ id, deviceId, networkId, deviceTypeId, notification, timestamp, parameters } = {}) {
        super();

        this.id = id;
        this.deviceId = deviceId;
        this.networkId = networkId;
        this.deviceTypeId = deviceTypeId;
        this.notification = notification;
        this.timestamp = timestamp;
        this.parameters = parameters;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
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

    get parameters() {
        return this._parameters;
    }

    set parameters(value) {
        this._parameters = value;
    }

    /**
     * Returns instance as a plain JS object
     * @returns {Object}
     */
    toObject() {
        return {
            id: this.id,
            deviceId: this.deviceId,
            networkId: this.networkId,
            deviceTypeId: this.deviceTypeId,
            notification: this.notification,
            timestamp: this.timestamp,
            parameters: this.parameters
        };
    }
}


module.exports = DeviceNotification;