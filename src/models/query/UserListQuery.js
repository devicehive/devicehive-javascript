
/**
 *
 */
class UserListQuery {

    /**
     *
     */
    constructor({ login, loginPattern, role, status, sortField, sortOrder, take, skip }) {
        const me = this;

        me.login = login;
        me.loginPattern = loginPattern;
        me.role = role;
        me.status = status;
        me.sortField = sortField;
        me.sortOrder = sortOrder;
        me.take = take;
        me.skip = skip;
    }

    get login() {
        return this._login;
    }

    set login(value) {
        this._login = value;
    }

    get loginPattern() {
        return this._loginPattern;
    }

    set loginPattern(value) {
        this._loginPattern = value;
    }

    get role() {
        return this._role;
    }

    set role(value) {
        this._role = value;
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
            login: me.login,
            loginPattern: me.loginPattern,
            role: me.role,
            status: me.status,
            sortField: me.sortField,
            sortOrder: me.sortOrder,
            take: me.take,
            skip: me.skip
        }
    }
}


module.exports = UserListQuery;