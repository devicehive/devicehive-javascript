
/**
 * PluginToken model
 */
class PluginToken {

    /**
     * Creates PluginToken model
     * @param {object} options Options for instance
     * @param {Array} options.a - Actions
     * @param {string} options.e - Expiration date (UTC)
     * @param {number} options.t - Token type (0 - REFRESH, 1 - ACCESS)
     * @param {string} options.tpc - Permitted topic name
     */
    constructor({ a, e, t, tpc } = {}) {
        this.a = a;
        this.e = e;
        this.t = t;
        this.tpc = tpc;
    }

    /**
     * @returns {string} a;
     */
    get a() {
        return this._a;
    }

    /**
     * @param {string} value;
     * @returns {string} a;
     */
    set a(value) {
        this._a = value;
    }

    /**
     * @returns {string} e;
     */
    get e() {
        return this._e;
    }

    /**
     * @param {string} value;
     * @returns {string} e;
     */
    set e(value) {
        this._e = value;
    }

    /**
     * @returns {string} t;
     */
    get t() {
        return this._t; 
    }

    /**
     * @param {string} value;
     * @returns {string} t;
     */
    set t(value) {
        this._t = value;
    }

    /**
     * @returns {string} tpc;
     */
    get tpc() {
        return this._tpc;
    }

    /**
     * @param {string} value;
     * @returns {string} tpc;
     */
    set tpc(value) {
        this._tpc = value;
    }

    /**
     * Returns a copy of instance
     * @returns {object} A copy of instance
     */
    toObject() {
        return {
            a: this.a,
            e: this.e,
            t: this.t,
            tpc: this.tpc
        }
    }

    /**
     * Returns a stringified instance
     * @returns {string} A stringified instance
     */
    toString() {
        JSON.stringify(this.toObject());
    }
}


module.exports = PluginToken;