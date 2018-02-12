const chai = require(`chai`);
const assert = chai.assert;
const DeviceType = require('../../../src/models/DeviceType.js');

describe('DeviceType', () => {

    const expected = {
        id: 0,
        name: 'string',
        description: 'string'
    };


    describe(('DeviceType fileds'), () => {
        it('should create deviceType', () => {
            const deviceType = new DeviceType(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof deviceType[key] !== 'undefined');
            });
        });
    });

    describe(('DeviceType .toObject'), () => {
        it('should convert deviceType to object', () => {
            const deviceType = new DeviceType(expected);
            const deviceTypeObject = deviceType.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(deviceTypeObject.hasOwnProperty(key));
            });
        });
    });
});