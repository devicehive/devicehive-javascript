'use strict';

// Requirements

const APIStrategy = require('./apiStrategy');


//Source

class DeviceHive extends APIStrategy {

    /**
     * DeviceHive module
     */
    constructor({ accessToken, refreshToken, login, password, mainServiceURL, authServiceURL, pluginServiceURL }) {

        // APIStrategy
        super({ mainServiceURL, authServiceURL, pluginServiceURL });

        // Credentials
        this.login = login;
        this.password = password;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;

        this.info = {
            get: () => {
                return this.send({
                    endpoint: '/info',
                    authorize: false
                });
            }
        }
    }
}

// Exports

module.exports = DeviceHive;