const chai = require(`chai`);
const assert = chai.assert;
const DeviceTypeListQuery = require('../../../src/models/query/DeviceTypeListQuery.js');

describe('DeviceTypeListQuery', () => {

    const expected = {
        name: 'string',
        namePattern: 'string',
        sortField: 'string',
        sortOrder: 'string',
        take: 1,
        skip: 1
    };


    describe(('DeviceTypeListQuery fileds'), () => {
        it('should create deviceTypeListQuery', () => {
            const deviceTypeListQuery = new DeviceTypeListQuery(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof deviceTypeListQuery[key] !== 'undefined');
            });
        });
    });

    describe(('DeviceTypeListQuery .toObject'), () => {
        it('should convert deviceTypeListQuery to object', () => {
            const deviceTypeListQuery = new DeviceTypeListQuery(expected);
            const deviceTypeListQueryObject = deviceTypeListQuery.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(deviceTypeListQueryObject.hasOwnProperty(key));
            });
        });
    });
});