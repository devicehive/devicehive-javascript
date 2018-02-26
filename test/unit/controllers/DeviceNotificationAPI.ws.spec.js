const chai = require(`chai`);
const assert = chai.assert;
const ws = require('ws');

const EventEmitter = require('events');
const events = new EventEmitter();

const DeviceHive = require('../../../index');

let mainService, deviceHive;

describe('NotificationAPI WS', () => {

    before(done => {
        // WS SERVER

        mainService = new ws.Server({ port: 4390 });

        mainService.on('connection', ws => {
            ws.on('message', data => {
                const message = JSON.parse(data);
                if (message.action === 'token') {
                    const cred = {
                        action: message.action,
                        requestId: message.requestId,
                        accessToken: 'eyJhbGciOiJIUzI1NiJ9',
                        refreshToken: 'eyJhbGciOiJIUzI1NiJ8'
                    };
                    ws.send(JSON.stringify(cred));
                } else {
                    events.emit('request', message);
                }

                ws.send('{}');

            });
        });

        // Configaratuion DeviceHive
        deviceHive = new DeviceHive({
            login: `dhadmin`,
            password: `dhadmin_#911`,
            mainServiceURL: 'ws://localhost:4390',
            autoUpdateSession: false
        });

        deviceHive.connect()
            .then(() => done());
    });

    after(() => {
        mainService.close();
    });

    it('NotificationAPI.get()', done => {

        const expected = {
            deviceId: 1,
            notificationId: 1
        }
        deviceHive.notification.get(expected.deviceId, expected.notificationId);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'notification/get', 'Not correct action');
            assert.include(data, expected, 'Not correct data');

            done();
        });
    });

    it('NotificationAPI.list()', done => {

        const expected = {
            deviceId: 'deviceId',
            start: '2018-02-09T10:09:03.033Z',
            end: '2018-02-09T10:09:03.033Z',
            notification: 'notification',
            status: 'status',
            sortField: 'sortField',
            sortOrder: 'sortOrder',
            take: '1',
            skip: '1'
        };

        // Configurating Notification List query
        const notificationListQuery = new DeviceHive.models.query.NotificationListQuery(expected);

        deviceHive.notification.list(notificationListQuery);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'notification/list', 'Not correct action');
            assert.include(data, expected, 'Not correct data');

            done();
        });
    });


    it('NotificationAPI.insert()', done => {

        const deviceId = 1;

        // Configurating Notification model
        const expected = {
            id: '1',
            notification: 'notification',
            timestamp: '2018-02-09T10:09:03.032Z',
            parameters: {
                jsonString: 'jsonString'
            }
        };
        const notification = new DeviceHive.models.Notification(expected);

        deviceHive.notification.insert(deviceId, notification);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'notification/insert', 'Not correct action');
            assert.deepEqual(data.notification, expected, 'Not correct data');

            done();
        });
    });

    it('NotificationAPI.subscribe()', done => {

        const expected = {
            deviceId: 'deviceId',
            names: 'names',
            timestamp: '2018-02-09T10:09:03.033Z',
            waitTimeout: '10'
        };

        // Configurating Notification List query
        const notificationPollQuery = new DeviceHive.models.query.NotificationPollQuery(expected);

        deviceHive.notification.subscribe(notificationPollQuery);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'notification/subscribe', 'Not correct action');
            assert.include(data, expected, 'Not correct data');

            done();
        });
    });

    it('NotificationAPI.unsubscribe()', done => {

        const expected = {
            subscriptionId: '10'
        };

        // Configurating Notification List query
        const notificationPollQuery = new DeviceHive.models.query.NotificationPollQuery(expected);

        deviceHive.notification.unsubscribe(expected.subscriptionId);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'notification/unsubscribe', 'Not correct action');
            assert.include(data, expected, 'Not correct data');

            done();
        });
    });
});