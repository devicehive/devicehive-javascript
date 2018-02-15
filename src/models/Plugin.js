const BaseModel = require(`./BaseModel`);


/**
 * Plugin model
 */
class Plugin extends BaseModel {

    /**
     * Creates new Plugin model
     * @param {object} options - model options object
     * @param {id} options.id - Plgin unique idnetifier
     * @param {string} options.name - Plugin name
     * @param {string} options.description - Plugin description
     * @param {string} options.topicName - Plugin topic name
     * @param {string} options.filter - Plugin filter
     * @param {string} options.status - Plugin status
     * @param {string} options.subscriptionId - Plugin subscribtion id
     * @param {number} options.userId - Plugin user id
     * @param {object} options.parameters - Json object with parameters
     */
    constructor({ id, name, description, topicName, filter, status, subscriptionId, userId, parameters } = {}) {
        super();

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
     * Returns instance as a plain JS object
     * @returns {Object}
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
}


module.exports = Plugin;