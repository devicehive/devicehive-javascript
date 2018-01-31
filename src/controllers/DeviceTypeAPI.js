const API = require('./API');
const ApiMap = require(`./transportResolvers/ApiMap`);


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
        return this.send(ApiMap.getDeviceType, { deviceTypeId: deviceTypeId });
    }

    /**
     * Return a list of deviceTypes
     * @param {DeviceTypeListQuery} deviceTypeListQuery
     * @returns {Promise} list of deviceTypes
     */
    list(deviceTypeListQuery) {
        return this.send(ApiMap.listDeviceType, deviceTypeListQuery.toObject());
    }

    /**
     * Returns count of deviceTypes
     * @param {DeviceTypeCountQuery} deviceTypeCountQuery
     * @returns {Promise} count of deviceTypes
     */
    count(deviceTypeCountQuery) {
        return this.send(ApiMap.countDeviceType, deviceTypeCountQuery.toObject());
    }

    /**
     * Registers a deviceType
     * @param {DeviceType} deviceType data
     * @returns {Promise} count of deviceTypes
     */
    insert(deviceType) {
        return this.send(ApiMap.addDeviceType, {}, deviceType.toObject());
    }

    /**
     * Updates a deviceType
     * @param {DeviceType} deviceType data
     * @returns {Promise} count of deviceTypes
     */
    update(deviceType) {
        return this.send(ApiMap.updateDeviceType, { deviceTypeId: deviceType.id }, deviceType.toObject());
    }

    /**
     * Deletes an existing deviceType
     * @param {number} deviceTypeId
     * @returns {Promise}
     */
    delete(deviceTypeId) {
        return this.send(ApiMap.deleteDeviceType, { deviceTypeId: deviceTypeId });
    }
}


module.exports = DeviceTypeAPI;