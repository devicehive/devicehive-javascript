const chai = require(`chai`);
const assert = chai.assert;
const DeviceCountQuery = require('../../../src/models/query/DeviceCountQuery.js');

describe('DeviceCountQuery', () => {

    const expected = {
        name: 'string',
        namePattern: 'string',
        networkId: 1,
        networkName: 'string'
    };


    describe(('DeviceCountQuery fileds'), () => {
        it('should create deviceCountQuery', () => {
            const deviceCountQuery = new DeviceCountQuery(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof deviceCountQuery[key] !== 'undefined');
            });
        });
    });

    describe(('DeviceCountQuery .toObject'), () => {
        it('should convert deviceCountQuery to object', () => {
            const deviceCountQuery = new DeviceCountQuery(expected);
            const deviceCountQueryObject = deviceCountQuery.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(deviceCountQueryObject.hasOwnProperty(key));
            });
        });
    });
});