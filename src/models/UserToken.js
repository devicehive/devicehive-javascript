const BaseModel = require(`./BaseModel`);


/**
 * UserToken model
 */
class UserToken extends BaseModel {

    /**
     * Creates new UserToken model
     * @param {object} options - model options object
     * @param {number} options.userId - User id
     * @param {Array} options.actions - User Actions
     * @param {Array} options.networkIds - Network id's
     * @param {Array} options.deviceTypeIds - Devicetype id's
     * @param {string} options.expiration - Token expiration datetme
     */
    constructor({ userId, actions, networkIds, deviceTypeIds, expiration, refreshExpiration } = {}) {
        super();

        this.userId = userId;
        this.actions = actions;
        this.networkIds = networkIds;
        this.deviceTypeIds = deviceTypeIds;
        this.expiration = expiration;
        this.refreshExpiration = refreshExpiration;
    }

    get userId() {
        return this._userId;
    }

    set userId(value) {
        this._userId = value;
    }

    get actions() {
        return this._actions;
    }

    set actions(value) {
        this._actions = value;
    }

    get networkIds() {
        return this._networkIds; 
    }

    set networkIds(value) {
        this._networkIds = value;
    }

    get deviceTypeIds() {
        return this._deviceTypeIds;
    }

    set deviceTypeIds(value) {
        this._deviceTypeIds = value;
    }

    get expiration() {
        return this._expiration;
    }

    set expiration(value) {
        this._expiration = value;
    }

    get refreshExpiration() {
        return this._refreshExpiration;
    }

    set refreshExpiration(value) {
        this._refreshExpiration = value;
    }

    /**
     * Returns instance as a plain JS object
     * @returns {Object}
     */
    toObject() {
        return {
            userId: this.userId,
            actions: this.actions,
            networkIds: this.networkIds,
            deviceTypeIds: this.deviceTypeIds,
            expiration: this.expiration,
            refreshExpiration: this.refreshExpiration
        }
    }
}


module.exports = UserToken;