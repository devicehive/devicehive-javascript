const jwtDecode = require(`jwt-decode`);
const UserToken = require(`../models/UserToken`);


/**
 * Utils
 */
class Utils {

    static get TOKEN_EXPIRED_MARK() { return `Token expired`; }

    /**
     * Checks that object is empty
     * @returns {boolean} - Is object empty
     */
    static isObjectEmpty(obj) {
        return obj && obj.constructor === Object && Object.keys(obj).length === 0;
    }

    /**
     * Returns a twenty-character random string
     * @return {string} - Twenty-character random string
     */
    static randomString() {
        const firstPart = Math.random()
            .toString(36)
            .substring(2, 15);
        const secondPart = Math.random()
            .toString(36)
            .substring(2, 15);

        return `${firstPart}${secondPart}`;
    }

    /**
     * Creates UserToken from jwt
     * @param jwtToken
     * @returns {UserToken}
     */
    static createUserTokenFromJWT(jwtToken) {
        const tokenPayload = jwtDecode(jwtToken).payload;

        return new UserToken({
            userId: tokenPayload.u,
            actions: tokenPayload.a,
            networkIds: tokenPayload.n,
            deviceTypeIds: tokenPayload.dt
        });
    }

    /**
     * Checks for value is not undefined and not null
     * @param value
     * @returns {boolean}
     */
    static isDefined(value) {
        return !(typeof value === 'undefined' || value === null);
    }

    /**
     * Empty function
     */
    static emptyFn() {}

    /**
     * Returns latest timestamp
     * @param ts1
     * @param ts2
     * @returns {*}
     */
    static getLatestTimestamp(ts1, ts2) {
        if (!ts1) { return ts2; }
        else if (!ts2) { return ts1; }

        return new Date(ts1).getTime() > new Date(ts2).getTime() ? ts1 : ts2;
    }
}


module.exports = Utils;