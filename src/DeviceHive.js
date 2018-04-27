const Utils = require(`./utils/Utils`);
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
const PluginAPI = require('./controllers/PluginAPI');
const Command = require(`./models/DeviceCommand`);
const Configuration = require(`./models/Configuration`);
const Device = require(`./models/Device`);
const DeviceType = require(`./models/DeviceType`);
const Network = require(`./models/Network`);
const Notification = require(`./models/DeviceNotification`);
const Plugin = require(`./models/Plugin`);
const UserToken = require(`./models/UserToken`);
const PluginToken = require(`./models/PluginToken`);
const User = require(`./models/User`);
const CommandListQuery = require(`./models/query/CommandListQuery`);
const CommandPollManyQuery = require(`./models/query/CommandPollManyQuery`);
const CommandPollQuery = require(`./models/query/CommandPollQuery`);
const CommandWaitQuery = require(`./models/query/CommandWaitQuery`);
const DeviceCountQuery = require(`./models/query/DeviceCountQuery`);
const DeviceListQuery = require(`./models/query/DeviceListQuery`);
const DeviceTypeCountQuery = require(`./models/query/DeviceTypeCountQuery`);
const DeviceTypeListQuery = require(`./models/query/DeviceTypeListQuery`);
const DeviceTypeDeleteQuery = require('./models/query/DeviceTypeDeleteQuery');
const PluginUpdateQuery = require(`./models/query/PluginUpdateQuery`);
const NetworkCountQuery = require(`./models/query/NetworkCountQuery`);
const NetworkListQuery = require(`./models/query/NetworkListQuery`);
const NetworkDeleteQuery = require('./models/query/NetworkDeleteQuery');
const NotificationListQuery = require(`./models/query/NotificationListQuery`);
const NotificationPollManyQuery = require(`./models/query/NotificationPollManyQuery`);
const NotificationPollQuery = require(`./models/query/NotificationPollQuery`);
const UserCountQuery = require(`./models/query/UserCountQuery`);
const UserListQuery = require(`./models/query/UserListQuery`);
const PluginCountQuery = require(`./models/query/PluginCountQuery`);
const PluginListQuery = require(`./models/query/PluginListQuery`);
const PluginRegisterQuery = require(`./models/query/PluginRegisterQuery`);
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
            Plugin: Plugin,
            PluginToken: PluginToken,
            User: User,
            UserToken: UserToken,
            query: {
                CommandListQuery: CommandListQuery,
                CommandPollManyQuery: CommandPollManyQuery,
                CommandPollQuery: CommandPollQuery,
                CommandWaitQuery: CommandWaitQuery,
                DeviceCountQuery: DeviceCountQuery,
                DeviceListQuery: DeviceListQuery,
                DeviceTypeCountQuery: DeviceTypeCountQuery,
                DeviceTypeListQuery: DeviceTypeListQuery,
                DeviceTypeDeleteQuery: DeviceTypeDeleteQuery,
                PluginUpdateQuery: PluginUpdateQuery,
                NetworkCountQuery: NetworkCountQuery,
                NetworkListQuery: NetworkListQuery,
                NetworkDeleteQuery: NetworkDeleteQuery,
                NotificationListQuery: NotificationListQuery,
                NotificationPollManyQuery: NotificationPollManyQuery,
                NotificationPollQuery: NotificationPollQuery,
                UserCountQuery: UserCountQuery,
                UserListQuery: UserListQuery,
                PluginCountQuery: PluginCountQuery,
                PluginListQuery: PluginListQuery,
                PluginRegisterQuery: PluginRegisterQuery
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
    constructor({ mainServiceURL, authServiceURL, pluginServiceURL, accessToken, refreshToken, login, password, autoUpdateSession = true }) {
        super();

        const me = this;

        me.accessToken = accessToken;
        me.refreshToken = refreshToken;
        me.login = login;
        me.password = password;
        me.autoUpdateSession = autoUpdateSession;

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
        me.plugin = new PluginAPI({ strategy: me.strategy });


        me.strategy.on(`message`, message => me.emit(`message`, message));
        me.strategy.on(`error`, error => me.emit(`error`, error));
    }

    /**
     * Connect to the DeviceHive service
     * @returns {Promise<DeviceHive>}
     */
    async connect({ accessToken, refreshToken, login, password } = {}) {
        const me = this;

        if (!accessToken && !refreshToken && !(login && password)) {
            accessToken = accessToken || me.accessToken;
            refreshToken = refreshToken || me.refreshToken;
            login = login || me.login;
            password = password || me.password;
        }

        if (accessToken || refreshToken || (login && password)) {
            try {
                if (login && password) {
                    const { accessToken, refreshToken } = await me.token.login(login, password);

                    await me.strategy.authorize(accessToken);

                    me.accessToken = accessToken;
                    me.refreshToken = refreshToken;
                } else if (refreshToken) {
                    const { accessToken } = await me.token.refresh(refreshToken);

                    await me.strategy.authorize(accessToken);

                    me.accessToken = accessToken;
                    me.refreshToken = refreshToken;
                } else if (accessToken) {
                    await me.strategy.authorize(accessToken);

                    me.accessToken = accessToken;
                }

                if (me.autoUpdateSession === true) {
                    const userTokens = await me.token.createUserToken(
                        Utils.createUserTokenFromJWT(me.accessToken));

                    me.accessToken = userTokens.accessToken;
                    me.refreshToken = userTokens.refreshToken;
                    me.strategy.reconnectionHandler = () => me.connect({ refreshToken: me.refreshToken });
                }
            } catch (error) {
                throw new InvalidCredentialsError(error);
            }
        } else {
            throw new NoAuthCredentialsError();
        }

        return me;
    }

    /**
     * Disconnects from DeviceHive server
     * @returns {*|void}
     */
    disconnect() {
        const me = this;

        return me.strategy.disconnect();
    }
}


module.exports = DeviceHive;