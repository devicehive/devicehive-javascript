const API = require('./API');
const ApiMap = require(`./transportResolvers/ApiMap`);
const DeviceCountQuery = require('../models/query/DeviceCountQuery');
const DeviceListQuery = require('../models/query/DeviceListQuery');


/**
 * Returns information about the current device
 */
class DeviceAPI extends API {

    /**
     * Creates DeviceAPI
     * @param {string} deviceId
     * @returns {Promise} selected device
     */
    get(deviceId) {
        return this.send(ApiMap.getDevice, { deviceId: deviceId });
    }

    /**
     * Return a list of devices
     * @param {DeviceListQuery} deviceListQuery
     * @returns {Promise} list of devices
     */
    list(deviceListQuery = new DeviceListQuery()) {
        return this.send(ApiMap.listDevice, deviceListQuery.toObject());
    }

    /**
     * Returns count of devices
     * @param {DeviceCountQuery} deviceCountQuery
     * @returns {Promise} count of devices
     */
    count(deviceCountQuery = new DeviceCountQuery()) {
        return this.send(ApiMap.countDevice, deviceCountQuery.toObject());
    }

    /**
     * Registers or updates a device
     * @param {object} device data
     * @returns {Promise} count of devices
     */
    add(device) {
        return this.send(ApiMap.addDevice, { deviceId: device.id }, device.toObject());
    }

    /**
     * Deletes an existing device
     * @param {string} deviceId
     * @returns {Promise}
     */
    delete(deviceId) {
        return this.send(ApiMap.deleteDevice, { deviceId: deviceId });
    }
}


module.exports = DeviceAPI;