const chai = require(`chai`);
const assert = chai.assert;
const DeviceNotification = require('../../../src/models/DeviceNotification.js');

describe('DeviceNotification', () => {

    const expected = {
        id: 1,
        notification: 'string',
        timestamp: '2018-02-09T10:09:03.033Z',
        parameters: {
            jsonString: 'string'
        }
    };


    describe(('DeviceNotification fileds'), () => {
        it('should create notification', () => {
            const notification = new DeviceNotification(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof notification[key] !== 'undefined');
            });
        });
    });

    describe(('DeviceNotification .toObject'), () => {
        it('should convert notification to object', () => {
            const notification = new DeviceNotification(expected);
            const notificationObject = notification.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(notificationObject.hasOwnProperty(key));
            });
        });
    });
});