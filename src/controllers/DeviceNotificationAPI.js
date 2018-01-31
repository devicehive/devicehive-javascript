const API = require('./API');
const ApiMap = require(`./transportResolvers/ApiMap`);


/**
 *
 */
class DeviceNotificationAPI extends API {

    /**
     * Returns information about the current notification
     * @param {number} deviceId - Device ID
     * @param {number} notificationId - Notification ID
     * @returns {Promise} selected notification
     */
    get(deviceId, notificationId) {
        return this.send(ApiMap.getNotification, { deviceId: deviceId, notificationId: notificationId });
    }

    /**
     * Return a list of notifications
     * @param {DeviceListQuery} deviceListQuery
     * @returns {Promise} list of notifications
     */
    list(deviceListQuery) {
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
    poll(notificationPollQuery) {
        return this.send(ApiMap.pollCommand, notificationPollQuery.toObject());
    }

    /**
     *
     * @param {NotificationPollManyQuery} notificationPollManyQuery
     * @returns {*}
     */
    pollMany(notificationPollManyQuery) {
        return this.send(ApiMap.pollManyCommand, notificationPollManyQuery.toObject());
    }

    /**
     *
     * @param {NotificationPollQuery} notificationPollQuery
     * @returns {Promise}
     */
    subscribe(notificationPollQuery) {
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