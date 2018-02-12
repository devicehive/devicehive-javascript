const chai = require(`chai`);
const assert = chai.assert;
const Network = require('../../../src/models/Network.js');

describe('Network', () => {

    const expected = {
        id: 0,
        name: 'string',
        description: 'string'
    };


    describe(('Network fileds'), () => {
        it('should create network', () => {
            const network = new Network(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof network[key] !== 'undefined');
            });
        });
    });

    describe(('Network .toObject'), () => {
        it('should convert network to object', () => {
            const network = new Network(expected);
            const networkObject = network.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(networkObject.hasOwnProperty(key));
            });
        });
    });
});