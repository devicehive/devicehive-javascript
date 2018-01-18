// Model

class DeviceCommand {

    /**
     * DeviceCommand model
     * @param {object} options ({ id, notification, timestamp, parameters })
     */
    constructor({ id, command, timestamp, lastUpdated, userId, deviceId, networkId, deviceTypeId, parameters, lifetime, status, result }) {
        this.id = id;
        this.command = command;
        this.timestamp = timestamp;
        this.lastUpdated = lastUpdated;
        this.userId = userId;
        this.deviceId = deviceId;
        this.networkId = networkId;
        this.deviceTypeId = deviceTypeId;
        this.parameters = parameters;
        this.lifetime = lifetime;
        this.status = status;
        this.result = result;
    }

    /**
     * @returns {number} id;
     */
    get id() {
        return this.id;
    }

    /**
    * @param {number} value;
    * @returns {number} id;
    */
    set id(value) {
        return this.id = value;
    }

    /**
     * @returns {string} name;
     */
    get name() {
        return this.name;
    }

    /**
     * @param {string} value;
     * @returns {string} name;
     */
    set name(value) {
        return this.name = value;
    }

    /**
     * @returns {string} notification;
     */
    get notification() {
        return this.notification;
    }

    /**
     * @param {string} value;
     * @returns {string} notification;
     */
    set notification(value) {
        return this.notification = value;
    }

    /**
     * @returns {string} timestamp;
     */
    get timestamp() {
        return this.timestamp;
    }

    /**
     * @param {string} value;
     * @returns {string} timestamp;
     */
    set timestamp(value) {
        return this.timestamp = value;
    }

    /**
     * @returns {string} lastUpdated;
     */
    get lastUpdated() {
        return this.lastUpdated;
    }

    /**
     * @param {string} value;
     * @returns {string} lastUpdated;
     */
    set lastUpdated(value) {
        return this.lastUpdated = value;
    }

    /**
     * @returns {number} userId;
     */
    get userId() {
        return this.userId;
    }

    /**
    * @param {number} value;
    * @returns {number} userId;
    */
    set userId(value) {
        return this.userId = value;
    }

    /**
     * @returns {number} deviceId;
     */
    get deviceId() {
        return this.deviceId;
    }

    /**
    * @param {number} value;
    * @returns {number} deviceId;
    */
    set deviceId(value) {
        return this.deviceId = value;
    }

    /**
     * @returns {number} networkId;
     */
    get networkId() {
        return this.networkId;
    }

    /**
    * @param {number} value;
    * @returns {number} networkId;
    */
    set networkId(value) {
        return this.networkId = value;
    }

    /**
     * @returns {number} deviceTypeId;
     */
    get deviceTypeId() {
        return this.deviceTypeId;
    }

    /**
    * @param {number} value;
    * @returns {number} deviceTypeId;
    */
    set deviceTypeId(value) {
        return this.deviceTypeId = value;
    }

    /**
     * @returns {object} parameters;
     */
    get parameters() {
        return this.parameters;
    }

    /**
     * @param {object} value;
     * @returns {object} parameters;
     */
    set parameters(value) {
        return this.parameters = value;
    }

    /**
     * @returns {number} lifetime;
     */
    get lifetime() {
        return this.lifetime;
    }

    /**
    * @param {number} value;
    * @returns {number} lifetime;
    */
    set lifetime(value) {
        return this.lifetime = value;
    }

    /**
     * @returns {string} status;
     */
    get status() {
        return this.status;
    }

    /**
    * @param {string} value;
    * @returns {string} status;
    */
    set status(value) {
        return this.status = value;
    }

    /**
     * Returns a copy of instance
     * @returns {object} A copy of instance
     */
    toObject() {
        return Object.assign({}, this);
    }

    /**
     * Returns a stringified instance
     * @returns {object} A stringified instance
     */
    toString() {
        JSON.stringify(this);
    }
}


// Exports

module.exports = DeviceCommand;