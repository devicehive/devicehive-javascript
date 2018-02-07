const API = require('./API');
const ApiMap = require(`./transportResolvers/ApiMap`);


/**
 * Authentificate using login and password
 */
class TokenAPI extends API {

    /**
     * Creates TokenAPI
     * @param {string} login
     * @param {string} password
     */
    login(login, password) {
        return this.send(ApiMap.login, {}, { login, password });
    }

    
    /**
     * Create user token
     * @param {string} token Plugin token
     */
    authPlugin(token) {
        return this.send(ApiMap.authPlugin, {}, { token });
    }

    /**
     * Create user token
     * @param {UserToken} userToken
     */
    createUserToken(token) {
        return this.send(ApiMap.createUserToken, {}, token.toObject());
    }

    /**
     * Create plugin token
     * @param {PluginToken} pluginToken
     */
    createPluginToken(token) {
        return this.send(ApiMap.createPluginToken, {}, token.toObject());
    }

    /**
     * Refresg token
     * @param {string} refreshToken
     */
    refresh(refreshToken) {
        return this.send(ApiMap.refreshToken, {}, refreshToken); // TODO
    }
}


module.exports = TokenAPI;