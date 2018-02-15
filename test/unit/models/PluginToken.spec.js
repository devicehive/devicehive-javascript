const chai = require(`chai`);
const assert = chai.assert;
const PluginToken = require('../../../src/models/PluginToken.js');

describe('PluginToken', () => {

    // TODO
    const expected = {
        a: [0],
        e: '2018-02-09T10:09:03.033Z',
        t: 0,
        tpc: 'string'
    };

    const source = {
        actions: [0],
        expiration: '2018-02-09T10:09:03.033Z',
        type: 0,
        topicName: 'string'
    };

    describe(('PluginToken fileds'), () => {
        it('should create pluginToken', () => {
            const pluginToken = new PluginToken(source);

            Object.keys(source).forEach(key => {
                assert.isTrue(typeof pluginToken[key] !== 'undefined');
            });
        });
    });

    describe(('PluginToken .toObject'), () => {
        it('should convert pluginToken to object', () => {
            const pluginToken = new PluginToken(source);
            const pluginTokenObject = pluginToken.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(pluginTokenObject.hasOwnProperty(key));
            });
        });
    });
});