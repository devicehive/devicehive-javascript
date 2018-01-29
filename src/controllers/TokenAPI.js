const API = require('./API');


/**
 *
 */
class TokenAPI extends API {

    /**
     * Authentificate using login and password
     * @param {string} login
     * @param {string} password
     */
    login(login, password) {
        return this.send(API.login, { login: login, password: password });
    }

    /**
     * Create token
     * @param {Token} token
     */
    create(token) {
        return this.send(API.createUserToken, {}, token);
    }

    /**
     * Refresg token
     * @param {string} refreshToken
     */
    refresh(refreshToken) {
        return this.send(API.refreshToken, {}, refreshToken); //TODO
    }
}


module.exports = TokenAPI;