const APIStrategy = require('./ApiStrategy');

const Configuration = require('./models/Configuration');
const Device = require('./models/Device');
const DeviceType = require('./models/DeviceType');
const Command = require('./models/Command');
const Notification = require('./models/Notification');
const Network = require('./models/Network');
const Token = require('./models/Token');
const User = require('./models/User');

const InfoAPI = require('./controllers/ServerInfoAPI');
const DeviceAPI = require('./controllers/DeviceAPI');
const DeviceTypeAPI = require('./controllers/DeviceTypeAPI');
const TokenAPI = require('./controllers/TokenAPI');
const NetworkAPI = require('./controllers/NetworkAPI');
const ConfigurationAPI = require('./controllers/ConfigurationAPI');
const CommandAPI = require('./controllers/DeviceCommandAPI');
const NotificationAPI = require('./controllers/DeviceNotificationAPI');
const UserAPI = require('./controllers/UserAPI');


/**
 *
 */
class DeviceHive {

    /**
     * Returns an model of DeviceHive
     * 
     * @param {String} name (Configuration | Device | Command | Notification | Network | Token | User)
     * @return {Object} Entity 
     */
    static model(name) {
        // Entities
        const models = {
            Configuration,
            Device,
            DeviceType,
            Command,
            Notification,
            Network,
            Token,
            User
        };
        const model = models[name];

        if (!model) {
            throw new Error('no such model');
        }
        return model;
    }

    /**
     * DeviceHive module
     */
    constructor({ accessToken, refreshToken, login, password, mainServiceURL, authServiceURL, pluginServiceURL }) {
        this.strategy = new APIStrategy({ mainServiceURL, authServiceURL, pluginServiceURL });

        this.info = new InfoAPI({ strategy: this.strategy });
        this.device = new DeviceAPI({ strategy: this.strategy });
        this.token = new TokenAPI({ strategy: this.strategy });
        this.network = new NetworkAPI({ strategy: this.strategy });
        this.deviceType = new DeviceTypeAPI({ strategy: this.strategy });
        this.configuration = new ConfigurationAPI({ strategy: this.strategy });
        this.command = new CommandAPI({ strategy: this.strategy });
        this.notification = new NotificationAPI({ strategy: this.strategy });
        this.user = new UserAPI({ strategy: this.strategy });

        // this.strategy.on('message', message => {
        //     console.log(message);
        // });

        // Credentials
        this.credentials = new Token({
            login,
            password,
            accessToken,
            refreshToken
        });

    }

    /**
     * Connect and authorize
     */
    connect() {
        const promise = new Promise((resolve, reject) => {
            if (this.credentials.refreshToken) {
        
                if (this.credentials.accessToken) {
                    this.strategy.initTransport()
                        .then(() => this.token.refresh(this.credentials))
                        .then(({ accessToken }) => {
                            this.credentials.accessToken = accessToken;
                        })
                        .then(() => this.strategy.authTransport(this.credentials))
                        .then(() => resolve(this))
                        .catch(reject);
                } else {

                    this.initTransport()
                        .then(() => this.strategy.authTransport(this.credentials))
                        .then(() => resolve(this))
                        .catch(reject);
                }
            } else if (this.credentials.login && this.credentials.password) {
        
                this.strategy.initTransport()
                    .then(() => this.token.login(this.credentials))
                    .then(({ accessToken, refreshToken }) => {
                        this.credentials.accessToken = accessToken;
                        this.credentials.refreshToken = refreshToken;
                    })
                    .then(() => this.strategy.authTransport(this.credentials))
                    .then(() => resolve(this))
                    .catch(reject);
            }
        
        });
        
        return promise;
    }
}


module.exports = DeviceHive;