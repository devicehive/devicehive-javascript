const BaseModel = require(`../BaseModel`);


/**
 * NetworkDeleteQuery class
 */
class NetworkDeleteQuery extends BaseModel {

    /**
     * Creates new NetworkDeleteQuery model
     * @param {object} options - model options object
     * @param {string} options.networkId - network's id
     * @param {boolean} options.force - flag for force delete
     */
    constructor({ networkId, force } = {}) {
        super();

        this.networkId = networkId;
        this.force = force;
    }

    get networkId() {
        return this._networkId;
    }

    set networkId(value) {
        this._networkId = value;
    }

    get force() {
        return this._force;
    }

    set force(value) {
        this._force = value;
    }

    /**
     * Returns instance as a plain JS object
     * @returns {Object}
     */
    toObject() {
        return {
            networkId: this.networkId,
            force: this.force
        }
    }
}


module.exports = NetworkDeleteQuery;