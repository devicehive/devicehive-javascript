const chai = require(`chai`);
const assert = chai.assert;
const config = require('../config');

const EventEmitter = require('events');
const events = new EventEmitter();

const DeviceHive = require('../../../index');

const httpDeviceHive = new DeviceHive(config.server.http);
const wsDeviceHive = new DeviceHive(config.server.ws)


const testPlugins = [
    {
        name: `testName${new Date().getMilliseconds()}`,
        description: 'description',
        parameters: {
            jsonString: 'string'
        }
    }
];

describe('PluginAPI', () => {

    before(done => {
        // Configaratuion DeviceHive

        Promise.all([httpDeviceHive.connect(), wsDeviceHive.connect()])
            .then(() => done());
    });


    it('PluginAPI.register()', done => {
        const plugin = new DeviceHive.models.Plugin(testPlugins[0]);
        const pluginQuery = new DeviceHive.models.query.PluginRegisterQuery({
            returnCommands: 'true',
            returnUpdatedCommands: 'false',
            returnNotifications: 'false'
        });

        Promise.all([httpDeviceHive.plugin.register(plugin, pluginQuery)])
            .then(dataAll => {
                for (const data of dataAll) {
                    testPlugins[0] = Object.assign({}, testPlugins[0], data);
                }
            })
            .then(() => done())
            .catch(done);
    });

    it('PluginAPI.list()', done => {

        // Configurating Plugin List query
        const pluginListQuery = new DeviceHive.models.query.PluginListQuery({
            take: 1,
            skip: 0
        });

        Promise.all([httpDeviceHive.plugin.list(pluginListQuery)])
            .then(dataAll => {
                for (const data of dataAll) {
                    assert.isArray(data);
                }
            })
            .then(() => done())
            .catch(done);
    });


    // TODO
    // it('PluginAPI.update()', done => {
    // });


    it('PluginAPI.count()', done => {

        // Configurating Plugin List query
        const pluginCountQuery = new DeviceHive.models.query.PluginCountQuery({
            status: '1'
        });

        Promise.all([httpDeviceHive.plugin.count(pluginCountQuery)])
            .then(dataAll => {
                for (const data of dataAll) {
                    assert.property(data, 'count');
                }
            })
            .then(() => done())
            .catch(done);
    });

    it('TokenAPI.createPluginToken()', done => {

        // Configurating Token model
        const token = new DeviceHive.models.PluginToken({
            actions: [0],
            expiration: '2018-02-09T10:09:03.033Z',
            type: 0,
            topicName: testPlugins[0].topicName
        });

        Promise.all([httpDeviceHive.token.createPluginToken(token)])
            .then(dataAll => {
                for (const data of dataAll) {
                    const expectedKeys = ['accessToken', 'refreshToken']
                    assert.containsAllKeys(data, expectedKeys);
                }
            })
            .then(done)
            .catch(done);
    });

    it('TokenAPI.authPlugin()', done => {
        Promise.all([httpDeviceHive.token.authPlugin(testPlugins[0].accessToken)])
            .then(dataAll => {
                for (const data of dataAll) {
                    const expectedKeys = ['tpc', 'a', 'e', 't'];
                    assert.containsAllKeys(data, expectedKeys)
                }
            })
            .then(done)
            .catch(done);
    });

    it('PluginAPI.delete()', done => {

        Promise.all([httpDeviceHive.plugin.delete(testPlugins[0].topicName)])
            .then(() => done())
            .catch(done);
    });
});