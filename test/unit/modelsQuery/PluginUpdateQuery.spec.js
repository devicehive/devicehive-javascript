const chai = require(`chai`);
const assert = chai.assert;
const PluginUpdateQuery = require('../../../src/models/query/PluginUpdateQuery.js');

describe('PluginUpdateQuery', () => {

    const expected = {
        topicName: 'string',
        deviceId: 'string',
        networkIds: 'string',
        deviceTypeIds: 'string',
        names: 'string',
        returnCommands: false,
        returnUpdatedCommands: false,
        returnNotifications: false,
        status: 'string',
        name: 'string',
        description: 'string',
        parameters: 'string'
    };


    describe(('PluginUpdateQuery fileds'), () => {
        it('should create pluginUpdateQuery', () => {
            const pluginUpdateQuery = new PluginUpdateQuery(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof pluginUpdateQuery[key] !== 'undefined');
            });
        });
    });

    describe(('PluginUpdateQuery .toObject'), () => {
        it('should convert pluginUpdateQuery to object', () => {
            const pluginUpdateQuery = new PluginUpdateQuery(expected);
            const pluginUpdateQueryObject = pluginUpdateQuery.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(pluginUpdateQueryObject.hasOwnProperty(key));
            });
        });
    });
});