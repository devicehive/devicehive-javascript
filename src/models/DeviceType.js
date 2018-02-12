/**
 * DeviceType model
 */
class DeviceType {

    /**
     * Creates DeviceType model
     * @param {Object} options ({
     *      id,
     *      name,
     *      description
     * })
     */
    constructor({ id, name, description } = {}) {
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
     * Returns a copy of instance
     * @returns {object} A copy of instance
     */
    toObject() {
        return {
            id: this.id,
            name: this.name,
            description: this.description
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


module.exports = DeviceType;