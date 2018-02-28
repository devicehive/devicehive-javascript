const randomString = require(`randomstring`);
const chai = require(`chai`);
const assert = chai.assert;
const config = require(`../config`);
const DeviceHive = require(`../../../index`);
const UserToken = DeviceHive.models.UserToken;
const Plugin = DeviceHive.models.Plugin;
const PluginRegisterQuery = DeviceHive.models.query.PluginRegisterQuery;

const httpDeviceHive = new DeviceHive(config.server.http);
const wsDeviceHive = new DeviceHive(config.server.ws);


const TEST_TOKENS = {
    HTTP: {},
    WS: {}
};
const TEST_PLUGIN = {
    HTTP: {
        name: `plugin-${randomString.generate()}`,
        description: `description`,
        parameters: {
            jsonString: `string`
        }
    }
};

describe(`TokenAPI`, () => {

    before(done => {
        const plugin = new Plugin(TEST_PLUGIN.HTTP);
        const pluginQuery = new PluginRegisterQuery({
            returnCommands: true,
            returnUpdatedCommands: false,
            returnNotifications: false
        });

        Promise.all([httpDeviceHive.connect(), wsDeviceHive.connect()])
            .then(() => httpDeviceHive.plugin.register(plugin, pluginQuery))
            .then(({ accessToken, refreshToken, topicName }) => {
                TEST_PLUGIN.HTTP.accessToken = accessToken;
                TEST_PLUGIN.HTTP.refreshToken = refreshToken;
                TEST_PLUGIN.HTTP.topicName = topicName;
            })
            .then(() => done());
    });

    it(`should create token for user via HTTP`, done => {
        const token = new UserToken({
            userId: config.TEST_USER_ID,
            actions: [`*`],
            networkIds: [`*`],
            deviceTypeIds: [`*`],
            expiration: `2050-02-09T10:09:03.033Z`
        });

        httpDeviceHive.token.createUserToken(token)
            .then(({ accessToken, refreshToken }) => {
                assert.exists(accessToken);
                assert.exists(refreshToken);

                TEST_TOKENS.HTTP.accessToken = accessToken;
                TEST_TOKENS.HTTP.refreshToken = refreshToken;
            })
            .then(() => done())
            .catch(done);
    });

    it(`should create token for user via WS`, done => {
        const token = new UserToken({
            userId: config.TEST_USER_ID,
            actions: [`*`],
            networkIds: [`*`],
            deviceTypeIds: [`*`],
            expiration: `2050-02-09T10:09:03.033Z`
        });

        wsDeviceHive.token.createUserToken(token)
            .then(({ accessToken, refreshToken }) => {
                assert.exists(accessToken);
                assert.exists(refreshToken);

                TEST_TOKENS.WS.accessToken = accessToken;
                TEST_TOKENS.WS.refreshToken = refreshToken;
            })
            .then(() => done())
            .catch(done);
    });

    it(`should refresh user access token via HTTP`, done => {
        httpDeviceHive.token.refresh(TEST_TOKENS.HTTP.refreshToken)
            .then(({ accessToken }) => {
                assert.exists(accessToken);

                TEST_TOKENS.WS.accessToken = accessToken;
            })
            .then(() => done())
            .catch(done);
    });

    it(`should refresh user access token via WS`, done => {
        wsDeviceHive.token.refresh(TEST_TOKENS.WS.refreshToken)
            .then(({ accessToken }) => {
                assert.exists(accessToken);

                TEST_TOKENS.WS.accessToken = accessToken;
            })
            .then(() => done())
            .catch(done);
    });
    
    it(`should log in user with given credentials: login ${config.TEST_USER_LOGIN}, password ${config.TEST_USER_PASSWORD} via HTTP`, done => {
        httpDeviceHive.token.login(config.TEST_USER_LOGIN, config.TEST_USER_PASSWORD)
            .then(({ accessToken, refreshToken }) => {
                assert.exists(accessToken);
                assert.exists(refreshToken);
            })
            .then(() => done())
            .catch(done)
    });

    it(`should log in user with given credentials: login ${config.TEST_USER_LOGIN}, password ${config.TEST_USER_PASSWORD} via WS`, done => {
        wsDeviceHive.token.login(config.TEST_USER_LOGIN, config.TEST_USER_PASSWORD)
            .then(({ accessToken, refreshToken }) => {
                assert.exists(accessToken);
                assert.exists(refreshToken);
            })
            .then(() => done())
            .catch(done)
    });

    it(`should create plugin token for plugin with name: ${TEST_PLUGIN.HTTP.name} via HTTP`, done => {
        const token = new DeviceHive.models.PluginToken({
            actions: [],
            expiration: `2030-02-09T10:09:03.033Z`,
            topicName: TEST_PLUGIN.HTTP.topicName
        });

       httpDeviceHive.token.createPluginToken(token)
            .then(({ accessToken, refreshToken }) => {
                assert.exists(accessToken);
                assert.exists(refreshToken);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should authenticate plugin with name: ${TEST_PLUGIN.HTTP.name} via HTTP`, done => {
        httpDeviceHive.token.authPlugin(TEST_PLUGIN.HTTP.accessToken)
            .then(({ tpc, a, e, t }) => {
                assert.exists(tpc);
                assert.exists(a);
                assert.exists(e);
                assert.exists(t);
            })
            .then(done)
            .catch(done);
    });

    after(done => {
        httpDeviceHive.plugin.delete(TEST_PLUGIN.HTTP.topicName)
            .then(() => {
                httpDeviceHive.disconnect();
                wsDeviceHive.disconnect();

                done();
            });
    });
});