const chai = require(`chai`);
const assert = chai.assert;
const NotificationListQuery = require('../../../src/models/query/NotificationListQuery.js');

describe('NotificationListQuery', () => {

    const expected = {
        deviceId: 'string',
        start: '2018-02-09T10:09:03.033Z',
        end: '2018-02-09T10:09:03.033Z',
        notification: 'string',
        sortField: 'string',
        sortOrder: 'string',
        take: 1,
        skip: 1
    };


    describe(('NotificationListQuery fileds'), () => {
        it('should create notificationListQuery', () => {
            const notificationListQuery = new NotificationListQuery(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof notificationListQuery[key] !== 'undefined');
            });
        });
    });

    describe(('NotificationListQuery .toObject'), () => {
        it('should convert notificationListQuery to object', () => {
            const notificationListQuery = new NotificationListQuery(expected);
            const notificationListQueryObject = notificationListQuery.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(notificationListQueryObject.hasOwnProperty(key));
            });
        });
    });
});