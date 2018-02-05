const API = require('./API');
const ApiMap = require(`./transportResolvers/ApiMap`);
const UserListQuery = require('../models/query/UserListQuery');
const UserCountQuery = require('../models/query/UserCountQuery');


/**
 * Return a list of users
 */
class UserAPI extends API {

    /**
     * Creates UserAPI
     * @param {UserListQuery} userListQuery
     * @returns {Promise} list of users
     */
    list(userListQuery = new UserListQuery()) {
        return this.send(ApiMap.listUser, userListQuery.toObject());
    }

    /**
     * Returns count of users
     * @param {UserCountQuery} userCountQuery
     * @returns {Promise} count of users
     */
    count(userCountQuery = new UserCountQuery()) {
        return this.send(ApiMap.countUser, userCountQuery.toObject());
    }

    /**
     * Returns information about the current user
     * @param {number} userId
     * @returns {Promise} selected user
     */
    get(userId) {
        return this.send(ApiMap.getUser, { userId: userId });
    }

    /**
     * Registers a user
     * @param {User} user data
     * @returns {Promise} count of users
     */
    insert(user) {
        return this.send(ApiMap.addUser, {}, user.toObject());
    }

    /**
     * Updates a user (only for administrators)
     * @param {User} user data
     * @returns {Promise} count of users
     */
    update(user) {
        return this.send(ApiMap.updateUser, { userId: user.id }, user.toObject());
    }

    /**
     * Deletes an existing user
     * @param {number} userId
     * @returns {Promise}
     */
    delete(userId) {
        return this.send(ApiMap.deleteUser, { userId: userId });
    }

    /**
     * Returns information about the current user
     * @returns {Promise} selected user
     */
    getCurrent() {
        return this.send(ApiMap.getCurrentUser);
    }

    /**
     * Updates a user (only for administrators)
     * @param {User} user data
     * @returns {Promise} count of users
     */
    updateCurrent(user) {
        return this.send(ApiMap.updateCurrentUser, {}, user.toObject());
    }

    /**
     *
     * @param userId
     * @returns {Promise}
     */
    getDeviceTypes(userId) {
        return this.send(ApiMap.updateCurrentUser, { userId: userId });
    }

    /**
     *
     * @param userId
     * @returns {Promise}
     */
    unassignAllDeviceTypes(userId) {
        return this.send(ApiMap.updateCurrentUser, { userId: userId });
    }

    /**
     *
     * @param userId
     * @returns {Promise}
     */
    assignAllDeviceTypes(userId) {
        return this.send(ApiMap.updateCurrentUser, { userId: userId });
    }

    /**
     *
     * @param userId
     * @param deviceTypeId
     * @returns {Promise}
     */
    unassignDeviceType(userId, deviceTypeId) {
        return this.send(ApiMap.updateCurrentUser, { userId: userId, deviceTypeId: deviceTypeId });
    }

    /**
     *
     * @param userId
     * @param deviceTypeId
     * @returns {Promise}
     */
    getDeviceType(userId, deviceTypeId) {
        return this.send(ApiMap.updateCurrentUser, { userId: userId, deviceTypeId: deviceTypeId });
    }

    /**
     *
     * @param userId
     * @param deviceTypeId
     * @returns {Promise}
     */
    assignDeviceType(userId, deviceTypeId) {
        return this.send(ApiMap.updateCurrentUser, { userId: userId, deviceTypeId: deviceTypeId });
    }

    /**
     * Gets information about user/network association
     * @param {number} userId - User ID
     * @param {number} networkId - Network ID
     * @returns {Promise}
     */
    getNetwork(userId, networkId) {
        return this.send(ApiMap.getUserNetwork, { userId: userId, networkId: networkId });
    }

    /**
     * Associates network with the user
     * @param {number} userId - User ID
     * @param {number} networkId - Network ID
     * @returns {Promise}
     */
    assignNetwork(userId, networkId) {
        return this.send(ApiMap.assignNetwork, { userId: userId, networkId: networkId });
    }

    /**
     * Removes association between network and user
     * @param {number} userId - User ID
     * @param {number} networkId - Network ID
     * @returns {Promise}
     */
    unassignNetwork(userId, networkId) {
        return this.send(ApiMap.unassignNetwork, { userId: userId, networkId: networkId });
    }

}


module.exports = UserAPI;