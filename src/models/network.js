// Model

class Network {

    /**
     * Network model
     * @param {object} options ({ id, name, description })
     */
    constructor({ id, name, description }) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    /**
     * @returns {number} id;
     */
    get id() {
        return this.id;
    }

    /**
    * @param {number} value;
    * @returns {number} id;
    */
    set id(value) {
        return this.id = value;
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
     * @returns {string} description;
     */
    get description() {
        return this.description;
    }

    /**
     * @param {string} value;
     * @returns {string} description;
     */
    set description(value) {
        return this.description = value;
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

module.exports = Network;