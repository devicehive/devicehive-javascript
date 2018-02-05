const API = require('./API');
const ApiMap = require(`./transportResolvers/ApiMap`);
const NotificationListQuery = require('../models/query/NotificationListQuery');
const NotificationPollQuery = require('../models/query/NotificationPollQuery');
const NotificationPollManyQuery = require('../models/query/NotificationPollManyQuery');

/**
 * Returns information about the current notification
 */
class DeviceNotificationAPI extends API {

    /**
     * Creates DeviceNotificationAPI
     * @param {number} deviceId - Device ID
     * @param {number} notificationId - Notification ID
     * @returns {Promise} selected notification
     */
    get(deviceId, notificationId) {
        return this.send(ApiMap.getNotification, { deviceId: deviceId, notificationId: notificationId });
    }

    /**
     * Return a list of notifications
     * @param {NotificationListQuery} notificationListQuery
     * @returns {Promise} list of notifications
     */
    list(notificationListQuery = new NotificationListQuery()) {
        return this.send(ApiMap.listNotification, deviceListQuery.toObject());
    }

    /**
     * Registers a notification
     * @param {Notification} notification
     * @returns {Promise} count of notifications
     */
    insert(notification) {
        return this.send(ApiMap.insertNotification, { deviceId: notification.deviceId }, notification.toObject());
    }

    /**
     *
     * @param {NotificationPollQuery} notificationPollQuery
     * @returns {*}
     */
    poll(notificationPollQuery = new NotificationPollQuery()) {
        return this.send(ApiMap.pollCommand, notificationPollQuery.toObject());
    }

    /**
     *
     * @param {NotificationPollManyQuery} notificationPollManyQuery
     * @returns {*}
     */
    pollMany(notificationPollManyQuery = new NotificationPollManyQuery()) {
        return this.send(ApiMap.pollManyCommand, notificationPollManyQuery.toObject());
    }

    /**
     *
     * @param {NotificationPollQuery} notificationPollQuery
     * @returns {Promise}
     */
    subscribe(notificationPollQuery = new NotificationPollQuery()) {
        return this.send(ApiMap.subscribeCommand, notificationPollQuery.toObject());
    }

    /**
     *
     * @param {Number} subscriptionId
     * @returns {Promise}
     */
    unsubscribe(subscriptionId) {
        return this.send(ApiMap.unsubscribeCommand, { subscriptionId: subscriptionId });
    }
}


module.exports = DeviceNotificationAPI;