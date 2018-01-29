const API = require('./API');


/**
 *
 */
class ConfigurationAPI extends API {

    /**
     * Returns information about the current configuration
     * @param {number} name
     * @returns {Promise} selected configuration
     */
    get(name) {
        return this.send(API.getConfiguration, { name: name });
    }

    /**
     * Updates a configuration
     * @param {Configuration} configuration
     * @returns {Promise} count of configuration
     */
    put(configuration) {
        return this.send(API.putConfiguration, { name: configuration.name, value: configuration.value });
    }

    /**
     * Deletes an existing configuration
     * @param {number} name
     * @returns {Promise}
     */
    delete(name) {
        return this.send(API.deleteConfiguration, { name: name });
    }
}


module.exports = ConfigurationAPI;