const chai = require(`chai`);
const assert = chai.assert;
const NetworkListQuery = require('../../../src/models/query/NetworkListQuery.js');

describe('NetworkListQuery', () => {

    const expected = {
        name: 'string',
        namePattern: 'string',
        sortField: 'string',
        sortOrder: 'string',
        take: 1,
        skip: 1
    };


    describe(('NetworkListQuery fileds'), () => {
        it('should create networkListQuery', () => {
            const networkListQuery = new NetworkListQuery(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof networkListQuery[key] !== 'undefined');
            });
        });
    });

    describe(('NetworkListQuery .toObject'), () => {
        it('should convert networkListQuery to object', () => {
            const networkListQuery = new NetworkListQuery(expected);
            const networkListQueryObject = networkListQuery.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(networkListQueryObject.hasOwnProperty(key));
            });
        });
    });
});