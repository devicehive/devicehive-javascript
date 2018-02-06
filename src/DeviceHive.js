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
const Command = require(`./models/Command`);
const Configuration = require(`./models/Configuration`);
const Device = require(`./models/Device`);
const DeviceType = require(`./models/DeviceType`);
const Network = require(`./models/Network`);
const Notification = require(`./models/Notification`);
const Token = require(`./models/Token`);
const User = require(`./models/User`);
const CommandListQuery = require(`./models/query/CommandListQuery`);
const CommandPollManyQuery = require(`./models/query/CommandPollManyQuery`);
const CommandPollQuery = require(`./models/query/CommandPollQuery`);
const CommandWaitQuery = require(`./models/query/CommandWaitQuery`);
const DeviceCountQuery = require(`./models/query/DeviceCountQuery`);
const DeviceListQuery = require(`./models/query/DeviceListQuery`);
const DeviceTypeCountQuery = require(`./models/query/DeviceTypeCountQuery`);
const DeviceTypeListQuery = require(`./models/query/DeviceTypeListQuery`);
const NetworkCountQuery = require(`./models/query/NetworkCountQuery`);
const NetworkListQuery = require(`./models/query/NetworkListQuery`);
const NotificationListQuery = require(`./models/query/NotificationListQuery`);
const NotificationPollManyQuery = require(`./models/query/NotificationPollManyQuery`);
const NotificationPollQuery = require(`./models/query/NotificationPollQuery`);
const UserCountQuery = require(`./models/query/UserCountQuery`);
const UserListQuery = require(`./models/query/UserListQuery`);


const NoAuthCredentialsError = require('./error/NoAuthCredentialsError');
const InvalidCredentialsError = require('./error/InvalidCredentialsError');

/**
 * DeviceHive module
 */
class DeviceHive extends EventEmitter {

    /**
     * @type {Object} - Returns DeviceHive models
     */
    static get models() {
        return {
            Command: Command,
            Configuration: Configuration,
            Device: Device,
            DeviceType: DeviceType,
            Network: Network,
            Notification: Notification,
            Token: Token,
            User: User,
            query: {
                CommandListQuery: CommandListQuery,
                CommandPollManyQuery: CommandPollManyQuery,
                CommandPollQuery: CommandPollQuery,
                CommandWaitQuery: CommandWaitQuery,
                DeviceCountQuery: DeviceCountQuery,
                DeviceListQuery: DeviceListQuery,
                DeviceTypeCountQuery: DeviceTypeCountQuery,
                DeviceTypeListQuery: DeviceTypeListQuery,
                NetworkCountQuery: NetworkCountQuery,
                NetworkListQuery: NetworkListQuery,
                NotificationListQuery: NotificationListQuery,
                NotificationPollManyQuery: NotificationPollManyQuery,
                NotificationPollQuery: NotificationPollQuery,
                UserCountQuery: UserCountQuery,
                UserListQuery: UserListQuery
            }
        };
    }

    /**
     * DeviceHive module
     * @param {object} options - Initial settings
     * @param {string} [options.accessToken] - Access token
     * @param {string} [options.refreshToken] - Refresh token
     * @param {string} [options.login] - Login
     * @param {string} [options.password] - Paaword
     * @param {string} options.mainServiceURL - Main Service URL
     * @param {string} [options.authServiceURL] - Auth Service URL (required only for http)
     * @param {string} [options.pluginServiceURL] - Alug inServi ceURL (required only for http)
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

        me.strategy.on(`message`, message => me.emit(`message`, message));
        me.strategy.on(`error`, error => me.emit(`error`, error));
    }

    /**
     * Connect and authorize
     */
    async connect() {
        const me = this;

        if (me.accessToken || me.refreshToken || (me.login && me.password)) {
            try {
                if (me.accessToken) {
                    await me.strategy.authorize(me.accessToken);
                } else if (me.refreshToken) {
                    const accessToken = await me.token.refresh(me.refreshToken);
                    await me.strategy.authorize(accessToken);
                } else if (me.login && me.password) {
                    const { accessToken } = await me.token.login(me.login, me.password);
                    await me.strategy.authorize(accessToken);
                }
            } catch (error) {
                throw new InvalidCredentialsError();
            }
        } else {
            throw new NoAuthCredentialsError();
        }

        return me;
    }
}


module.exports = DeviceHive;