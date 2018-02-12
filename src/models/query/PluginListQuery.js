/**
 * Plugin List Query model
 */
class PluginListQuery {

    /**
     * Creates Plugin List Query model
     * @param {object} options - Options for instance
     * @param {string} options.name - Filter by plugin name
     * @param {string} options.namePattern - Filter by plugin name pattern. In pattern wildcards '%' and '_' can be used
     * @param {string} options.topicName - Filter by plugin topic nathis.
     * @param {string} options.status - Filter by plugin status.
     * @param {number} options.userId - Filter by associated user identifier. Only admin can see other users' plugins
     * @param {string} options.sortField - Result list sort field
     * @param {string} options.sortOrder - Result list sort order. The sortField should be specified
     * @param {number} options.take - Number of records to take from the result list
     * @param {number} options.skip - Number of records to skip from the result list
     */
    constructor({ name, namePattern, topicName, status, userId, sortField, sortOrder, take, skip } = {}) {
        this.name = name;
        this.namePattern = namePattern;
        this.topicName = topicName;
        this.status = status;
        this.userId = userId;
        this.sortField = sortField;
        this.sortOrder = sortOrder;
        this.take = take;
        this.skip = skip;
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

    get sortField() {
        return this._sortField;
    }

    set sortField(value) {
        this._sortField = value;
    }

    get sortOrder() {
        return this._sortOrder;
    }

    set sortOrder(value) {
        this._sortOrder = value;
    }

    get take() {
        return this._take;
    }

    set take(value) {
        this._take = value;
    }

    get skip() {
        return this._skip;
    }

    set skip(value) {
        this._skip = value;
    }

    /**
     *
     * @returns {Object}
     */
    toObject() {
        return {
            name: this.name,
            namePattern: this.namePattern,
            topicName: this.topicName,
            status: this.status,
            userId: this.userId,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            take: this.take,
            skip: this.skip
        }
    }
}


module.exports = PluginListQuery;