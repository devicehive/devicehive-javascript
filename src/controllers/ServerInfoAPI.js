const API = require('./API');
const ApiMap = require(`./transportResolvers/ApiMap`);


/**
 *
 */
class InfoAPI extends API {

    /**
     * Get server info
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