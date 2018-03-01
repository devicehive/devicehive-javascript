const BaseModel = require(`./BaseModel`);


/**
 * Device model
 */
class Device extends BaseModel {

    /**
     * Creates new Device model
     * @param {object} options - model options object
     * @param {string} options.id - Device unique identifier
     * @param {string} options.name - Device display name
     * @param {object} options.data - Device data, a JSON object with an arbitrary structure
     * @param {number} options.networkId - Associated network id
     * @param {number} options.deviceTypeId - Associated deviceType id
     * @param {boolean} options.isBlocked - Indicates whether device is isBlocked
     */
    constructor({ id, name, data, networkId, deviceTypeId, isBlocked } = {}) {
        super();

        this.id = id;
        this.name = name;
        this.data = data;
        this.networkId = networkId;
        this.deviceTypeId = deviceTypeId;
        this.isBlocked = isBlocked;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name; 
    }

    set name(value) {
        this._name = value;
    }

    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
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

    get isBlocked() {
        return this._isBlocked;
    }

    set isBlocked(value) {
        this._isBlocked = value;
    }

    /**
     * Returns instance as a plain JS object
     * @returns {Object}
     */
    toObject() {
        return {
            id: this.id,
            name: this.name,
            data: this.data,
            networkId: this.networkId,
            deviceTypeId: this.deviceTypeId,
            isBlocked: this.isBlocked
        };
    }
}


module.exports = Device;