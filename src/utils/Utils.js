const jwt = require(`jsonwebtoken`);
const UserToken = require(`../models/UserToken`);


/**
 * Utils
 */
class Utils {

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

    static createUserTokenFromJWT(jwtToken) {
        const tokenPayload = jwt.decode(jwtToken).payload;

        return new UserToken({
            userId: tokenPayload.u,
            actions: tokenPayload.a,
            networkIds: tokenPayload.n,
            deviceTypeIds: tokenPayload.dt,
            expiration: tokenPayload.e
        });
    }
}


module.exports = Utils;