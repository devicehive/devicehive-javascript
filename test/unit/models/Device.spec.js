const chai = require(`chai`);
const assert = chai.assert;
const Device = require('../../../src/models/Device.js');

describe('Device', () => {

    const expected = {
        name: 'string',
        data: {
            jsonString: 'string'
        },
        networkId: 0,
        deviceTypeId: 0,
        isBlocked: false
    };


    describe(('Device fileds'), () => {
        it('should create device', () => {
            const device = new Device(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof device[key] !== 'undefined');
            });
        });
    });

    describe(('Device .toObject'), () => {
        it('should convert device to object', () => {
            const device = new Device(expected);
            const deviceObject = device.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(deviceObject.hasOwnProperty(key));
            });
        });
    });
});