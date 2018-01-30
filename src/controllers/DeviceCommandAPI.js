const API = require('./API');


/**
 *
 */
class DeviceCommandAPI extends API {

    /**
     * Returns information about the current command
     * @param {number} deviceId - Device ID
     * @param {number} commandId - Command ID
     * @returns {Promise} selected command
     */
    get(deviceId, commandId) {
        return this.send(API.getCommand, { deviceId: deviceId, commandId: commandId });
    }

    /**
     * Return a list of commands
     * @param {object} query - Params
     * @returns {Promise} list of commands
     */
    list(query) {
        return this.send(API.listCommand, query.toObject());
    }

    /**
     * Registers a command
     * @param {number} deviceId - Device ID
     * @param {Command} command data
     * @returns {Promise} count of commands
     */
    insert(deviceId, command) {
        return this.send(API.insertCommand, { deviceId: deviceId }, command.toObject());
    }

    /**
     * Updates a command
     * @param {Command} command data
     * @returns {Promise} count of commands
     */
    update(command) {
        return this.send({ deviceId: command.deviceId, commandId: command.id }, command.toObject());
    }
}


module.exports = DeviceCommandAPI;