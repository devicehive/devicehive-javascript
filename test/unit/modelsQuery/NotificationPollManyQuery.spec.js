const chai = require(`chai`);
const assert = chai.assert;
const NotificationPollManyQuery = require('../../../src/models/query/NotificationPollManyQuery.js');

describe('NotificationPollManyQuery', () => {

    const expected = {
        deviceIds: 'string',
        networkIds: '2018-02-09T10:09:03.033Z',
        deviceTypeIds: 'string',
        names: 'string',
        timestamp: '2018-02-09T10:09:03.033Z',
        waitTimeout: 1
    };


    describe(('NotificationPollManyQuery fileds'), () => {
        it('should create notificationPollManyQuery', () => {
            const notificationPollManyQuery = new NotificationPollManyQuery(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof notificationPollManyQuery[key] !== 'undefined');
            });
        });
    });

    describe(('NotificationPollManyQuery .toObject'), () => {
        it('should convert notificationPollManyQuery to object', () => {
            const notificationPollManyQuery = new NotificationPollManyQuery(expected);
            const notificationPollManyQueryObject = notificationPollManyQuery.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(notificationPollManyQueryObject.hasOwnProperty(key));
            });
        });
    });
});