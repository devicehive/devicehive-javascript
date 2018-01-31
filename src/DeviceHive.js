const EventEmitter = require('events');
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

const CommandPollQuery = require(`./models/query/CommandPollQuery`);

/**
 *
 */
class DeviceHive extends EventEmitter {

    static get models() {
        return {
            CommandPollQuery: CommandPollQuery
        };
    }

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
        super();

        const me = this;

        me.credentials = new Token({
            accessToken,
            refreshToken,
            login,
            password
        });

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

        // this.strategy.on('message', message => {
        //     console.log(message);
        // });

        me.strategy.on(`message`, (message) => me.emit(`message`, message));
    }

    /**
     * Connect and authorize
     */
    async connect() {
        const me = this;

        if (me.credentials.accessToken) {
            await me.strategy.initTransport();
            await me.strategy.authorize(me.credentials.accessToken);
            await me.strategy.authTransport(me.credentials);
        } else if (me.credentials.refreshToken) {
            await me.strategy.initTransport();
            const accessToken = await me.token.refresh(me.credentials.refreshToken);
            await me.strategy.authorize(accessToken);
            await me.strategy.authTransport(me.credentials);
        } else if (me.credentials.login && me.credentials.password) {
            await me.strategy.initTransport();
            const { accessToken } = await me.token.login(me.credentials.login, me.credentials.password);
            await me.strategy.authorize(accessToken);
            await me.strategy.authTransport(me.credentials);
        } else {
            throw 'No auth credentials';
        }

        return me;
    }
}


module.exports = DeviceHive;