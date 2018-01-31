const API = require('./API');
const ApiMap = require(`./transportResolvers/ApiMap`);


/**
 *
 */
class NetworkAPI extends API {

    /**
     * Returns information about the current network
     * @param {number} networkId
     * @returns {Promise} selected network
     */
    get(networkId) {
        return this.send(ApiMap.getNetwork, { networkId: networkId });
    }

    /**
     * Return a list of networks
     * @param {NetworkListQuery} networkListQuery
     * @returns {Promise} list of networks
     */
    list(networkListQuery) {
        return this.send(ApiMap.listNetwork, networkListQuery.toObject());
    }

    /**
     * Returns count of networks
     * @param {NetworkCountQuery} networkCountQuery
     * @returns {Promise} count of networks
     */
    count(networkCountQuery) {
        return this.send(ApiMap.countNetwork, networkCountQuery.toObject());
    }

    /**
     * Registers a network
     * @param {Network} network data
     * @returns {Promise} count of networks
     */
    insert(network) {
        return this.send(ApiMap.addNetwork, {}, network.toObject());
    }

    /**
     * Updates a network
     * @param {number} networkId
     * @param {Network} network data
     * @returns {Promise} count of networks
     */
    update(network) {
        return this.send(ApiMap.updateNetwork, { networkId: network.id }, network.toObject());
    }

    /**
     * Deletes an existing network
     * @param {number} networkId
     * @returns {Promise}
     */
    delete(networkId) {
        return this.send(ApiMap.deleteNetwork, { networkId: networkId });
    }
}


module.exports = NetworkAPI;