const BaseModel = require(`./BaseModel`);


/**
 * Configuration model
 */
class Configuration extends BaseModel {

    /**
     * Creates new Configuration model
     * @param {Object} options - model options object
     * @param {string} options.name - Configuration parameter name.
     * @param {string} options.value - Configuration parameter value.
     */
    constructor({ name, value, entityVersion } = {}) {
        super();

        this.name = name;
        this.value = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    /**
     * Returns instance as a plain JS object
     * @returns {Object}
     */
    toObject() {
        return {
            name: this.name,
            value: this.value,
            entityVersion: this.entityVersion
        };
    }
}


module.exports = Configuration;