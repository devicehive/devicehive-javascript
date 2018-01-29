const API = require('./API');


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
        return this.send(API.getNotification, { deviceId: deviceId, notificationId: notificationId });
    }

    /**
     * Return a list of notifications
     * @param {string} deviceId
     * @param {Query} query
     * @returns {Promise} list of notifications
     */
    list(deviceId, query) {
        return this.send(API.listNotification, query);
    }

    /**
     * Registers a notification
     * @param {string} deviceId
     * @param {Notification} notification
     * @returns {Promise} count of notifications
     */
    insert(deviceId, notification) {
        return this.send(API.insertNotification, { deviceId: deviceId }, notification);
    }
}


module.exports = DeviceNotificationAPI;