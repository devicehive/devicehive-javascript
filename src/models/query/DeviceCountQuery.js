
/**
 *
 */
class DeviceListQuery {
    
    /**
     *
     */
    constructor() {
        const me = this;

        me.name = name;
        me.namePattern = name;
        me.networkId = name;
        me.networkName = name;
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


module.exports = DeviceListQuery;