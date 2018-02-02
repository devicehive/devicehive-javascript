const API = require('./API');
const ApiMap = require(`./transportResolvers/ApiMap`);


/**
 * Get server info
 */
class InfoAPI extends API {

    /**
     * Creates InfoAPI
     */
    getServerInfo() {
        return this.strategy.send(ApiMap.getServerInfo);
    }

    /**
     * Get cache info
     */
    getCacheInfo() {
        return this.strategy.send(ApiMap.getCacheInfo);
    }

    /**
     * Get cluster info
     */
    getClusterInfo() {
        return this.strategy.send(ApiMap.getClusterInfo);
    }
}


module.exports = InfoAPI;