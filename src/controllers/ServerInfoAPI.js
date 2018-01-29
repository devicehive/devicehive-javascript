const API = require('./API');


/**
 *
 */
class InfoAPI extends API {

    /**
     * Get server info
     */
    getServerInfo() {
        return this.strategy.send(API.getServerInfo);
    }

    /**
     * Get cluster info
     */
    getClusterInfo() {
        return this.strategy.send(API.getClusterInfo);
    }
}


module.exports = InfoAPI;