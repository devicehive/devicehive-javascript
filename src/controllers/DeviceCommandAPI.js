const API = require('./API');
const ApiMap = require(`./transportResolvers/ApiMap`);
const CommandGetQuery = require('../models/query/CommandGetQuery');
const CommandListQuery = require('../models/query/CommandListQuery');
const CommandPollQuery = require('../models/query/CommandPollQuery');
const CommandPollManyQuery = require('../models/query/CommandPollManyQuery');
const CommandWaitQuery = require('../models/query/CommandWaitQuery');


/**
 * Returns information about the current command
 */
class DeviceCommandAPI extends API {

    /**
     * Creates DeviceCommandAPI
     * @param {number} deviceId - Device ID
     * @param {number} commandId - Command ID
     * @param {CommandGetQuery} commandGetQuery
     * @returns {Promise} selected command
     */
    get(deviceId, commandId, commandGetQuery = new CommandGetQuery()) {
        return this.send(ApiMap.getCommand, Object.assign({ deviceId: deviceId, commandId: commandId }, commandGetQuery.toObject()));
    }

    /**
     * Return a list of commands
     * @param {CommandListQuery} commandListQuery
     * @returns {Promise} list of commands
     */
    list(commandListQuery = new CommandListQuery()) {
        return this.send(ApiMap.listCommand, commandListQuery.toObject());
    }

    /**
     * Registers a command
     * @param {number} deviceId - Device ID
     * @param {Command} command
     * @returns {Promise} count of commands
     */
    insert(deviceId, command) {
        return this.send(ApiMap.insertCommand, { deviceId: deviceId }, command.toObject());
    }

    /**
     * Updates a command
     * @param {Command} command
     * @returns {Promise} count of commands
     */
    update(command) {
        return this.send(ApiMap.updateCommand, { deviceId: command.deviceId, commandId: command.id }, command.toObject());
    }

    /**
     * Poll commands
     * @param {CommandPollQuery} commandPollQuery
     * @returns {Promise}
     */
    poll(commandPollQuery = new CommandPollQuery()) {
        return this.send(ApiMap.pollCommand, commandPollQuery.toObject());
    }

    /**
     * Poll many commands
     * @param {CommandPollManyQuery} commandPollManyQuery
     * @returns {Promise}
     */
    pollMany(commandPollManyQuery = new CommandPollManyQuery()) {
        return this.send(ApiMap.pollManyCommand, commandPollManyQuery.toObject());
    }

    /**
     * Wait for command to be processed
     * @param deviceId
     * @param commandId
     * @param {CommandWaitQuery} commandWaitQuery
     * @returns {Promise}
     */
    wait(deviceId, commandId, commandWaitQuery = new CommandWaitQuery()) {
        return this.send(ApiMap.waitCommand, Object.assign({}, {
            deviceId,
            commandId
        }, commandWaitQuery.toObject()));
    }

    /**
     * Subscribe for command creation events
     * @param {CommandPollQuery} commandPollQuery
     * @returns {Promise}
     */
    subscribe(commandPollQuery = new CommandPollQuery()) {
        return this.send(ApiMap.subscribeCommand, commandPollQuery.toObject());
    }

    /**
     * Unsubscribe for command creation events
     * @param {Number} subscriptionId
     * @returns {Promise}
     */
    unsubscribe(subscriptionId) {
        return this.send(ApiMap.unsubscribeCommand, { subscriptionId: subscriptionId });
    }
}


module.exports = DeviceCommandAPI;