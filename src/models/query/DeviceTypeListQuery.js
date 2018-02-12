/**
 * Device Type List Query model
 */
class DeviceTypeListQuery {

    /**
     * Creates Device Type List Query model
     * @param {object} options - Options for instance
     * @param {string} options.name - Filter by device type name
     * @param {string} options.namePattern - Filter by device type name pattern. In pattern wildcards '%' and '_' can be used
     * @param {string} options.sortField - Result list sort field
     * @param {string} options.sortOrder - Result list sort order. The sortField should be specified
     * @param {number} options.take - Number of records to take from the result list
     * @param {number} options.skip - Number of records to skip from the result list
     */
    constructor({ name, namePattern, sortField, sortOrder, take, skip } = {}) {
        const me = this;

        me.name = name;
        me.namePattern = namePattern;
        me.sortField = sortField;
        me.sortOrder = sortOrder;
        me.take = take;
        me.skip = skip;
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
     *
     * @returns {Object}
     */
    toObject() {
        const me = this;

        return {
            name: me.name,
            namePattern: me.namePattern,
            sortField: me.sortField,
            sortOrder: me.sortOrder,
            take: me.take,
            skip: me.skip
        }
    }
}


module.exports = DeviceTypeListQuery;