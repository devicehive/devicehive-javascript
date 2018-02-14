const BaseModel = require(`../BaseModel`);


/**
 * CommandListQuery class
 */
class CommandListQuery extends BaseModel {

    /**
     * Creates new CommandListQuery model
     * @param {object} options - model options object
     * @param {string} options.deviceId - Device ID
     * @param {string} options.start - Start timestamp
     * @param {string} options.end - End timestamp
     * @param {string} options.command - Command name
     * @param {string} options.status - Command status
     * @param {string} options.sortField - Sort field
     * @param {string} options.sortOrder - Sort order
     * @param {number} options.take - Limit param
     * @param {number} options.skip - Skip param
     */
    constructor({ deviceId, start, end, command, status, sortField, sortOrder, take, skip } = {}) {
        super();

        this.deviceId = deviceId;
        this.start = start;
        this.end = end;
        this.command = command;
        this.status = status;
        this.sortField = sortField;
        this.sortOrder = sortOrder;
        this.take = take;
        this.skip = skip;
    }

    get deviceId() {
        return this._deviceId;
    }

    set deviceId(value) {
        this._deviceId = value;
    }

    get start() {
        return this._start;
    }

    set start(value) {
        this._start = value;
    }

    get end() {
        return this._end;
    }

    set end(value) {
        this._end = value;
    }

    get command() {
        return this._command;
    }

    set command(value) {
        this._command = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
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
            deviceId: this.deviceId,
            start: this.start,
            end: this.end,
            command: this.command,
            status: this.status,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            take: this.take,
            skip: this.skip
        }
    }
}


module.exports = CommandListQuery;