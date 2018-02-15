const API = require('./API');
const ApiMap = require(`./transportResolvers/ApiMap`);


/**
 * Returns information about the current configuration
 */
class ConfigurationAPI extends API {

    /**
     * Creates ConfigurationAPI
     * @param {number} name
     * @returns {Promise} selected configuration
     */
    get(name) {
        return this.send(ApiMap.getConfiguration, { name: name });
    }

    /**
     * Updates a configuration
     * @param {Configuration} configuration
     * @returns {Promise} count of configuration
     */
    put(configuration) {
        return this.send(ApiMap.putConfiguration, configuration.toObject(), configuration.toObject()); // TODO
    }

    /**
     * Deletes an existing configuration
     * @param {number} name
     * @returns {Promise}
     */
    delete(name) {
        return this.send(ApiMap.deleteConfiguration, { name: name });
    }
}


module.exports = ConfigurationAPI;