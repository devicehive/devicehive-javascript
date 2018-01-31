
/**
 *
 */
class DeviceListQuery {

    /**
     *
     */
    constructor({ name, namePattern, networkId, networkName, sortField, sortOrder, take, skip }) {
        const me = this;

        me.name = name;
        me.namePattern = namePattern;
        me.networkId = networkId;
        me.networkName = networkName;
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

    get networkId() {
        return this._networkId;
    }

    set networkId(value) {
        this._networkId = value;
    }

    get networkName() {
        return this._networkName;
    }

    set networkName(value) {
        this._networkName = value;
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
            networkId: me.networkId,
            networkName: me.networkName,
            sortField: me.sortField,
            sortOrder: me.sortOrder,
            take: me.take,
            skip: me.skip
        }
    }
}


module.exports = DeviceListQuery;