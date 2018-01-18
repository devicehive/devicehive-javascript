// Model

class DeviceNotification {

    /**
     * DeviceNotification model
     * @param {object} options ({ id, notification, timestamp, parameters })
     */
    constructor({ id, notification, timestamp, parameters }) {
        this.id = id;
        this.notification = notification;
        this.timestamp = timestamp;
        this.parameters = parameters;
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

module.exports = DeviceNotification;