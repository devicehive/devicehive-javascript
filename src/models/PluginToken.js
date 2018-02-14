const BaseModel = require(`./BaseModel`);


/**
 * PluginToken model
 */
class PluginToken extends BaseModel {

    /**
     * Creates new PluginToken model
     * @param {Object} options - model options object
     * @param {} options.actions
     * @param {} options.expiration
     * @param {} options.type
     * @param {} options.topicName
     */
    constructor({ actions, expiration, type, topicName } = {}) {
        super();

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
     * Returns instance as a plain JS object
     * @returns {Object}
     */
    toObject() {
        return {
            a: this.actions,
            e: this.expiration,
            t: this.type,
            tpc: this.topicName
        }
    }
}


module.exports = PluginToken;