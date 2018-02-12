const chai = require(`chai`);
const assert = chai.assert;
const Notification = require('../../../src/models/Notification.js');

describe('Notification', () => {

    const expected = {
        id: 1,
        notification: 'string',
        timestamp: '2018-02-09T10:09:03.033Z',
        parameters: {
            jsonString: 'string'
        }
    };


    describe(('Notification fileds'), () => {
        it('should create notification', () => {
            const notification = new Notification(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof notification[key] !== 'undefined');
            });
        });
    });

    describe(('Notification .toObject'), () => {
        it('should convert notification to object', () => {
            const notification = new Notification(expected);
            const notificationObject = notification.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(notificationObject.hasOwnProperty(key));
            });
        });
    });
});