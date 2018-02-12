const BaseModel = require(`../BaseModel`);


/**
 * UserCountQuery class
 */
class UserCountQuery extends BaseModel {
    
    /**
     * Creates new UserCountQuery model
     * @param {object} options - model options object
     * @param {string} login - Filter by user login
     * @param {string} loginPattern - Filter by user login pattern
     * @param {number} role - Filter by user login patter
     * @param {number} status - Filter by user status. 0 is Active, 1 is Locked Out, 2 is Disabled
     * 
     */
    constructor({ login, loginPattern, role, status } = {}) {
        super();

        this.login = login;
        this.loginPattern = loginPattern;
        this.role = role;
        this.status = status;
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
     * Returns instance as a plain JS object
     * @returns {Object}
     */
    toObject() {
        return {
            login: this.login,
            loginPattern: this.loginPattern,
            role: this.role,
            status: this.status
        }
    }
}


module.exports = UserCountQuery;