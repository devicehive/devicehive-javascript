const chai = require(`chai`);
const assert = chai.assert;
const Plugin = require('../../../src/models/Plugin.js');

describe('Plugin', () => {

    const expected = {
        id: 0,
        name: 'string',
        description: 'string',
        topicName: 'string',
        filter: 'string',
        status: 'ACTIVE',
        subscriptionId: 0,
        userId: 0,
        parameters: {
            jsonString: 'string'
        }
    };


    describe(('Plugin fileds'), () => {
        it('should create plugin', () => {
            const plugin = new Plugin(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof plugin[key] !== 'undefined');
            });
        });
    });

    describe(('Plugin .toObject'), () => {
        it('should convert plugin to object', () => {
            const plugin = new Plugin(expected);
            const pluginObject = plugin.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(pluginObject.hasOwnProperty(key));
            });
        });
    });
});