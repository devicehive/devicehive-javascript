const chai = require(`chai`);
const assert = chai.assert;
const PluginListQuery = require('../../../src/models/query/PluginListQuery.js');

describe('PluginListQuery', () => {

    const expected = {
        name: 'string',
        namePattern: 'string',
        topicName: 'string',
        status: 1,
        userId: 1,
        sortField: 'string',
        sortOrder: 'string',
        take: 1,
        skip: 1
    };


    describe(('PluginListQuery fileds'), () => {
        it('should create pluginListQuery', () => {
            const pluginListQuery = new PluginListQuery(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof pluginListQuery[key] !== 'undefined');
            });
        });
    });

    describe(('PluginListQuery .toObject'), () => {
        it('should convert pluginListQuery to object', () => {
            const pluginListQuery = new PluginListQuery(expected);
            const pluginListQueryObject = pluginListQuery.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(pluginListQueryObject.hasOwnProperty(key));
            });
        });
    });
});