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

        me.accessToken = accessToken;
        me.refreshToken = refreshToken;
        me.login = login;
        me.password = password;

        me.strategy = new APIStrategy({ mainServiceURL, authServiceURL, pluginServiceURL });

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

        if (me.accessToken) {
            await me.strategy.authorize(me.accessToken);
        } else if (me.refreshToken) {
            const accessToken = await me.token.refresh(me.refreshToken);
            await me.strategy.authorize(accessToken);
        } else if (me.login && me.password) {
            const { accessToken } = await me.token.login(me.login, me.password);
            await me.strategy.authorize(accessToken);
        } else {
            throw 'No auth credentials';
        }

        return me;
    }
}


module.exports = DeviceHive;