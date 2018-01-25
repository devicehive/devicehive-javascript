'use strict';

const API = require('./API');

// API

class DeviceCommandAPI extends API {

    /**
     * DeviceCommandAPI
     */
    constructor(...args) {
        super(...args);
        this.type = API.DEVICE_TYPE;
        this.nestedType = API.DEVICECOMMAND_TYPE;
    }

    /**
     * Returns information about the current deviceType
     * @param {number} deviceId
     * @returns {promise} selected deviceType
     */
    get(deviceId) {
        return this.send({
            root: true,
            type: 'get',
            parameters: {
                deviceId
            }
        });
    }

    /**
     * Return a list of deviceTypes
     * @param {object} query params
     * @returns {promise} list of deviceTypes
     */
    list(body) {
        return this.send({
            body,
            root: true,
            type: 'list'
        });
    }

    /**
     * Returns count of deviceTypes
     * @param {object} query params
     * @returns {promise} count of deviceTypes
     */
    count(query) {
        return this.send({
            type: 'count'
        });
    }

    /**
     * Registers a deviceType
     * @param {object} body deviceType data
     * @returns {promise} count of deviceTypes
     */
    insert(body) {
        return this.send({
            body,
            root: true,
            type: 'insert',
            method: 'POST'
        });
    }

    /**
     * Updates a deviceType
     * @param {number} deviceId
     * @param {object} body deviceType data
     * @returns {promise} count of deviceTypes
     */
    update(deviceId, body) {
        return this.send({
            body,
            root: true,
            type: 'update',
            method: 'PUT',
            parameters: {
                deviceId
            }
        });
    }

    /**
     * Deletes an existing deviceType
     * @param {number} deviceId
     * @returns {promise}
     */
    delete(deviceId) {
        return this.send({
            root: true,
            type: 'delete',
            method: 'DELETE',
            parameters: {
                deviceId
            }
        });
    }
}


// Exports

module.exports = DeviceCommandAPI;