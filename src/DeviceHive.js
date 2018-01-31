const EventEmitter = require('events');
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

        me.info = new InfoAPI({ strategy: me.strategy });
        me.device = new DeviceAPI({ strategy: me.strategy });
        me.token = new TokenAPI({ strategy: me.strategy });
        me.network = new NetworkAPI({ strategy: me.strategy });
        me.deviceType = new DeviceTypeAPI({ strategy: me.strategy });
        me.configuration = new ConfigurationAPI({ strategy: me.strategy });
        me.command = new CommandAPI({ strategy: me.strategy });
        me.notification = new NotificationAPI({ strategy: me.strategy });
        me.user = new UserAPI({ strategy: me.strategy });

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