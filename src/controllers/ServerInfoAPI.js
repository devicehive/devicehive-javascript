const API = require('./API');
const ApiMap = require(`./transportResolvers/ApiMap`);


/**
 * Get server info
 */
class InfoAPI extends API {

    /**
     * Get server info
     * @returns {Promise}
     */
    getServerInfo() {
        return this.send(ApiMap.getServerInfo);
    }

    /**
     * Get cache info
     * @returns {Promise}
     */
    getCacheInfo() {
        return this.send(ApiMap.getCacheInfo);
    }

    /**
     * Get cluster info
     * @returns {Promise}
     */
    getClusterInfo() {
        return this.send(ApiMap.getClusterInfo);
    }
}


module.exports = InfoAPI;