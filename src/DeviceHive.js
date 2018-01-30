const APIStrategy = require('./ApiStrategy');
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
     * DeviceHive module
     */
    constructor({ accessToken, refreshToken, login, password, mainServiceURL, authServiceURL, pluginServiceURL }) {
        const me = this;

        me.strategy = new APIStrategy({ mainServiceURL, authServiceURL, pluginServiceURL });

        me.info = new InfoAPI({ strategy: me.strategy });
        me.device = new DeviceAPI({ strategy: me.strategy });
        me.token = new TokenAPI({ strategy: me.strategy });
        me.network = new NetworkAPI({ strategy: me.strategy });
        me.deviceType = new DeviceTypeAPI({ strategy: me.strategy });
        me.configuration = new ConfigurationAPI({ strategy: me.strategy });
        me.command = new CommandAPI({ strategy: me.strategy });
        me.notification = new NotificationAPI({ strategy: me.strategy });
        me.user = new UserAPI({ strategy: me.strategy });

        me.strategy.on(`message`, (message) => {
            console.log(message);
        });
    }

    /**
     * Connect and authorize
     */
    connect() {
        const promise = new Promise((resolve, reject) => {
            if (this.credentials.refreshToken) {

                if (this.credentials.accessToken) {
                    this.initTransport()
                        .then(() => this.token.refresh(this.credentials))
                        .then(({ accessToken }) => {
                            this.credentials.accessToken = accessToken;
                        })
                        .then(() => this.authTransport(this.credentials))
                        .then(() => resolve(this))
                        .catch(reject);
                } else {

                    this.initTransport()
                        .then(() => this.authTransport(this.credentials))
                        .then(() => resolve(this))
                        .catch(reject);
                }
            } else if (this.credentials.login && this.credentials.password) {

                this.initTransport()
                    .then(() => this.token.login(this.credentials))
                    .then(({ accessToken, refreshToken }) => {
                        this.credentials.accessToken = accessToken;
                        this.credentials.refreshToken = refreshToken;
                    })
                    .then(() => this.authTransport(this.credentials))
                    .then(() => resolve(this))
                    .catch(reject);
            }
            
        });

        return promise;
    }
}


module.exports = DeviceHive;