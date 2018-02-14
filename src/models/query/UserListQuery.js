const BaseModel = require(`../BaseModel`);


/**
 * UserListQuery class
 */
class UserListQuery extends BaseModel {

    /**
<<<<<<< HEAD
     * Creates User List Query
     * @param {object} options - Options for instance
     * @param {string} options.login - Filter by user login
     * @param {string} options.loginPattern - Filter by user login pattern
     * @param {number} options.role - Filter by user login patter
     * @param {number} options.status - Filter by user status. 0 is Active, 1 is Locked Out, 2 is Disabled
     * @param {string} options.sortField - Result list sort field
     * @param {string} options.sortOrder - Result list sort order. The sortField should be specified
     * @param {number} options.take - Number of records to take from the result list
     * @param {number} options.skip - Number of records to skip from the result list
=======
     * Creates new UserListQuery model
     * @param {object} options - model options object
     * @param {string} login - Filter by user login
     * @param {string} loginPattern - Filter by user login pattern
     * @param {number} role - Filter by user login patter
     * @param {number} status - Filter by user status. 0 is Active, 1 is Locked Out, 2 is Disabled
     * @param {string} sortField - Result list sort field
     * @param {string} sortOrder - Result list sort order. The sortField should be specified
     * @param {number} take - Number of records to take from the result list
     * @param {number} skip - Number of records to skip from the result list
>>>>>>> 134f4616982a179e7ff79ed99275e52ef24b77e0
     */
    constructor({ login, loginPattern, role, status, sortField, sortOrder, take, skip } = {}) {
        super();

        this.login = login;
        this.loginPattern = loginPattern;
        this.role = role;
        this.status = status;
        this.sortField = sortField;
        this.sortOrder = sortOrder;
        this.take = take;
        this.skip = skip;
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
     * Returns instance as a plain JS object
     * @returns {Object}
     */
    toObject() {
        return {
            login: this.login,
            loginPattern: this.loginPattern,
            role: this.role,
            status: this.status,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            take: this.take,
            skip: this.skip
        }
    }
}


module.exports = UserListQuery;