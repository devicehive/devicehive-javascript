const BaseModel = require(`../BaseModel`);


/**
 * NetworkListQuery class
 */
class NetworkListQuery extends BaseModel {

    /**
     * Creates new NetworkListQuery model
     * @param {object} options - model options object
     * @param {string} options.name - Filter by device type name
     * @param {string} options.namePattern - Filter by device type name pattern. In pattern wildcards '%' and '_' can be used
     * @param {string} options.sortField - Result list sort field
     * @param {string} options.sortOrder - Result list sort order. The sortField should be specified
     * @param {number} options.take - Number of records to take from the result list
     * @param {number} options.skip - Number of records to skip from the result list
     */
    constructor({ name, namePattern, sortField, sortOrder, take, skip } = {}) {
        super();

        this.name = name;
        this.namePattern = namePattern;
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
     * Returns instance as a plain JS object
     * @returns {Object}
     */
    toObject() {
        return {
            name: this.name,
            namePattern: this.namePattern,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            take: this.take,
            skip: this.skip
        }
    }
}


module.exports = NetworkListQuery;