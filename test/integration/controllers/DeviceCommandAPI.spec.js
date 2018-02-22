const chai = require(`chai`);
const assert = chai.assert;
const config = require('../config');

const EventEmitter = require('events');
const events = new EventEmitter();

const DeviceHive = require('../../../index');

const httpDeviceHive = new DeviceHive(config.server.http);
const wsDeviceHive = new DeviceHive(config.server.ws)

const deviceId = 'e50d6085-2aba-48e9-b1c3-73c673e414be2';

const testDeviceCommands = [
    {
        deviceId,
        command: 'command',
        timestamp: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        userId: 1,
        networkId: 1,
        parameters: {
            jsonString: 'jsonString'
        },
        lifetime: 0,
        status: 'status',
        result: {
            jsonString: 'jsonString'
        }
    },
    {
        deviceId,
        command: 'command2',
        timestamp: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        userId: 1,
        networkId: 1,
        parameters: {
            jsonString: 'jsonString'
        },
        lifetime: 0,
        status: 'status',
        result: {
            jsonString: 'jsonString'
        }
    }
];

describe('DeviceCommandAPI', () => {

    before(done => {
        // Configaratuion DeviceHive
        Promise.all([httpDeviceHive.connect(), wsDeviceHive.connect()])
            .then(() => done());
    });


    it('DeviceCommandAPI.insert()', done => {
        const command = new DeviceHive.models.Command(testDeviceCommands[0]);
        const command2 = new DeviceHive.models.Command(testDeviceCommands[1]);

        Promise.all([httpDeviceHive.command.insert(deviceId, command), wsDeviceHive.command.insert(deviceId, command2)])
            .then(() => done())
            .catch(done);
    });


    it('DeviceCommandAPI.list()', done => {

        // Configurating Device List query
        const commandListQuery = new DeviceHive.models.query.CommandListQuery({
            deviceId,
            command: 'command',
            status: 'status',
            sortField: 'id',
            sortOrder: 'id',
            take: 2,
            skip: 0
        });

        Promise.all([httpDeviceHive.command.list(commandListQuery), wsDeviceHive.command.list(commandListQuery)])
            .then(dataAll => {
                for (const data of dataAll) {
                    for (const deviceCommandKey in data) {
                        testDeviceCommands[deviceCommandKey].id = data[deviceCommandKey].id;
                        testDeviceCommands[deviceCommandKey].timestamp = data[deviceCommandKey].timestamp;
                        testDeviceCommands[deviceCommandKey].lastUpdated = data[deviceCommandKey].lastUpdated;
                        assert.containsAllKeys(data[deviceCommandKey], Object.keys(testDeviceCommands[0]));
                    }
                }
            })
            .then(done)
            .catch(done);
    });


    it('DeviceCommand API.get()', done => {


        Promise.all([httpDeviceHive.command.get(deviceId, testDeviceCommands[0].id), wsDeviceHive.command.get(deviceId, testDeviceCommands[0].id)])
            .then(dataAll => {
                const expected = testDeviceCommands[0];
                for (const data of dataAll) {
                    assert.isObject(data);
                    assert.deepInclude(data, expected);
                }
            })
            .then(done)
            .catch(done);
    });


    it('DeviceCommandAPI.update()', done => {

        const command = new DeviceHive.models.Command(testDeviceCommands[0], testDeviceCommands[0]);
        const command2 = new DeviceHive.models.Command(testDeviceCommands[0], testDeviceCommands[1]);

        Promise.all([httpDeviceHive.command.update(command), wsDeviceHive.command.update(command2)])
            .then(() => done())
            .catch(done);
    });


    it('DeviceCommandAPI.poll()', done => {

        // Configurating Command List query
        const commandPollQuery = new DeviceHive.models.query.CommandPollQuery({
            deviceId,
            returnUpdatedCommands: true,
            limit: 1,
            waitTimeout: 1
        });

        httpDeviceHive.command.poll(commandPollQuery)
            .then(() => done())
            .catch(done);

        // emit command
        setTimeout(() => {
            const command = new DeviceHive.models.Command(testDeviceCommands[0]);
            httpDeviceHive.command.insert(deviceId, command);
        }, 50);
    });


    it('DeviceCommandAPI.pollMany()', done => {

        const commandPollManyQuery = new DeviceHive.models.query.CommandPollManyQuery({
            deviceIds: deviceId
        });

        httpDeviceHive.command.pollMany(commandPollManyQuery)
            .then(() => done())
            .catch(done);

        // emit command
        setTimeout(() => {
            const command = new DeviceHive.models.Command(testDeviceCommands[0]);
            httpDeviceHive.command.insert(deviceId, command);
        }, 50);
    });


    it('DeviceCommandAPI.wait()', done => {

        // TODO
        done();

        // Configurating Command List query
        // const commandWaitQuery = new DeviceHive.models.query.CommandWaitQuery({
        //     deviceId,
        //     commandId: testDeviceCommands[0].id,
        //     waitTimeout: 1
        // });

        // httpDeviceHive.command.wait(commandWaitQuery.deviceId, commandWaitQuery.commandId, commandWaitQuery)
        //     .then(() => done())
        //     .catch(done);

        // // emit command
        // const command = new DeviceHive.models.Command(testDeviceCommands[0]);
        // httpDeviceHive.command.insert(deviceId, command);
    });
});