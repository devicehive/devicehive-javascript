const BaseModel = require(`../BaseModel`);


/**
 * PluginCountQuery class
 */
class PluginCountQuery extends BaseModel {
    
    /**
     * Creates new PluginCountQuery model
     * @param {object} options - model options object
     * @param {string} options.name - Filter by plugin name
     * @param {string} options.namePattern - Filter by plugin name pattern. In pattern wildcards '%' and '_' can be used
     * @param {string} options.topicName - Filter by plugin topic name
     * @param {number} options.status - Filter by plugin status
     * @param {number} options.userId - Filter by associated user identifier. Only admin can see other users' plugins
     */
    constructor({ name, namePattern, topicName, status, userId } = {}) {
        super();

        this.name = name;
        this.namePattern = namePattern;
        this.topicName = topicName;
        this.status = status;
        this.userId = userId;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get namePattern() {
        return this._namePattern;
    }

    set namePattern(value) {
        this._namePattern = value;
    }

    get topicName() {
        return this._topicName;
    }

    set topicName(value) {
        this._topicName = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get userId() {
        return this._userId;
    }

    set userId(value) {
        this._userId = value;
    }

    /**
     * Returns instance as a plain JS object
     * @returns {Object}
     */
    toObject() {
        return {
            name: this.name,
            namePattern: this.namePattern,
            topicName: this.topicName,
            status: this.status,
            userId: this.userId
        }
    }
}


module.exports = PluginCountQuery;