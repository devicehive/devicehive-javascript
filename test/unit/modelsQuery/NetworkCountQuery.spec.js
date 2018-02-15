const chai = require(`chai`);
const assert = chai.assert;
const NetworkCountQuery = require('../../../src/models/query/NetworkCountQuery.js');

describe('NetworkCountQuery', () => {

    const expected = {
        name: 'string',
        namePattern: 'string'
    };


    describe(('NetworkCountQuery fileds'), () => {
        it('should create networkCountQuery', () => {
            const networkCountQuery = new NetworkCountQuery(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof networkCountQuery[key] !== 'undefined');
            });
        });
    });

    describe(('NetworkCountQuery .toObject'), () => {
        it('should convert networkCountQuery to object', () => {
            const networkCountQuery = new NetworkCountQuery(expected);
            const networkCountQueryObject = networkCountQuery.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(networkCountQueryObject.hasOwnProperty(key));
            });
        });
    });
});