const API = require('./API');
const ApiMap = require(`./transportResolvers/ApiMap`);


/**
 * Authenticate using login and password
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
    createUserToken(userToken) {
        return this.send(ApiMap.createUserToken, {}, userToken.toObject());
    }

    /**
     * Create plugin token
     * @param {PluginToken} pluginToken
     */
    createPluginToken(pluginToken) {
        return this.send(ApiMap.createPluginToken, {}, pluginToken.toObject());
    }

    /**
     * Refresh token
     * @param {string} refreshToken
     */
    refresh(refreshToken) {
        return this.send(ApiMap.refreshToken, {}, { refreshToken: refreshToken });
    }
}


module.exports = TokenAPI;