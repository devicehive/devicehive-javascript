const BaseModel = require(`./BaseModel`);


/**
 * DeviceType model
 */
class DeviceType extends BaseModel {

    /**
     * Creates new DeviceType model
     * @param {object} options - model options object
     * @param {number} options.id - Device type identifier
     * @param {string} options.name - Device type name
     * @param {string} options.description - Device type description
     */
    constructor({ id, name, description } = {}) {
        super();

        this.id = id;
        this.name = name;
        this.description = description;
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

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    /**
     * Returns instance as a plain JS object
     * @returns {Object}
     */
    toObject() {
        return {
            id: this.id,
            name: this.name,
            description: this.description
        };
    }
}


module.exports = DeviceType;