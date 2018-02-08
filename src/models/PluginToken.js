
/**
 * PluginToken model
 */
class PluginToken {

    /**
     * Creates PluginToken model
     * @param {object} options Options for instance
     * @param {Array} options.actions - Actions
     * @param {string} options.expiration - Expiration date (UTC)
     * @param {number} options.type - Token type (0 - REFRESH, 1 - ACCESS)
     * @param {string} options.topicName - Permitted topic name
     */
    constructor({ actions, expiration, type, topicName } = {}) {
        this.actions = actions;
        this.expiration = expiration;
        this.type = type;
        this.topicName = topicName;
    }

    /**
     * @returns {string} actions;
     */
    get actions() {
        return this._actions;
    }

    /**
     * @param {string} value;
     * @returns {string} actions;
     */
    set actions(value) {
        this._actions = value;
    }

    /**
     * @returns {string} expiration;
     */
    get expiration() {
        return this._expiration;
    }

    /**
     * @param {string} value;
     * @returns {string} expiration;
     */
    set expiration(value) {
        this._expiration = value;
    }

    /**
     * @returns {string} type;
     */
    get type() {
        return this._type; 
    }

    /**
     * @param {string} value;
     * @returns {string} type;
     */
    set type(value) {
        this._type = value;
    }

    /**
     * @returns {string} topicName;
     */
    get topicName() {
        return this._topicName;
    }

    /**
     * @param {string} value;
     * @returns {string} topicName;
     */
    set topicName(value) {
        this._topicName = value;
    }

    /**
     * Returns a copy of instance
     * @returns {object} A copy of instance
     */
    toObject() {
        return {
            a: this.actions,
            e: this.expiration,
            t: this.type,
            tpc: this.topicName
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