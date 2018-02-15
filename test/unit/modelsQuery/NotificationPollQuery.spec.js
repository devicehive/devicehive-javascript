const chai = require(`chai`);
const assert = chai.assert;
const NotificationPollQuery = require('../../../src/models/query/NotificationPollQuery.js');

describe('NotificationPollQuery', () => {

    const expected = {
        deviceId: 'string',
        names: 'string',
        timestamp: '2018-02-09T10:09:03.033Z',
        waitTimeout: 10
    };


    describe(('NotificationPollQuery fileds'), () => {
        it('should create notificationPollQuery', () => {
            const notificationPollQuery = new NotificationPollQuery(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof notificationPollQuery[key] !== 'undefined');
            });
        });
    });

    describe(('NotificationPollQuery .toObject'), () => {
        it('should convert notificationPollQuery to object', () => {
            const notificationPollQuery = new NotificationPollQuery(expected);
            const notificationPollQueryObject = notificationPollQuery.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(notificationPollQueryObject.hasOwnProperty(key));
            });
        });
    });
});