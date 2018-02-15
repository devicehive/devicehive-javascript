const BaseModel = require(`./BaseModel`);


/**
 * User model
 */
class User extends BaseModel {

    /**
     * Creates new User model
     * @param {object} options - model options object
     * @param {numebr} options.id - User identifier
     * @param {string} options.login - User login using during authentication
     * @param {number} options.role - User role. Available values: 0: Administrator role, 1: Client role.
     * @param {number} options.status - User status. Available values: 0: The user is active, 1: The user has been locked out due to invalid login attempts, 2: The user has been disabled
     * @param {string} options.lastLogin User last login timestamp (UTC)
     * @param {object} options.data - User data, a JSON object with an arbitrary structure
     * @param {string} options.password - User Password
     * @param {boolean} options.introReviewed - Indicates if user reviewed an intro
     * @param {boolean} options.allDeviceTypesAvailable - Is all device types awailable
     */
    constructor({ id, login, role, status, lastLogin, data, password, introReviewed, allDeviceTypesAvailable } = {}) {
        super();

        this.id = id;
        this.login = login;
        this.role = role;
        this.status = status;
        this.lastLogin = lastLogin;
        this.data = data;
        this.password = password;
        this.introReviewed = introReviewed;
        this.allDeviceTypesAvailable = allDeviceTypesAvailable;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get login() {
        return this._login;
    }

    set login(value) {
        this._login = value;
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

    get lastLogin() {
        return this._lastLogin;
    }

    set lastLogin(value) {
        this._lastLogin = value;
    }

    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    get introReviewed() {
        return this._introReviewed;
    }

    set introReviewed(value) {
        this._introReviewed = value;
    }

    get allDeviceTypesAvailable() {
        return this._allDeviceTypesAvailable;
    }

    set allDeviceTypesAvailable(value) {
        this._allDeviceTypesAvailable = value;
    }

    /**
     * Returns instance as a plain JS object
     * @returns {Object}
     */
    toObject() {
        return {
            id: this.id,
            login: this.login,
            role: this.role,
            status: this.status,
            lastLogin: this.lastLogin,
            data: this.data,
            password: this.password,
            introReviewed: this.introReviewed,
            allDeviceTypesAvailable: this.allDeviceTypesAvailable
        }
    }
}


module.exports = User;