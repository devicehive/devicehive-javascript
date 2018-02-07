const API = require('./API');
const ApiMap = require(`./transportResolvers/ApiMap`);
const PluginCountQuery = require('../models/query/PluginCountQuery');
const PluginListQuery = require('../models/query/PluginListQuery');
const PluginRegisterQuery = require('../models/query/PluginRegisterQuery');


/**
 * Returns information about the current plugin
 */
class PluginAPI extends API {

    /**
     * Return a list of plugins
     * @param {PluginListQuery} pluginListQuery
     * @returns {Promise} list of plugins
     */
    list(pluginListQuery = new PluginListQuery()) {
        return this.send(ApiMap.listPlugin, pluginListQuery.toObject());
    }

    /**
     * Returns count of plugins
     * @param {PluginCountQuery} pluginCountQuery
     * @returns {Promise} count of plugins
     */
    count(pluginCountQuery = new PluginCountQuery()) {
        return this.send(ApiMap.countPlugin, pluginCountQuery.toObject());
    }

    /**
     * Registers a plugin
     * @param {Plugin} plugin
     * @param {PluginRegisterQuery} pluginRegisterQuery
     * @returns {Promise} Plugin
     */
    insert(plugin, pluginRegisterQuery = new PluginRegisterQuery()) {
        return this.send(ApiMap.registerPlugin, pluginRegisterQuery.toObject(), plugin.toObject());
    }

    /**
     * Updates a plugin
     * @param {Promise} plugin
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
    delete(plugin) {
        return this.send(ApiMap.deletePlugin, { pluginId: plugin.pluginId });
    }
}


module.exports = PluginAPI;