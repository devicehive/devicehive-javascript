const API = require('./API');
const ApiMap = require(`./transportResolvers/ApiMap`);
const PluginCountQuery = require('../models/query/PluginCountQuery');
const PluginListQuery = require('../models/query/PluginListQuery');
const PluginRegisterQuery = require('../models/query/PluginRegisterQuery');
const PluginUpdateQuery = require('../models/query/PluginUpdateQuery');


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
    register(plugin, pluginRegisterQuery = new PluginRegisterQuery()) {
        const pluginBody = {
            name: plugin.name,
            description: plugin.description,
            parameters: plugin.parameters
        };

        return this.send(ApiMap.registerPlugin, pluginRegisterQuery.toObject(), pluginBody);
    }

    /**
     * Updates a plugin
     * @param {PluginUpdateQuery} PluginUpdateQuery
     * @returns {Promise} Plugin
     */
    update(pluginUpdateQuery = new PluginUpdateQuery()) {
        return this.send(ApiMap.updatePlugin, pluginUpdateQuery.toObject());
    }

    /**
     * Deletes an existing plugin
     * @param {string} topicName
     * @returns {Promise} Plugin
     */
    delete(topicName) {
        return this.send(ApiMap.deletePlugin, { topicName });
    }
}


module.exports = PluginAPI;