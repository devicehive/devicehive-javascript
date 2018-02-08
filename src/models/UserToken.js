
/**
 * UserToken model
 */
class UserToken {

    /**
     * Creates UserToken model
     * @param {object} options ({ userId, actions, networkIds, deviceTypeIds, expiration })
     */
    constructor({ userId, actions, networkIds, deviceTypeIds } = {}) {
        this.userId = userId;
        this.actions = actions;
        this.networkIds = networkIds;
        this.deviceTypeIds = deviceTypeIds;
        this.expiration = expiration;
    }

    /**
     * @returns {string} userId;
     */
    get userId() {
        return this._userId;
    }

    /**
     * @param {string} value;
     * @returns {string} userId;
     */
    set userId(value) {
        this._userId = value;
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
     * @returns {string} networkIds;
     */
    get networkIds() {
        return this._networkIds; 
    }

    /**
     * @param {string} value;
     * @returns {string} networkIds;
     */
    set networkIds(value) {
        this._networkIds = value;
    }

    /**
     * @returns {string} deviceTypeIds;
     */
    get deviceTypeIds() {
        return this._deviceTypeIds;
    }

    /**
     * @param {string} value;
     * @returns {string} deviceTypeIds;
     */
    set deviceTypeIds(value) {
        this._deviceTypeIds = value;
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
     * Returns a copy of instance
     * @returns {object} A copy of instance
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

    /**
     * Returns a stringified instance
     * @returns {string} A stringified instance
     */
    toString() {
        JSON.stringify(this.toObject());
    }
}


module.exports = UserToken;