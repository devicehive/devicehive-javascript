
/**
 * Command Poll Query model
 */
class CommandWaitQuery {

    /**
     * Creates Command Poll Query model
     * @param {object} options - Options for instance
     * @param {number} options.waitTimeout - Wait timeout in seconds (default: 30 seconds, maximum: 60 seconds). Specify 0 to disable waiting
     */
    constructor({ waitTimeout } = {}) {
        const me = this;

        me.waitTimeout = waitTimeout;
    }

    get waitTimeout() {
        return this._waitTimeout;
    }

    set waitTimeout(value) {
        this._waitTimeout = value;
    }

    /**
     *
     * @returns {Object}
     */
    toObject() {
        const me = this;

        return { waitTimeout: me.waitTimeout }
    }
}


module.exports = CommandWaitQuery;