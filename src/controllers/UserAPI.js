const API = require('./API');


/**
 *
 */
class UserAPI extends API {

    /**
     * Return a list of users
     * @param {object} query params
     * @returns {Promise} list of users
     */
    list(query) {
        return this.send(API.listUser, query.toObject());
    }

    /**
     * Returns count of users
     * @param {object} query params
     * @returns {Promise} count of users
     */
    count(query) {
        return this.send(API.countUser, query.toObject());
    }

    /**
     * Returns information about the current user
     * @param {number} userId
     * @returns {Promise} selected user
     */
    get(userId) {
        return this.send(API.getUser, { userId: userId });
    }

    /**
     * Registers a user
     * @param {User} user data
     * @returns {Promise} count of users
     */
    insert(user) {
        return this.send(API.addUser, {}, user.toObject());
    }

    /**
     * Updates a user (only for administrators)
     * @param {User} user data
     * @returns {Promise} count of users
     */
    update(user) {
        return this.send(API.updateUser, { userId: user.id }, user.toObject());
    }

    /**
     * Deletes an existing user
     * @param {number} userId
     * @returns {Promise}
     */
    delete(userId) {
        return this.send(API.deleteUser, { userId: userId });
    }

    /**
     * Returns information about the current user
     * @returns {Promise} selected user
     */
    getCurrent() {
        return this.send(API.getCurrentUser);
    }

    /**
     * Updates a user (only for administrators)
     * @param {User} user data
     * @returns {Promise} count of users
     */
    updateCurrent(user) {
        return this.send(API.updateCurrentUser, {}, user.toObject());
    }

    /**
     * Gets information about user/network association
     * @param {number} userId - User ID
     * @param {number} networkId - Network ID
     * @returns {Promise}
     */
    getNetwork(userId, networkId) {
        return this.send(API.getUserNetwork, { userId: userId, networkId: networkId });
    }

    /**
     * Associates network with the user
     * @param {number} userId - User ID
     * @param {number} networkId - Network ID
     * @returns {Promise}
     */
    assignNetwork(userId, networkId) {
        return this.send(API.assignNetwork, { userId: userId, networkId: networkId });
    }

    /**
     * Removes association between network and user
     * @param {number} userId - User ID
     * @param {number} networkId - Network ID
     * @returns {Promise}
     */
    unassignNetwork(userId, networkId) {
        return this.send(API.unassignNetwork, { userId: userId, networkId: networkId });
    }

}


module.exports = UserAPI;