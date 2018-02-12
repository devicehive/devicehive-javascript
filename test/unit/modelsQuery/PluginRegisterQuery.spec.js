const chai = require(`chai`);
const assert = chai.assert;
const PluginRegisterQuery = require('../../../src/models/query/PluginRegisterQuery.js');

describe('PluginRegisterQuery', () => {

    const expected = {
        deviceId: 'string',
        networkIds: 'string',
        deviceTypeIds: 'string',
        names: 'string',
        returnCommands: false,
        returnUpdatedCommands: false,
        returnNotifications: false
    };


    describe(('PluginRegisterQuery fileds'), () => {
        it('should create pluginRegisterQuery', () => {
            const pluginRegisterQuery = new PluginRegisterQuery(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof pluginRegisterQuery[key] !== 'undefined');
            });
        });
    });

    describe(('PluginRegisterQuery .toObject'), () => {
        it('should convert pluginRegisterQuery to object', () => {
            const pluginRegisterQuery = new PluginRegisterQuery(expected);
            const pluginRegisterQueryObject = pluginRegisterQuery.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(pluginRegisterQueryObject.hasOwnProperty(key));
            });
        });
    });
});