const chai = require(`chai`);
const assert = chai.assert;
const ws = require('ws');

const EventEmitter = require('events');
const events = new EventEmitter();

const DeviceHive = require('../../../index');

let mainService, deviceHive;

describe('DeviceCommandAPI WS', () => {

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

    it('DeviceCommandAPI.get()', done => {

        const expected = {
            deviceId: 1,
            commandId: 1
        };

        deviceHive.command.get(expected.deviceId, expected.commandId);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'command/get', 'Not correct action');
            assert.include(data, expected, 'Not correct data');

            done();
        });
    });

    it('DeviceCommandAPI.list()', done => {

        const expected = {
            deviceId: 'deviceId',
            start: '2018-02-09T10:09:03.033Z',
            end: '2018-02-09T10:09:03.033Z',
            command: 'command',
            status: 'status',
            sortField: 'sortField',
            sortOrder: 'sortOrder',
            take: '1',
            skip: '1'
        };

        // Configurating Device List query
        const commandListQuery = new DeviceHive.models.query.CommandListQuery(expected);

        deviceHive.command.list(commandListQuery);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'command/list', 'Not correct action');
            assert.include(data, expected, 'Not correct data');

            done();
        });
    });


    it('DeviceCommandAPI.insert()', done => {

        const deviceId = 1;

        // Configurating Command model
        
        const expected = {
            id: '1',
            command: 'command',
            timestamp: '2018-02-09T10:09:03.032Z',
            lastUpdated: '2018-02-09T10:09:03.032Z',
            userId: '1',
            deviceId: '1',
            networkId: '1',
            parameters: {
                jsonString: 'jsonString'
            },
            lifetime: 0,
            status: 'status',
            result: {
                jsonString: 'jsonString'
            }
        };
        const command = new DeviceHive.models.Command(expected);

        deviceHive.command.insert(deviceId, command);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'command/insert', 'Not correct action');
            assert.equal(data.deviceId, expected.id, 'Not correct data');
            assert.deepEqual(data.command, expected, 'Not correct data');

            done();
        });
    });


    it('DeviceCommandAPI.update()', done => {

        // Configurating Command model
        const expected = {
            id: '1',
            command: 'command',
            timestamp: '2018-02-09T10:09:03.032Z',
            lastUpdated: '2018-02-09T10:09:03.032Z',
            userId: '1',
            deviceId: '1',
            networkId: '1',
            parameters: {
                jsonString: 'jsonString'
            },
            lifetime: 0,
            status: 'status',
            result: {
                jsonString: 'jsonString'
            }
        };
        const command = new DeviceHive.models.Command(expected);

        deviceHive.command.update(command);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'command/update', 'Not correct action');
            assert.equal(data.deviceId, expected.id, 'Not correct data');
            assert.deepEqual(data.command, expected, 'Not correct data');

            done();
        });
    });


    it('DeviceCommandAPI.subscribe()', done => {

        const expected = {
            deviceId: 'deviceId',
            names: 'names',
            timestamp: '2018-02-09T10:09:03.033Z',
            returnUpdatedCommands: 'returnUpdatedCommands',
            waitTimeout: '10',
            limit: '1'
        };

        // Configurating Command List query
        const commandPollQuery = new DeviceHive.models.query.CommandPollQuery(expected);

        deviceHive.command.subscribe(commandPollQuery);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'command/subscribe', 'Not correct action');
            assert.include(data, expected, 'Not correct data');

            done();
        });
    });

    it('DeviceCommandAPI.unsubscribe()', done => {
        const expected = {
            subscriptionId: '10'
        };

        deviceHive.command.unsubscribe(expected.subscriptionId);

        events.once('request', data => {
            assert.equal(data.action, 'command/unsubscribe', 'Not correct action');

            done();
        });
    });

});