const chai = require(`chai`);
const assert = chai.assert;
const NetworkDeleteQuery = require('../../../src/models/query/NetworkDeleteQuery.js');

describe('NetworkDeleteQuery', () => {

    const expected = {
        networkId: '1',
        force: false
    };


    describe(('NetworkDeleteQuery fileds'), () => {
        it('should create networkDeleteQuery', () => {
            const networkDeleteQuery = new NetworkDeleteQuery(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof networkDeleteQuery[key] !== 'undefined');
            });
        });
    });

    describe(('NetworkDeleteQuery .toObject'), () => {
        it('should convert networkDeleteQuery to object', () => {
            const networkDeleteQuery = new NetworkDeleteQuery(expected);
            const networkDeleteQueryObject = networkDeleteQuery.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(networkDeleteQueryObject.hasOwnProperty(key));
            });
        });
    });
});