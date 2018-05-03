const BaseModel = require(`../BaseModel`);


/**
 * DeviceTypeDeleteQuery class
 */
class DeviceTypeDeleteQuery extends BaseModel {

    /**
     * Creates new DeviceTypeDeleteQuery model
     * @param {object} options - model options object
     * @param {string} options.deviceTypeId - deviceType's id
     * @param {boolean} options.force - flag for force delete
     */
    constructor({ deviceTypeId, force } = {}) {
        super();

        this.deviceTypeId = deviceTypeId;
        this.force = force;
    }

    get deviceTypeId() {
        return this._deviceTypeId;
    }

    set deviceTypeId(value) {
        this._deviceTypeId = value;
    }

    get force() {
        return this._force;
    }

    set force(value) {
        this._force = value;
    }

    /**
     * Returns instance as a plain JS object
     * @returns {Object}
     */
    toObject() {
        return {
            deviceTypeId: this.deviceTypeId,
            force: this.force
        }
    }
}


module.exports = DeviceTypeDeleteQuery;