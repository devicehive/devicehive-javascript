const chai = require(`chai`);
const assert = chai.assert;
const http = require('http');
const url = require('url');
const querystring = require('querystring');

const EventEmitter = require('events');
const events = new EventEmitter();

const DeviceHive = require('../../../index');

let authService, mainService, deviceHive;

describe('NotificationAPI', () => {

    before(done => {
        // authService
        authService = http.createServer((request, res) => {
            const cred = {
                accessToken: 'eyJhbGciOiJIUzI1NiJ9',
                refreshToken: 'eyJhbGciOiJIUzI1NiJ8'
            };
            res.end(JSON.stringify(cred));
        }).listen(3391);

        // mainService
        mainService = http.createServer((request, res) => {

            let body = [];
            request.on('error', (err) => {
                console.error(err);
            }).on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                body = Buffer.concat(body).toString();
                parsedURL = url.parse(request.url);
                events.emit('request', {
                    method: request.method,
                    url: {
                        ...parsedURL,
                        parameters: querystring.parse(parsedURL.query)
                    },
                    body: body ? JSON.parse(body) : null
                });
            });
        }).listen(3390);

        // Configaratuion DeviceHive
        deviceHive = new DeviceHive({
            login: `dhadmin`,
            password: `dhadmin_#911`,
            mainServiceURL: 'http://localhost:3390',
            authServiceURL: 'http://localhost:3391'
        });

        deviceHive.connect()
            .then(() => done());
    })

    after(() => {
        authService.close();
        mainService.close();
    });

    it('NotificationAPI.get()', done => {

        const deviceId = 1;
        const notificationId = 1;
        deviceHive.notification.get(deviceId, notificationId);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'GET', 'Not correct method');
            assert.equal(data.url.pathname, `/device/${deviceId}/notification/${notificationId}`, 'Not correct URL');

            done();
        });
    });

    it('NotificationAPI.list()', done => {

        const expectedQuery = {
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
        const notificationListQuery = new DeviceHive.models.query.NotificationListQuery(expectedQuery);

        deviceHive.notification.list(notificationListQuery);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'GET', 'Not correct method');
            assert.equal(data.url.pathname, `/device/${expectedQuery.deviceId}/notification`, 'Not correct URL');
            assert.deepEqual(data.url.parameters, expectedQuery, 'Not correct query');

            done();
        });
    });


    it('NotificationAPI.insert()', done => {

        const deviceId = 1;

        // Configurating Notification model
        const expectedBody = {
            id: '1',
            notification: 'notification',
            timestamp: '2018-02-09T10:09:03.032Z',
            parameters: {
                jsonString: 'jsonString'
            }
        };
        const notification = new DeviceHive.models.Notification(expectedBody);

        deviceHive.notification.insert(deviceId, notification);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'POST', 'Not correct method');
            assert.equal(data.url.pathname, `/device/${deviceId}/notification`, 'Not correct URL');
            assert.deepEqual(data.body, expectedBody, 'Not correct body');

            done();
        });
    });

    it('NotificationAPI.poll()', done => {

        const expectedQuery = {
            deviceId: 'deviceId',
            names: 'names',
            timestamp: '2018-02-09T10:09:03.033Z',
            waitTimeout: '10'
        };

        // Configurating Notification List query
        const notificationPollQuery = new DeviceHive.models.query.NotificationPollQuery(expectedQuery);

        deviceHive.notification.poll(notificationPollQuery);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'GET', 'Not correct method');
            assert.equal(data.url.pathname, `/device/${expectedQuery.deviceId}/notification/poll`, 'Not correct URL');
            assert.deepEqual(data.url.parameters, expectedQuery, 'Not correct query');

            done();
        });
    });

    it('NotificationAPI.pollMany()', done => {

        const expectedQuery = {
            deviceIds: 'deviceIds',
            networkIds: '2018-02-09T10:09:03.033Z',
            deviceTypeIds: 'deviceTypeIds',
            names: 'names',
            timestamp: '2018-02-09T10:09:03.033Z',
            waitTimeout: '1'
        };

        // Configurating Notification List query
        const notificationPollManyQuery = new DeviceHive.models.query.NotificationPollManyQuery(expectedQuery);

        deviceHive.notification.pollMany(notificationPollManyQuery);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'GET', 'Not correct method');
            assert.equal(data.url.pathname, `/device/notification/poll`, 'Not correct URL');
            assert.deepEqual(data.url.parameters, expectedQuery, 'Not correct query');

            done();
        });
    });
});