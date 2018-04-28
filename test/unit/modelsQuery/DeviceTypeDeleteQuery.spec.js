const chai = require(`chai`);
const assert = chai.assert;
const DeviceTypeDeleteQuery = require('../../../src/models/query/DeviceTypeDeleteQuery.js');

describe('DeviceTypeDeleteQuery', () => {

    const expected = {
        deviceTypeId: '1',
        force: false
    };


    describe(('DeviceTypeDeleteQuery fileds'), () => {
        it('should create deviceTypeDeleteQuery', () => {
            const deviceTypeDeleteQuery = new DeviceTypeDeleteQuery(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof deviceTypeDeleteQuery[key] !== 'undefined');
            });
        });
    });

    describe(('DeviceTypeDeleteQuery .toObject'), () => {
        it('should convert deviceTypeDeleteQuery to object', () => {
            const deviceTypeDeleteQuery = new DeviceTypeDeleteQuery(expected);
            const deviceTypeDeleteQueryObject = deviceTypeDeleteQuery.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(deviceTypeDeleteQueryObject.hasOwnProperty(key));
            });
        });
    });
});