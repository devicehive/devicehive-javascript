const chai = require(`chai`);
const assert = chai.assert;
const config = require('../config');

const EventEmitter = require('events');
const events = new EventEmitter();

const DeviceHive = require('../../../index');

const httpDeviceHive = new DeviceHive(config.server.http);
const wsDeviceHive = new DeviceHive(config.server.ws)

const deviceId = 'e50d6085-2aba-48e9-b1c3-73c673e414be2';

const testDeviceNotifications = [
    {
        deviceId,
        notification: 'notification',
        timestamp: new Date().toISOString(),
        parameters: {
            jsonString: 'jsonString'
        }
    },
    {
        deviceId,
        notification: 'notification',
        timestamp: new Date().toISOString(),
        parameters: {
            jsonString: 'jsonString'
        }
    },
];

describe('NotificationAPI', () => {

    before(done => {
        // Configaratuion DeviceHive
        Promise.all([httpDeviceHive.connect(), wsDeviceHive.connect()])
            .then(() => done());
    });


    it('NotificationAPI.insert()', done => {

        const notification = new DeviceHive.models.Notification(testDeviceNotifications[0]);
        const notification2 = new DeviceHive.models.Notification(testDeviceNotifications[1]);

        Promise.all([httpDeviceHive.notification.insert(deviceId, notification), wsDeviceHive.notification.insert(deviceId, notification2)])
            .then(() => done())
            .catch(done);
    });


    it('NotificationAPI.list()', done => {

        // Configurating Device List query
        const notificationListQuery = new DeviceHive.models.query.NotificationListQuery({
            deviceId,
            notification: 'notification',
            status: 'status',
            sortField: 'id',
            sortOrder: 'id',
            take: 2,
            skip: 0
        });

        Promise.all([httpDeviceHive.notification.list(notificationListQuery), wsDeviceHive.notification.list(notificationListQuery)])
            .then(dataAll => {
                for (const data of dataAll) {
                    for (const deviceNotificationKey in data) {
                        testDeviceNotifications[deviceNotificationKey].id = data[deviceNotificationKey].id;
                        testDeviceNotifications[deviceNotificationKey].timestamp = data[deviceNotificationKey].timestamp;
                        assert.containsAllKeys(data[deviceNotificationKey], Object.keys(testDeviceNotifications[0]));
                    }
                }
            })
            .then(done)
            .catch(done);
    });


    it('NotificationAPI.get()', done => {

        Promise.all([httpDeviceHive.notification.get(deviceId, testDeviceNotifications[0].id), wsDeviceHive.notification.get(deviceId, testDeviceNotifications[0].id)])
            .then(dataAll => {
                const expected = testDeviceNotifications[0];
                for (const data of dataAll) {
                    assert.isObject(data);
                    assert.deepInclude(data, expected);
                }
            })
            .then(done)
            .catch(done);
    });


    it('NotificationAPI.poll()', done => {

        // Configurating Notification List query
        const notificationPollQuery = new DeviceHive.models.query.NotificationPollQuery({
            deviceId,
            returnUpdatedNotifications: true,
            limit: 1,
            waitTimeout: 1
        });

        httpDeviceHive.notification.poll(notificationPollQuery)
            .then(() => done())
            .catch(done);

        // emit notification
        setTimeout(() => {
            const notification = new DeviceHive.models.Notification(testDeviceNotifications[0]);
            httpDeviceHive.notification.insert(deviceId, notification);
        }, 50);
    });


    it('NotificationAPI.pollMany()', done => {

        const notificationPollManyQuery = new DeviceHive.models.query.NotificationPollManyQuery({
            deviceIds: deviceId
        });

        httpDeviceHive.notification.pollMany(notificationPollManyQuery)
            .then(() => done())
            .catch(done);

        // emit notification
        setTimeout(() => {
            const notification = new DeviceHive.models.Notification(testDeviceNotifications[0]);
            httpDeviceHive.notification.insert(deviceId, notification);
        }, 50);
    });
});