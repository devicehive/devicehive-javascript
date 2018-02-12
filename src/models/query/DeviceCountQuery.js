/**
 * Device Count Query model
 */
class DeviceCountQuery {

    /**
     * Creates Device Count Query model
     * @param {object} options - Options for instance
     * @param {string} options.name - Filter by device name
     * @param {string} options.namePattern - Filter by device name pattern. In pattern wildcards '%' and '_' can be used
     * @param {number} options.networkId - Filter by associated network identifier
     * @param {string} options.networkName - Filter by associated network name
     */
    constructor({ name, namePattern, networkId, networkName } = {}) {
        const me = this;

        me.name = name;
        me.namePattern = namePattern;
        me.networkId = networkId;
        me.networkName = networkName;
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
            networkName: me.networkName
        }
    }
}


module.exports = DeviceCountQuery;