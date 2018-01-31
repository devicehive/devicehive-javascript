
/**
 *
 */
class CommandListQuery {

    /**
     *
     */
    constructor({ deviceId, start, end, command, status, sortField, sortOrder, take, skip }) {
        const me = this;

        me.deviceId = deviceId;
        me.start = start;
        me.end = end;
        me.command = command;
        me.status = status;
        me.sortField = sortField;
        me.sortOrder = sortOrder;
        me.take = take;
        me.skip = skip;
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
            command: me.command,
            status: me.status,
            sortField: me.sortField,
            sortOrder: me.sortOrder,
            take: me.take,
            skip: me.skip
        }
    }
}


module.exports = CommandListQuery;