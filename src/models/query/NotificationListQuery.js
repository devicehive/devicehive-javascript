
/**
 *
 */
class NotificationListQuery {

    /**
     *
     */
    constructor({ deviceId, start, end, command, status, sortField, sortOrder, take, skip }) {
        const me = this;

        me.deviceId = deviceId;
        me.start = start;
        me.end = end;
        me.notification = command;
        me.status = status;
        me.sortField = sortField;
        me.sortOrder = sortOrder;
        me.take = take;
        me.skip = skip;
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

    get notification() {
        return this._notification;
    }

    set notification(value) {
        this._notification = value;
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
     *
     * @returns {Object}
     */
    toObject() {
        const me = this;

        return {
            deviceId: me.deviceId,
            start: me.start,
            end: me.end,
            notification: me.notification,
            status: me.status,
            sortField: me.sortField,
            sortOrder: me.sortOrder,
            take: me.take,
            skip: me.skip
        }
    }
}


module.exports = NotificationListQuery;