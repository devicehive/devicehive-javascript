const randomString = require(`randomstring`);
const chai = require(`chai`);
const assert = chai.assert;
const config = require(`../config`);
const DeviceHive = require(`../../../index`);
const Plugin = DeviceHive.models.Plugin;
const PluginRegisterQuery = DeviceHive.models.query.PluginRegisterQuery;

const httpDeviceHive = new DeviceHive(config.server.http);
const wsDeviceHive = new DeviceHive(config.server.ws);


const TEST_PLUGIN = {
    HTTP: {
        name: `plugin-${randomString.generate()}`,
        description: `description`,
        parameters: {
            jsonString: `string`
        }
    }
};

describe(`PluginAPI`, () => {

    before(done => {
        Promise.all([httpDeviceHive.connect(), wsDeviceHive.connect()])
            .then(() => done());
    });

    it(`should register plugin with name: ${TEST_PLUGIN.HTTP.name} via HTTP`, done => {
        const plugin = new Plugin(TEST_PLUGIN.HTTP);
        const pluginQuery = new PluginRegisterQuery({
            returnCommands: true,
            returnUpdatedCommands: false,
            returnNotifications: false
        });

        httpDeviceHive.plugin.register(plugin, pluginQuery)
            .then(({ accessToken, refreshToken, topicName }) => {
                assert.exists(accessToken);
                assert.exists(refreshToken);
                assert.exists(topicName);

                TEST_PLUGIN.HTTP.accessToken = accessToken;
                TEST_PLUGIN.HTTP.refreshToken = refreshToken;
                TEST_PLUGIN.HTTP.topicName = topicName;
            })
            .then(() => done())
            .catch(done);
    });

    it(`should get plugin with name: ${TEST_PLUGIN.HTTP.name} via HTTP`, done => {
        const pluginListQuery = new DeviceHive.models.query.PluginListQuery({
            name: TEST_PLUGIN.HTTP.name
        });

        httpDeviceHive.plugin.list(pluginListQuery)
            .then(plugins => {
                assert.equal(plugins[0].name, TEST_PLUGIN.HTTP.name);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should update plugin with name: ${TEST_PLUGIN.HTTP.name} via HTTP`, done => {
        TEST_PLUGIN.HTTP.name = `plugin-${randomString.generate()}`;

        const pluginUpdateQuery = new DeviceHive.models.query.PluginUpdateQuery({
            topicName: TEST_PLUGIN.HTTP.topicName,
            name: TEST_PLUGIN.HTTP.name
        });
        const pluginListQuery = new DeviceHive.models.query.PluginListQuery({
            name: TEST_PLUGIN.HTTP.name
        });

        httpDeviceHive.plugin.update(pluginUpdateQuery)
            .then(() => httpDeviceHive.plugin.list(pluginListQuery))
            .then(plugins => {
                assert.equal(plugins[0].name, TEST_PLUGIN.HTTP.name);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should count plugin with name: ${TEST_PLUGIN.HTTP.name} via HTTP`, done => {
        const pluginCountQuery = new DeviceHive.models.query.PluginCountQuery({
            name: TEST_PLUGIN.HTTP.name
        });

        httpDeviceHive.plugin.count(pluginCountQuery)
            .then(({ count }) => {
                assert.equal(count, 1);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should delete plugin with name: ${TEST_PLUGIN.HTTP.name}`, done => {
        httpDeviceHive.plugin.delete(TEST_PLUGIN.HTTP.topicName)
            .then(() => done())
            .catch(done);
    });

    after(done => {
        httpDeviceHive.disconnect();
        wsDeviceHive.disconnect();

        done();
    });
});