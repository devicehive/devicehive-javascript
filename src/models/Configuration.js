const BaseModel = require(`./BaseModel`);


/**
 * Configuration model
 */
class Configuration extends BaseModel {

    /**
     * Creates new Configuration model
     * @param {Object} options - model options object
     * @param {} options.name
     * @param {} options.value
     * @param {} options.entityVersion
     */
    constructor({ name, value, entityVersion } = {}) {
        super();

        this.name = name;
        this.value = value;
        this.entityVersion = entityVersion;
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

    get entityVersion() {
        return this._entityVersion;
    }

    set entityVersion(value) {
        this._entityVersion = value;
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