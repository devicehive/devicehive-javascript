const chai = require(`chai`);
const assert = chai.assert;
const DeviceTypeCountQuery = require('../../../src/models/query/DeviceTypeCountQuery.js');

describe('DeviceTypeCountQuery', () => {

    const expected = {
        name: 'string',
        namePattern: 'string'
    };


    describe(('DeviceTypeCountQuery fileds'), () => {
        it('should create deviceTypeCountQuery', () => {
            const deviceTypeCountQuery = new DeviceTypeCountQuery(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof deviceTypeCountQuery[key] !== 'undefined');
            });
        });
    });

    describe(('DeviceTypeCountQuery .toObject'), () => {
        it('should convert deviceTypeCountQuery to object', () => {
            const deviceTypeCountQuery = new DeviceTypeCountQuery(expected);
            const deviceTypeCountQueryObject = deviceTypeCountQuery.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(deviceTypeCountQueryObject.hasOwnProperty(key));
            });
        });
    });
});