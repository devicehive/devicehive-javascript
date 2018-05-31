const BaseModel = require(`../BaseModel`);


/**
 * CommandGetQuery class
 */
class CommandGetQuery extends BaseModel {

    /**
     * Creates new CommandGetQuery model
     * @param {object} options - model options object
     * @param {boolean} options.returnUpdatedCommands - Checks if updated commands should be returned
     */
    constructor({ returnUpdatedCommands=false } = {}) {
        super();

        this.returnUpdatedCommands = returnUpdatedCommands;
    }

    get returnUpdatedCommands() {
        return this._returnUpdatedCommands;
    }

    set returnUpdatedCommands(value) {
        this._returnUpdatedCommands = value;
    }

    /**
     * Returns instance as a plain JS object
     * @returns {Object}
     */
    toObject() {
        return {
            returnUpdatedCommands: this.returnUpdatedCommands
        }
    }
}


module.exports = CommandGetQuery;