
/**
 *
 */
class DeviceTypeCountQuery {
    
    /**
     *
     */
    constructor({ name, namePattern }) {
        const me = this;

        me.name = name;
        me.namePattern = namePattern;
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

    /**
     *
     * @returns {Object}
     */
    toObject() {
        const me = this;

        return {
            name: me.name,
            namePattern: me.namePattern
        }
    }
}


module.exports = DeviceTypeCountQuery;