const API = require('./API');
const ApiMap = require(`./transportResolvers/ApiMap`);


/**
 * Returns information about the current plugin
 */
class PluginAPI extends API {

    /**
     * Registers a plugin
     * @param {Plugin} plugin
     * @param {PluginRegisterQuery} pluginRegisterQuery
     * @returns {Promise} Plugin
     */
    insert(plugin, pluginRegisterQuery) {
        return this.send(ApiMap.registerPlugin, pluginRegisterQuery.toObject(), plugin.toObject());
    }

    /**
     * Updates a plugin
     * @param {PluginUpdateQuery} pluginupdatequery
     * @returns {Promise} Plugin
     */
    update(plugin) {
        return this.send(ApiMap.updatePlugin, plugin.toObject());
    }

    /**
     * Deletes an existing plugin
     * @param {object} Plugin
     * @returns {Promise} Plugin
     */
    delete({pluginId}) {
        return this.send(ApiMap.deletePlugin, { pluginId });
    }
}


module.exports = PluginAPI;