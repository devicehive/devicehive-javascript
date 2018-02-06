
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
     * TODO (try to find another soultion)
     * Returns a twenty-character random string
     * @return {string} - Twenty-character random string
     */
    static randomString() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}


module.exports = Utils;