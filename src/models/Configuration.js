/**
 * Configuration model
 */
class Configuration {

    /**
     * Creates Configuration model
     * @param {Object} params ({
     *      name,
     *      value,
     *      entityVersion
     * })
     */
    constructor({ name, value, entityVersion } = {}) {
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
     * Returns a copy of instance
     * @returns {object} A copy of instance
     */
    toObject() {
        return {
            name: this.name,
            value: this.value,
            entityVersion: this.entityVersion
        };
    }

    /**
     * Returns a stringified instance
     * @returns {string} A stringified instance
     */
    toString() {
        JSON.stringify(this.toObject());
    }
}


module.exports = Configuration;