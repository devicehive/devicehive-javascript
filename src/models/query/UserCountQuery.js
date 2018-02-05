
/**
 * User Count Query model
 */
class UserCountQuery {
    
    /**
     * Creates User Count Query
     * @param {object} options - Options for instance
     * @param {string} login - Filter by user login
     * @param {string} loginPattern - Filter by user login pattern
     * @param {number} role - Filter by user login patter
     * @param {number} status - Filter by user status. 0 is Active, 1 is Locked Out, 2 is Disabled
     * 
     */
    constructor({ login, loginPattern, role, status } = {}) {
        const me = this;

        me.login = login;
        me.loginPattern = loginPattern;
        me.role = role;
        me.status = status;
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
            status: me.status
        }
    }
}


module.exports = UserCountQuery;