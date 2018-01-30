const API = require('./API');


/**
 *
 */
class DeviceAPI extends API {

    /**
     * Returns information about the current device
     * @param {string} deviceId
     * @returns {Promise} selected device
     */
    get(deviceId) {
        return this.send(API.getDevice, { deviceId: deviceId });
    }

    /**
     * Return a list of devices
     * @param {object} query params
     * @returns {Promise} list of devices
     */
    list(query) {
        return this.send(API.listDevice, query.toObject());
    }

    /**
     * Returns count of devices
     * @param {object} query params
     * @returns {Promise} count of devices
     */
    count(query) {
        return this.send(API.countDevice, query.toObject());
    }

    /**
     * Registers or updates a device
     * @param {object} device data
     * @returns {Promise} count of devices
     */
    add(device) {
        return this.send(API.addDevice, { deviceId: device.id }, device.toObject());
    }

    /**
     * Deletes an existing device
     * @param {string} deviceId
     * @returns {Promise}
     */
    delete(deviceId) {
        return this.send(API.deleteDevice, { deviceId: deviceId });
    }
}


module.exports = DeviceAPI;