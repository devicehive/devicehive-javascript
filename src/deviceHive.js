'use strict';

// Requirements

const APIStrategy = require('./APIStrategy');

const Device = require('./models/Device');
const DeviceCommand = require('./models/DeviceCommand');
const DeviceNotification = require('./models/DeviceNotification');
const Network = require('./models/Network');
const Token = require('./models/Token');
const User = require('./models/User');

const InfoAPI = require('./controllers/InfoAPI');
const DeviceAPI = require('./controllers/DeviceAPI');
const TokenAPI = require('./controllers/TokenAPI');

//Source

class DeviceHive extends APIStrategy {

    /**
     * DeviceHive module
     */
    constructor({ accessToken, refreshToken, login, password, mainServiceURL, authServiceURL, pluginServiceURL }) {

        // APIStrategy
        super({ mainServiceURL, authServiceURL, pluginServiceURL });

        // Credentials
        this.credentials = new Token({
            login,
            password,
            accessToken,
            refreshToken
        });

        // Entities
        this._entities = {
            Device,
            DeviceCommand,
            DeviceNotification,
            Network,
            Token,
            User
        };

        // API`s
        this.info = new InfoAPI(this.send.bind(this));
        this.device = new DeviceAPI(this.send.bind(this));
        this.token = new TokenAPI(this.send.bind(this));
    }

    /**
     * Returns an model of DeviceHive
     * 
     * @param {String} name (Device | DeviceCommand | DeviceNotification | Network | Token | User)
     * @return {Object} Entity 
     */
    static model() {
        const model = this._entities[name];

        if (!model) {
            throw new Error('no such model');
        }
        return this._entities[name];
    }

    /**
     * Connect and authorize
     */
    connect() {
        const promise = new Promise((resolve, reject) => {
            this.token.create(this.credentials)
                .then(({ accessToken, refreshToken }) => {
                    this.token.accessToken = accessToken;
                    this.token.refreshToken = refreshToken;
                    return resolve(this);
                })
                .catch(reject);
        });

        return promise;
    }
}

// Exports

module.exports = DeviceHive;