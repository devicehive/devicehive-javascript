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
     * @param {string} deviceId
     * @param {Query} query
     * @returns {Promise} list of notifications
     */
    list(deviceId, query) {
        return this.send(ApiMap.listNotification, query.toObject());
    }

    /**
     * Registers a notification
     * @param {Notification} notification
     * @returns {Promise} count of notifications
     */
    insert(notification) {
        return this.send(ApiMap.insertNotification, { deviceId: notification.deviceId }, notification.toObject());
    }
}


module.exports = DeviceNotificationAPI;