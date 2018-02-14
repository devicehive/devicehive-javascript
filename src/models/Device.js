const BaseModel = require(`./BaseModel`);


/**
 * Device model
 */
class Device extends BaseModel {

    /**
     * Creates new Device model
     * @param {Object} options - model options object
     * @param {} options.id
     * @param {} options.name
     * @param {} options.data
     * @param {} options.networkId
     * @param {} options.deviceTypeId
     * @param {} options.blocked
     */
    constructor({ id, name, data, networkId, deviceTypeId, blocked } = {}) {
        super();

        this.id = id;
        this.name = name;
        this.data = data;
        this.networkId = networkId;
        this.deviceTypeId = deviceTypeId;
        this.blocked = blocked;
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

    get blocked() {
        return this._blocked;
    }

    set blocked(value) {
        this._blocked = value;
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
            blocked: this.blocked
        };
    }
}


module.exports = Device;