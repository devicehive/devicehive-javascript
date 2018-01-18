// Model

class User {

    /**
     * User model
     * @param {object} options ({ id, login, role, status, lastLogin, data, password, introReviewed, allDeviceTypesAvailable })
     */
    constructor({ id, login, role, status, lastLogin, data, password, introReviewed, allDeviceTypesAvailable }) {
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

    /**
     * @returns {number} id;
     */
    get id() {
        return this.id;
    }

    /**
    * @param {number} value;
    * @returns {number} id;
    */
    set id(value) {
        return this.id = value;
    }

    /**
     * @returns {string} name;
     */
    get name() {
        return this.name;
    }

    /**
     * @param {string} value;
     * @returns {string} name;
     */
    set name(value) {
        return this.name = value;
    }

    /**
     * @returns {string} login;
     */
    get login() {
        return this.login;
    }

    /**
     * @param {string} value;
     * @returns {string} login;
     */
    set login(value) {
        return this.login = value;
    }

    /**
     * @returns {numner} role;
     */
    get role() {
        return this.role;
    }

    /**
     * @param {numner} value;
     * @returns {numner} role;
     */
    set role(value) {
        return this.role = value;
    }

    /**
     * @returns {numner} status;
     */
    get status() {
        return this.status;
    }

    /**
     * @param {numner} value;
     * @returns {numner} status;
     */
    set status(value) {
        return this.status = value;
    }

    /**
     * @returns {string} lastLogin;
     */
    get lastLogin() {
        return this.lastLogin;
    }

    /**
     * @param {string} value;
     * @returns {string} lastLogin;
     */
    set lastLogin(value) {
        return this.lastLogin = value;
    }

    /**
     * @returns {object} data;
     */
    get data() {
        return this.data;
    }

    /**
     * @param {object} value;
     * @returns {object} data;
     */
    set data(value) {
        return this.data = value;
    }

    /**
     * @returns {string} password;
     */
    get password() {
        return this.password;
    }

    /**
     * @param {string} value;
     * @returns {string} password;
     */
    set password(value) {
        return this.password = value;
    }

    /**
     * @returns {boolean} introReviewed;
     */
    get introReviewed() {
        return this.introReviewed;
    }

    /**
     * @param {boolean} value;
     * @returns {boolean} introReviewed;
     */
    set introReviewed(value) {
        return this.introReviewed = value;
    }

    /**
     * @returns {boolean} introReviewed;
     */
    get allDeviceTypesAvailable() {
        return this.allDeviceTypesAvailable;
    }

    /**
     * @param {boolean} value;
     * @returns {boolean} allDeviceTypesAvailable;
     */
    set allDeviceTypesAvailable(value) {
        return this.allDeviceTypesAvailable = value;
    }

    /**
     * Returns a copy of instance
     * @returns {object} A copy of instance
     */
    toObject() {
        return Object.assign({}, this);
    }

    /**
     * Returns a stringified instance
     * @returns {object} A stringified instance
     */
    toString() {
        JSON.stringify(this);
    }
}


// Exports

module.exports = User;