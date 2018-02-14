/**
 * BaseModel class
 */
class BaseModel {

    /**
     * Returns instance as a plain JS object
     * @returns {Object}
     */
    toObject() {
        console.warn(`The method "toObject" should be implemented in nested classes`);

        return {};
    }

    /**
     * Returns a stringified instance
     * @returns {string}
     */
    toString() {
        return JSON.stringify(this.toObject());
    }
}


module.exports = BaseModel;