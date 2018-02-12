/**
 * User model
 */
class User {

    /**
     * Creates User model
     * @param {Object} options ({
     *      id,
     *      login,
     *      role,
     *      status,
     *      lastLogin,
     *      data,
     *      password,
     *      introReviewed,
     *      allDeviceTypesAvailable
     * })
     */
    constructor({ id, login, role, status, lastLogin, data, password, introReviewed, allDeviceTypesAvailable } = {}) {
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
     * Returns a copy of instance
     * @returns {object} A copy of instance
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

    /**
     * Returns a stringified instance
     * @returns {string} A stringified instance
     */
    toString() {
        JSON.stringify(this.toObject());
    }
}


module.exports = User;