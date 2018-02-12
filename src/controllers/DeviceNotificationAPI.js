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
        return this.send(ApiMap.listNotification, notificationListQuery.toObject());
    }

    /**
     * Registers a notification
     * @param {Number} deviceId
     * @param {Notification} notification
     * @returns {Promise} count of notifications
     */
    insert(deviceId, notification) {
        return this.send(ApiMap.insertNotification, { deviceId }, notification.toObject());
    }

    /**
     *
     * @param {NotificationPollQuery} notificationPollQuery
     * @returns {*}
     */
    poll(notificationPollQuery = new NotificationPollQuery()) {
        return this.send(ApiMap.pollNotification, notificationPollQuery.toObject());
    }

    /**
     *
     * @param {NotificationPollManyQuery} notificationPollManyQuery
     * @returns {*}
     */
    pollMany(notificationPollManyQuery = new NotificationPollManyQuery()) {
        return this.send(ApiMap.pollManyNotification, notificationPollManyQuery.toObject());
    }

    /**
     *
     * @param {NotificationPollQuery} notificationPollQuery
     * @returns {Promise}
     */
    subscribe(notificationPollQuery = new NotificationPollQuery()) {
        return this.send(ApiMap.subscribeNotification, notificationPollQuery.toObject());
    }

    /**
     *
     * @param {Number} subscriptionId
     * @returns {Promise}
     */
    unsubscribe(subscriptionId) {
        return this.send(ApiMap.unsubscribeNotification, { subscriptionId: subscriptionId });
    }
}


module.exports = DeviceNotificationAPI;