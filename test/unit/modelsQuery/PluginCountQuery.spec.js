const chai = require(`chai`);
const assert = chai.assert;
const PluginCountQuery = require('../../../src/models/query/PluginCountQuery.js');

describe('PluginCountQuery', () => {

    const expected = {
        name: 'string',
        namePattern: 'string',
        topicName: 'string',
        status: 1,
        userId: 1
    };


    describe(('PluginCountQuery fileds'), () => {
        it('should create pluginCountQuery', () => {
            const pluginCountQuery = new PluginCountQuery(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof pluginCountQuery[key] !== 'undefined');
            });
        });
    });

    describe(('PluginCountQuery .toObject'), () => {
        it('should convert pluginCountQuery to object', () => {
            const pluginCountQuery = new PluginCountQuery(expected);
            const pluginCountQueryObject = pluginCountQuery.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(pluginCountQueryObject.hasOwnProperty(key));
            });
        });
    });
});