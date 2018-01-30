
/**
 *
 */
class Utils {

    /**
     *
     */
    static isObjectEmpty(obj) {
        return obj && obj.constructor === Object && Object.keys(obj).length === 0;
    }
}


module.exports = Utils;