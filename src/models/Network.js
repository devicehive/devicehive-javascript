const BaseModel = require(`./BaseModel`);


/**
 * Network model
 */
class Network extends BaseModel {

    /**
     * Creates new Network model
     * @param {Object} options - model options object
     * @param {} options.id
     * @param {} options.name
     * @param {} options.description
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


module.exports = Network;