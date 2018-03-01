const randomString = require(`randomstring`);
const chai = require(`chai`);
const assert = chai.assert;
const config = require('../config');
const DeviceHive = require('../../../index');
const Device = DeviceHive.models.Device;
const Notification = DeviceHive.models.Notification;
const NotificationListQuery = DeviceHive.models.query.NotificationListQuery;
const NotificationPollQuery = DeviceHive.models.query.NotificationPollQuery;
const NotificationPollManyQuery = DeviceHive.models.query.NotificationPollManyQuery;

const httpDeviceHive = new DeviceHive(config.server.http);
const wsDeviceHive = new DeviceHive(config.server.ws);


const TIMESTAMP = new Date().toISOString();
const DH_NOTIFICATIONS_TEST_DEVICE = {
    id: randomString.generate(),
    name: `DH_COMMANDS_TEST_DEVICE`,
    networkId: 1,
    deviceTypeId: 1,
    isBlocked: false,
    data: {}
};
const TEST_DEVICE_NOTIFICATIONS = {
    HTTP: {
        deviceId: DH_NOTIFICATIONS_TEST_DEVICE.id,
        notification: `notification-${randomString.generate()}`,
        timestamp: TIMESTAMP,
        parameters: {
            jsonString: 'jsonString'
        }
    },
    WS: {
        deviceId: DH_NOTIFICATIONS_TEST_DEVICE.id,
        notification: `notification-${randomString.generate()}`,
        timestamp: TIMESTAMP,
        parameters: {
            jsonString: 'jsonString'
        }
    }
};

describe('NotificationAPI', () => {

    before(done => {
        Promise.all([httpDeviceHive.connect(), wsDeviceHive.connect()])
            .then(() => httpDeviceHive.device.add(new Device(DH_NOTIFICATIONS_TEST_DEVICE)))
            .then(() => done())
            .catch(done);
    });

    it(`should insert new notification with name ${TEST_DEVICE_NOTIFICATIONS.HTTP.notification} via HTTP`, done => {
        const notificationModel = new Notification(TEST_DEVICE_NOTIFICATIONS.HTTP);

        httpDeviceHive.notification.insert(DH_NOTIFICATIONS_TEST_DEVICE.id, notificationModel)
            .then((notification) => {
                TEST_DEVICE_NOTIFICATIONS.HTTP.id = notification.id;

                done();
            })
            .catch(done);
    });

    it(`should insert new notification with name ${TEST_DEVICE_NOTIFICATIONS.WS.notification} via WS`, done => {
        const notificationModel = new Notification(TEST_DEVICE_NOTIFICATIONS.WS);

        wsDeviceHive.notification.insert(DH_NOTIFICATIONS_TEST_DEVICE.id, notificationModel)
            .then((notification) => {
                TEST_DEVICE_NOTIFICATIONS.WS.id = notification.id;

                done();
            })
            .catch(done);
    });

    it(`should list all notifications for device with id ${DH_NOTIFICATIONS_TEST_DEVICE.id} via HTTP`, done => {
        const notificationListQuery = new NotificationListQuery({
            deviceId: DH_NOTIFICATIONS_TEST_DEVICE.id,
            notification: TEST_DEVICE_NOTIFICATIONS.HTTP.notification
        });

        setTimeout(() => {
            httpDeviceHive.notification.list(notificationListQuery)
                .then(notifications => {
                    assert.equal(notifications[0].notification, TEST_DEVICE_NOTIFICATIONS.HTTP.notification);
                })
                .then(() => done())
                .catch(done);
        }, 200);
    });

    it(`should list all notifications for device with id ${DH_NOTIFICATIONS_TEST_DEVICE.id} via WS`, done => {
        const notificationListQuery = new NotificationListQuery({
            deviceId: DH_NOTIFICATIONS_TEST_DEVICE.id,
            notification: TEST_DEVICE_NOTIFICATIONS.WS.notification
        });

        setTimeout(() => {
            wsDeviceHive.notification.list(notificationListQuery)
                .then(notifications => {
                    assert.equal(notifications[0].notification, TEST_DEVICE_NOTIFICATIONS.WS.notification);
                })
                .then(() => done())
                .catch(done);
        }, 200);
    });

    it(`should get notification with id ${TEST_DEVICE_NOTIFICATIONS.HTTP.id} for device with id ${DH_NOTIFICATIONS_TEST_DEVICE.id} via HTTP`, done => {
        httpDeviceHive.notification.get(DH_NOTIFICATIONS_TEST_DEVICE.id, TEST_DEVICE_NOTIFICATIONS.HTTP.id)
            .then(notification => {
                assert.equal(notification.id, TEST_DEVICE_NOTIFICATIONS.HTTP.id);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should get notification with id ${TEST_DEVICE_NOTIFICATIONS.WS.id} for device with id ${DH_NOTIFICATIONS_TEST_DEVICE.id} via WS`, done => {
        wsDeviceHive.notification.get(DH_NOTIFICATIONS_TEST_DEVICE.id, TEST_DEVICE_NOTIFICATIONS.WS.id)
            .then(command => {
                assert.equal(command.id, TEST_DEVICE_NOTIFICATIONS.WS.id);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should poll new notification for device with id ${DH_NOTIFICATIONS_TEST_DEVICE.id} via HTTP`, done => {
        const notificationPollQuery = new NotificationPollQuery({
            deviceId: DH_NOTIFICATIONS_TEST_DEVICE.id,
            waitTimeout: 1
        });

        httpDeviceHive.notification.poll(notificationPollQuery)
            .then((notifications) => {
                assert.equal(notifications.length, 1);
                assert.equal(notifications[0].notification, TEST_DEVICE_NOTIFICATIONS.HTTP.notification);

                TEST_DEVICE_NOTIFICATIONS.HTTP.id = notifications[0].id;
                done();
            })
            .catch(done);

        setTimeout(() => {
            TEST_DEVICE_NOTIFICATIONS.HTTP.notification = `notification-${randomString.generate()}`;
            httpDeviceHive.notification.insert(DH_NOTIFICATIONS_TEST_DEVICE.id, new Notification(TEST_DEVICE_NOTIFICATIONS.HTTP));
        }, 100);
    });

    it(`should poll new notification for network with id ${DH_NOTIFICATIONS_TEST_DEVICE.networkId} via HTTP`, done => {
        const notificationPollManyQuery = new NotificationPollManyQuery({
            networkIds: [ DH_NOTIFICATIONS_TEST_DEVICE.networkId ],
            waitTimeout: 1
        });

        httpDeviceHive.notification.pollMany(notificationPollManyQuery)
            .then((notifications) => {
                assert.equal(notifications.length, 1);
                assert.equal(notifications[0].notification, TEST_DEVICE_NOTIFICATIONS.HTTP.notification);

                done();
            })
            .catch(done);

        setTimeout(() => {
            TEST_DEVICE_NOTIFICATIONS.HTTP.notification = `notification-${randomString.generate()}`;
            httpDeviceHive.notification.insert(DH_NOTIFICATIONS_TEST_DEVICE.id, new Notification(TEST_DEVICE_NOTIFICATIONS.HTTP));
        }, 100);
    });

    it(`should subscribe for notification insertion notifications on device with id ${DH_NOTIFICATIONS_TEST_DEVICE.id} via HTTP`, done => {
        const notificationPollQuery = new NotificationPollQuery({ deviceId: DH_NOTIFICATIONS_TEST_DEVICE.id });
        let subscriptionId;

        httpDeviceHive.notification.subscribe(notificationPollQuery)
            .then((response) => {
                subscriptionId = response.subscriptionId;

                httpDeviceHive.on(`message`, (command) => {
                    assert.equal(command.notification, TEST_DEVICE_NOTIFICATIONS.HTTP.notification);
                    httpDeviceHive.notification.unsubscribe(subscriptionId)
                        .then(() => done())
                        .catch(done);
                });

                setTimeout(() => {
                    TEST_DEVICE_NOTIFICATIONS.HTTP.notification = `command-${randomString.generate()}`;
                    httpDeviceHive.notification.insert(DH_NOTIFICATIONS_TEST_DEVICE.id, new Notification(TEST_DEVICE_NOTIFICATIONS.HTTP));
                }, 100);
            })
            .catch(done);
    });

    it(`should subscribe for notification insertion notifications on device with id ${DH_NOTIFICATIONS_TEST_DEVICE.id} via WS`, done => {
        const notificationPollQuery = new NotificationPollQuery({ deviceId: DH_NOTIFICATIONS_TEST_DEVICE.id });
        let subscriptionId;

        wsDeviceHive.notification.subscribe(notificationPollQuery)
            .then((response) => {
                subscriptionId = response.subscriptionId;

                setTimeout(() => {
                    wsDeviceHive.on(`message`, (command) => {
                        assert.equal(command.notification, TEST_DEVICE_NOTIFICATIONS.WS.notification);
                        wsDeviceHive.notification.unsubscribe(subscriptionId)
                            .then(() => done())
                            .catch(done);
                    });
                }, 200);

                setTimeout(() => {
                    TEST_DEVICE_NOTIFICATIONS.WS.notification = `command-${randomString.generate()}`;
                    wsDeviceHive.notification.insert(DH_NOTIFICATIONS_TEST_DEVICE.id, new Notification(TEST_DEVICE_NOTIFICATIONS.WS));
                }, 300);
            })
            .catch(done);
    });

    after(done => {
        httpDeviceHive.device.delete(DH_NOTIFICATIONS_TEST_DEVICE.id)
            .then(() => {
                httpDeviceHive.disconnect();
                wsDeviceHive.disconnect();

                done();
            });
    });
});