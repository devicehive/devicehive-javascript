
/**
 * Network Count Query model
 */
class NetworkCountQuery {
    
    /**
     * Creates Network Count Query model
     * @param {object} options - Options for instance
     * @param {string} options.name - Filter by device type name
     * @param {string} options.namePattern - Filter by device type name pattern. In pattern wildcards '%' and '_' can be used
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


module.exports = NetworkCountQuery;