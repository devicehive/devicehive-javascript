// Model

class Device {

    /**
     * Device model
     * @param {object} options ({ id, name, data, networkId, blocked })
     */
    constructor({ id, name, data, networkId, blocked }) {
        this.name = name;
        this.data = data;
        this.networkId = networkId;
        this.deviceTypeId = deviceTypeId;
        this.blocked = blocked;
    }

    /**
     * @returns {string} name;
     */
    get name() {
        return this.name; 
    }

    /**
     * @param {string} value;
     * @returns {string} name;
     */
    set name(value) {
        return this.name = value;
    }

    /**
     * @returns {object} data;
     */
    get data() {
        return this.data;
    }

    /**
     * @param {object} value;
     * @returns {object} data;
     */
    set data(value) {
        return this.data = value;
    }

    /**
     * @returns {string} networkId;
     */
    get networkId() {
        return this.networkId;
    }

    /**
     * @param {string} value;
     * @returns {string} networkId;
     */
    set networkId(value) {
        return this.networkId = value;
    }

    /**
     * @returns {string} deviceTypeId;
     */
    get deviceTypeId() {
        return this.deviceTypeId;
    }

    /**
     * @param {string} value;
     * @returns {string} deviceTypeId;
     */
    set deviceTypeId(value) {
        return this.deviceTypeId = value;
    }

    /**
     * @returns {string} blocked;
     */
    get blocked() {
        return this.blocked;
    }

    /**
     * @param {boolean} value;
     * @returns {boolean} blocked;
     */
    set blocked(value) {
        return this.blocked = value;
    }

    /**
     * Returns a copy of instance
     * @returns {object} A copy of instance
     */
    toObject() {
        return Object.assign({}, this);
    }

    /**
     * Returns a stringified instance
     * @returns {object} A stringified instance
     */
    toString() {
        JSON.stringify(this);
    }
}


// Exports

module.exports = Device;