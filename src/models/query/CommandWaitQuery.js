
/**
 *
 */
class CommandWaitQuery {

    /**
     *
     */
    constructor({ waitTimeout }) {
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