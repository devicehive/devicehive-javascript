
/**
 * PluginToken model
 */
class PluginToken {

    /**
     * Creates PluginToken model
     * @param {Object} options ({
     *      actions,
     *      expiration,
     *      type,
     *      topicName
     * })
     */
    constructor({ actions, expiration, type, topicName } = {}) {
        this.actions = actions;
        this.expiration = expiration;
        this.type = type;
        this.topicName = topicName;
    }

    get actions() {
        return this._actions;
    }

    set actions(value) {
        this._actions = value;
    }

    get expiration() {
        return this._expiration;
    }

    set expiration(value) {
        this._expiration = value;
    }

    get type() {
        return this._type; 
    }

    set type(value) {
        this._type = value;
    }

    get topicName() {
        return this._topicName;
    }

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