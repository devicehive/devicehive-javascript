
/**
 * Plugin model
 */
class Plugin {

    /**
     * Creates Plugin model
     * @param {object} options ({ id, name, description })
     */
    constructor({ id, name, description, topicName, filter, status, subscriptionId, userId, parameters } = {}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.topicName = topicName;
        this.filter = filter;
        this.status = status;
        this.subscriptionId = subscriptionId;
        this.userId = userId;
        this.parameters = parameters;
    }

    /**
     * @returns {number} id;
     */
    get id() {
        return this._id;
    }

    /**
    * @param {number} value;
    * @returns {number} id;
    */
    set id(value) {
        this._id = value;
    }

    /**
     * @returns {string} name;
     */
    get name() {
        return this._name;
    }

    /**
     * @param {string} value;
     * @returns {string} name;
     */
    set name(value) {
        this._name = value;
    }

    /**
     * @returns {string} description;
     */
    get description() {
        return this._description;
    }

    /**
     * @param {string} value;
     * @returns {string} description;
     */
    set description(value) {
        this._description = value;
    }

    /**
     * @returns {string} topicName;
     */
    get topicName() {
        return this._topicName;
    }

    /**
     * @param {string} value;
     * @returns {string} topicName;
     */
    set topicName(value) {
        this._topicName = value;
    }

    /**
     * @returns {string} filter;
     */
    get filter() {
        return this._filter;
    }

    /**
     * @param {string} value;
     * @returns {string} filter;
     */
    set filter(value) {
        this._filter = value;
    }

    /**
     * @returns {string} status;
     */
    get status() {
        return this._status;
    }

    /**
     * @param {string} value;
     * @returns {string} status;
     */
    set status(value) {
        this._status = value;
    }

    /**
     * @returns {number} subscriptionId;
     */
    get subscriptionId() {
        return this._subscriptionId;
    }

    /**
     * @param {number} value;
     * @returns {number} subscriptionId;
     */
    set subscriptionId(value) {
        this._subscriptionId = value;
    }

    /**
     * @returns {number} userId;
     */
    get userId() {
        return this._userId;
    }

    /**
     * @param {number} value;
     * @returns {number} userId;
     */
    set userId(value) {
        this._userId = value;
    }

    /**
     * @returns {object} parameters;
     */
    get parameters() {
        return this._parameters;
    }

    /**
     * @param {object} value;
     * @returns {object} parameters;
     */
    set parameters(value) {
        this._parameters = value;
    }

    /**
     * Returns a copy of instance
     * @returns {object} A copy of instance
     */
    toObject() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            topicName: this.topicName,
            filter: this.filter,
            status: this.status,
            subscriptionId: this.subscriptionId,
            userId: this.userId,
            parameters: this.parameters
        }
    }

    /**
     * Returns a stringified instance
     * @returns {object} A stringified instance
     */
    toString() {
        JSON.stringify(this.toObject());
    }
}


module.exports = Plugin;