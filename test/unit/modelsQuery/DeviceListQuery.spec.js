const chai = require(`chai`);
const assert = chai.assert;
const DeviceListQuery = require('../../../src/models/query/DeviceListQuery.js');

describe('DeviceListQuery', () => {

    const expected = {
        name: 'string',
        namePattern: 'string',
        networkId: 1,
        networkName: 'string',
        sortField: 'string',
        sortOrder: 'string',
        take: 1,
        skip: 1
    };


    describe(('DeviceListQuery fileds'), () => {
        it('should create deviceListQuery', () => {
            const deviceListQuery = new DeviceListQuery(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof deviceListQuery[key] !== 'undefined');
            });
        });
    });

    describe(('DeviceListQuery .toObject'), () => {
        it('should convert deviceListQuery to object', () => {
            const deviceListQuery = new DeviceListQuery(expected);
            const deviceListQueryObject = deviceListQuery.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(deviceListQueryObject.hasOwnProperty(key));
            });
        });
    });
});