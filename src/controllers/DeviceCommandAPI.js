const API = require('./API');
const ApiMap = require(`./transportResolvers/ApiMap`);


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
        return this.send(ApiMap.getCommand, { deviceId: deviceId, commandId: commandId });
    }

    /**
     * Return a list of commands
     * @param {object} query - Params
     * @returns {Promise} list of commands
     */
    list(query) {
        return this.send(ApiMap.listCommand, query.toObject());
    }

    /**
     * Registers a command
     * @param {number} deviceId - Device ID
     * @param {Command} command data
     * @returns {Promise} count of commands
     */
    insert(deviceId, command) {
        return this.send(ApiMap.insertCommand, { deviceId: deviceId }, command.toObject());
    }

    /**
     * Updates a command
     * @param {Command} command data
     * @returns {Promise} count of commands
     */
    update(command) {
        return this.send(ApiMap.updateCommand, { deviceId: command.deviceId, commandId: command.id }, command.toObject());
    }

    /**
     *
     * @param {CommandPollQuery} commandPollQuery
     * @returns {*}
     */
    poll(commandPollQuery) {
        return this.send(ApiMap.pollCommand, commandPollQuery.toObject());
    }

    /**
     *
     * @param query
     * @returns {*}
     */
    pollMany(query) {
        return this.send(ApiMap.pollManyCommand, query.toObject());
    }

    /**
     *
     * @param deviceId
     * @param commandId
     * @returns {*}
     */
    wait(deviceId, commandId) {
        return this.send(ApiMap.waitCommand, { deviceId: deviceId, commandId: commandId });
    }

    /**
     *
     * @param {CommandPollQuery} commandPollQuery
     * @returns {Promise}
     */
    subscribe(commandPollQuery) {
        return this.send(ApiMap.subscribeCommand, commandPollQuery.toObject());
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


module.exports = DeviceCommandAPI;