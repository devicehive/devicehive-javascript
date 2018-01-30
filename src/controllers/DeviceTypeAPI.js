const API = require('./API');


/**
 *
 */
class DeviceTypeAPI extends API {

    /**
     * Returns information about the current deviceType
     * @param {number} deviceTypeId
     * @returns {Promise} selected deviceType
     */
    get(deviceTypeId) {
        return this.send(API.getDeviceType, { deviceTypeId: deviceTypeId });
    }

    /**
     * Return a list of deviceTypes
     * @param {Query} query params
     * @returns {Promise} list of deviceTypes
     */
    list(query) {
        return this.send(API.listDeviceType, query.toObject());
    }

    /**
     * Returns count of deviceTypes
     * @param {Query} query params
     * @returns {Promise} count of deviceTypes
     */
    count(query) {
        return this.send(API.countDeviceType, query.toObject());
    }

    /**
     * Registers a deviceType
     * @param {DeviceType} deviceType data
     * @returns {Promise} count of deviceTypes
     */
    insert(deviceType) {
        return this.send(API.addDeviceType, {}, deviceType.toObject());
    }

    /**
     * Updates a deviceType
     * @param {DeviceType} deviceType data
     * @returns {Promise} count of deviceTypes
     */
    update(deviceType) {
        return this.send(API.updateDeviceType, { deviceTypeId: deviceType.id }, deviceType.toObject());
    }

    /**
     * Deletes an existing deviceType
     * @param {number} deviceTypeId
     * @returns {Promise}
     */
    delete(deviceTypeId) {
        return this.send(API.deleteDeviceType, { deviceTypeId: deviceTypeId });
    }
}


module.exports = DeviceTypeAPI;