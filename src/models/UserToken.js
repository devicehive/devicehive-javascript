const BaseModel = require(`./BaseModel`);


/**
 * UserToken model
 */
class UserToken extends BaseModel {

    /**
     * Creates new UserToken model
     * @param {Object} options - model options object
     * @param {} options.userId
     * @param {} options.actions
     * @param {} options.networkIds
     * @param {} options.deviceTypeIds
     * @param {} options.expiration
     */
    constructor({ userId, actions, networkIds, deviceTypeIds, expiration } = {}) {
        super();

        this.userId = userId;
        this.actions = actions;
        this.networkIds = networkIds;
        this.deviceTypeIds = deviceTypeIds;
        this.expiration = expiration;
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
            expiration: this.expiration
        }
    }
}


module.exports = UserToken;