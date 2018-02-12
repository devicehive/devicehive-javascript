const BaseModel = require(`../BaseModel`);


/**
 * DeviceTypeCountQuery class
 */
class DeviceTypeCountQuery extends BaseModel {
    
    /**
     * Creates new DeviceTypeCountQuery model
     * @param {object} options - model options object
     * @param {string} options.name - Filter by device type name
     * @param {string} options.namePattern - Filter by device type name pattern. In pattern wildcards '%' and '_' can be used
     */
    constructor({ name, namePattern } = {}) {
        super();

        this.name = name;
        this.namePattern = namePattern;
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

    /**
     * Returns instance as a plain JS object
     * @returns {Object}
     */
    toObject() {
        return {
            name: this.name,
            namePattern: this.namePattern
        }
    }
}


module.exports = DeviceTypeCountQuery;