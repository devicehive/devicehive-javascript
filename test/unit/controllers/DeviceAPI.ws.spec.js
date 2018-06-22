const chai = require(`chai`);
const assert = chai.assert;
const ws = require('ws');

const EventEmitter = require('events');
const events = new EventEmitter();

const DeviceHive = require('../../../index');

let mainService, deviceHive;

describe('DeviceAPI WS', () => {

    before(done => {
        // WS SERVER

        mainService = new ws.Server({ port: 4390 });

        mainService.on('connection', socket => {
            socket.on('message', data => {
                const message = JSON.parse(data);
                if (message.action === 'token') {
                    const cred = {
                        action: message.action,
                        requestId: message.requestId,
                        accessToken: 'eyJhbGciOiJIUzI1NiJ9',
                        refreshToken: 'eyJhbGciOiJIUzI1NiJ8'
                    };
                    socket.send(JSON.stringify(cred));
                } else {
                    events.emit('request', message);
                }

                socket.send(JSON.stringify({ requestId: message.requestId }));
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

    it('DeviceAPI.get()', done => {

        const expected = {
            deviceId: 1
        }

        deviceHive.device.get(expected.deviceId);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'device/get', 'Not correct action');
            assert.include(data, expected, 'Not correct data');

            done();
        });
    });

    it('DeviceAPI.list()', done => {

        const expected = {
            networkId: '1'
        };

        // Configurating Device List query
        const deviceListQuery = new DeviceHive.models.query.DeviceListQuery(expected);

        deviceHive.device.list(deviceListQuery);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'device/list', 'Not correct action');
            assert.include(data, expected, 'Not correct data');

            done();
        });
    });


    it('DeviceAPI.add()', done => {

        // Configurating Device model
        const expected = {
            id: 'myTestId',
            name: 'myTestName',
            networkId: 1,
            deviceTypeId: 1,
            isBlocked: false
        };
        const device = new DeviceHive.models.Device(expected);

        deviceHive.device.add(device);


        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'device/save', 'Not correct action');
            assert.equal(data.deviceId, expected.id, 'Not correct data');
            assert.deepEqual(data.device, expected, 'Not correct data');

            done();
        });
    });

    it('DeviceAPI.count()', done => {

        const expected = {
            networkId: '1'
        };

        // Configurating Device List query
        const deviceListQuery = new DeviceHive.models.query.DeviceCountQuery(expected);

        deviceHive.device.count(deviceListQuery);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'device/count', 'Not correct action');
            assert.include(data, expected, 'Not correct data');

            done();
        });
    });

    it('DeviceAPI.delete()', done => {

        const expected = {
            deviceId: 1
        }

        deviceHive.device.delete(expected.deviceId);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'device/delete', 'Not correct action');
            assert.include(data, expected, 'Not correct data');

            done();
        });
    });
});