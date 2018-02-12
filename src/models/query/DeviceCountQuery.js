const BaseModel = require(`../BaseModel`);


/**
 * DeviceCountQuery class
 */
class DeviceCountQuery extends BaseModel {

    /**
     * Creates new DeviceCountQuery model
     * @param {object} options - model options object
     * @param {string} options.name - Filter by device name
     * @param {string} options.namePattern - Filter by device name pattern. In pattern wildcards '%' and '_' can be used
     * @param {number} options.networkId - Filter by associated network identifier
     * @param {string} options.networkName - Filter by associated network name
     */
    constructor({ name, namePattern, networkId, networkName } = {}) {
        super();

        this.name = name;
        this.namePattern = namePattern;
        this.networkId = networkId;
        this.networkName = networkName;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get namePattern() {
        return this._namePattern;
    }

    set namePattern(value) {
        this._namePattern = value;
    }

    get networkId() {
        return this._networkId;
    }

    set networkId(value) {
        this._networkId = value;
    }

    get networkName() {
        return this._networkName;
    }

    set networkName(value) {
        this._networkName = value;
    }

    /**
     * Returns instance as a plain JS object
     * @returns {Object}
     */
    toObject() {
        return {
            name: this.name,
            namePattern: this.namePattern,
            networkId: this.networkId,
            networkName: this.networkName
        }
    }
}


module.exports = DeviceCountQuery;