const chai = require(`chai`);
const assert = chai.assert;
const ws = require('ws');

const EventEmitter = require('events');
const events = new EventEmitter();

const DeviceHive = require('../../../index');

let mainService, deviceHive;

describe('DeviceTypeAPI WS', () => {

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
            mainServiceURL: 'ws://localhost:4390'
        });

        deviceHive.connect()
            .then(() => done());
    });

    after(() => {
        mainService.close();
    });

    it('DeviceTypeAPI.get()', done => {

        const expected = {
            deviceTypeId: 1
        }
        deviceHive.deviceType.get(expected.deviceTypeId);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'devicetype/get', 'Not correct action');
            assert.include(data, expected, 'Not correct data');

            done();
        });
    });

    it('DeviceTypeAPI.list()', done => {

        const expected = {
            name: 'string',
            namePattern: 'string',
            sortField: 'string',
            sortOrder: 'string',
            take: '1',
            skip: '1'
        };

        // Configurating Device List query
        const deviceTypeListQuery = new DeviceHive.models.query.DeviceTypeListQuery(expected);

        deviceHive.deviceType.list(deviceTypeListQuery);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'devicetype/list', 'Not correct action');
            assert.include(data, expected, 'Not correct data');

            done();
        });
    });


    it('DeviceTypeAPI.insert()', done => {

        // Configurating DeviceType model
        const expected = {
            name: 'name',
            description: 'description'
        };
        const deviceType = new DeviceHive.models.DeviceType(expected);

        deviceHive.deviceType.insert(deviceType);


        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'devicetype/insert', 'Not correct action');
            assert.include(data.deviceType, expected, 'Not correct data');

            done();
        });
    });


    it('DeviceTypeAPI.update()', done => {

        // Configurating DeviceType model
        const expected = {
            id: 'id',
            name: 'name',
            description: 'description'
        };
        const deviceType = new DeviceHive.models.DeviceType(expected);

        deviceHive.deviceType.update(deviceType);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'devicetype/update', 'Not correct action');
            assert.equal(data.deviceTypeId, expected.id, 'Not correct data');
            assert.include(data.deviceType, expected, 'Not correct data');

            done();
        });
    });

    it('DeviceTypeAPI.count()', done => {

        const expected = {
            name: 'name',
            namePattern: 'namePattern'
        };

        // Configurating DeviceType List query
        const deviceTypeListQuery = new DeviceHive.models.query.DeviceTypeCountQuery(expected);

        deviceHive.deviceType.count(deviceTypeListQuery);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'devicetype/count', 'Not correct action');
            assert.include(data, expected, 'Not correct data');

            done();
        });
    });

    it('DeviceTypeAPI.delete()', done => {

        const expected = {
            deviceTypeId: '1'
        }

        deviceHive.deviceType.delete(expected.deviceTypeId);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'devicetype/delete', 'Not correct action');
            assert.include(data, expected, 'Not correct data');

            done();
        });
    });
});