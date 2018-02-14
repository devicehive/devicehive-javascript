const BaseModel = require(`../BaseModel`);


/**
 * CommandWaitQuery class
 */
class CommandWaitQuery extends BaseModel {

    /**
     * Creates new CommandWaitQuery model
     * @param {Object} options - model options object
     * @param {Number} options.waitTimeout - wait timeout (sec)
     */
    constructor({ waitTimeout } = {}) {
        super();

        this.waitTimeout = waitTimeout;
    }

    get waitTimeout() {
        return this._waitTimeout;
    }

    set waitTimeout(value) {
        this._waitTimeout = value;
    }

    /**
     * Returns instance as a plain JS object
     * @returns {Object}
     */
    toObject() {
        return { waitTimeout: this.waitTimeout }
    }
}


module.exports = CommandWaitQuery;