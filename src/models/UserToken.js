/**
 * UserToken model
 */
class UserToken {

    /**
     * Creates UserToken model
     * @param {Object} options ({
     *      userId,
     *      actions,
     *      networkIds,
     *      deviceTypeIds,
     *      expiration
     * })
     */
    constructor({ userId, actions, networkIds, deviceTypeIds, expiration } = {}) {
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