/**
 * Plugin model
 */
class Plugin {

    /**
     * Creates Plugin model
     * @param {Object} options ({
     *      id,
     *      name,
     *      description,
     *      topicName,
     *      filter,
     *      status,
     *      subscriptionId,
     *      userId,
     *      parameters
     * })
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

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get topicName() {
        return this._topicName;
    }

    set topicName(value) {
        this._topicName = value;
    }

    get filter() {
        return this._filter;
    }

    set filter(value) {
        this._filter = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get subscriptionId() {
        return this._subscriptionId;
    }

    set subscriptionId(value) {
        this._subscriptionId = value;
    }

    get userId() {
        return this._userId;
    }

    set userId(value) {
        this._userId = value;
    }

    get parameters() {
        return this._parameters;
    }

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
     * @returns {string} A stringified instance
     */
    toString() {
        JSON.stringify(this.toObject());
    }
}


module.exports = Plugin;