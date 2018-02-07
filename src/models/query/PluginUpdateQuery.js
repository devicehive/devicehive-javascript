
/**
 * Plugin Update Query model
 */
class PluginUpdateQuery {

    /**
     * Creates Plugin Update Query model
     * @param {object} options - Options for instance
     * @param {string} options.topicName - Name of topic that was created for the plugin
     * @param {string} [options.deviceId] - Device device_id
     * @param {string} [options.networkIds] - Network ids
     * @param {string} [options.deviceTypeIds] - Device type ids
     * @param {string} [options.names] - Command/Notification names
     * @param {boolean} [options.returnCommands] - Checks if commands should be returned
     * @param {boolean} [options.returnUpdatedCommands] - Checks if updated commands should be returned
     * @param {boolean} [options.returnNotifications] - Checks if commands should be returned
     * @param {string} [options.parameters] - Plugin parameters
     */
    constructor({ deviceId, networkIds, deviceTypeIds, names, returnCommands, returnUpdatedCommands, returnNotifications, parameters } = {}) {
        this.deviceId = deviceId;
        this.networkIds = networkIds;
        this.deviceTypeIds = deviceTypeIds;
        this.names = names;
        this.returnCommands = returnCommands;
        this.returnUpdatedCommands = returnUpdatedCommands;
        this.returnNotifications = returnNotifications;
        this.parameters = parameters;
    }

    get topicName() {
        return this._topicName;
    }

    set topicName(value) {
        this._topicName = value;
    }

    get deviceId() {
        return this._deviceId;
    }

    set deviceId(value) {
        this._deviceId = value;
    }

    get networkIds() {
        return this._networkIds;
    }

    set networkIds(value) {
        this._networkIds = value;
    }

    get deviceTypeIds() {
        return this._deviceTypeIds;
    }

    set deviceTypeIds(value) {
        this._deviceTypeIds = value;
    }

    get names() {
        return this._names;
    }

    set names(value) {
        this._names = value;
    }

    get returnCommands() {
        return this._returnCommands;
    }

    set returnCommands(value) {
        this._returnCommands = value;
    }

    get returnUpdatedCommands() {
        return this._returnUpdatedCommands;
    }

    set returnUpdatedCommands(value) {
        this._returnUpdatedCommands = value;
    }

    get returnNotifications() {
        return this._returnNotifications;
    }

    set returnNotifications(value) {
        this._returnNotifications = value;
    }

    get parameters() {
        return this._parameters;
    }

    set parameters(value) {
        this._parameters = value;
    }

    /**
     *
     * @returns {{deviceId: string, networkIds: string, deviceTypeIds: string, names: string, returnCommands: boolean, returnUpdatedCommands: boolean, returnNotifications: boolean, parameters: number }}
     */
    toObject() {
        return {
            deviceId: this.deviceId,
            networkIds: this.networkIds,
            deviceTypeIds: this.deviceTypeIds,
            names: this.names,
            returnCommands: this.returnCommands,
            returnUpdatedCommands: this.returnUpdatedCommands,
            returnNotifications: this.returnNotifications,
            parameters: this.parameters
        }
    }
}


module.exports = PluginUpdateQuery;