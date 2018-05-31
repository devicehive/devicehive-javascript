const randomString = require(`randomstring`);
const chai = require(`chai`);
const assert = chai.assert;
const config = require('../config');
const DeviceHive = require('../../../index');
const Device = DeviceHive.models.Device;
const Command = DeviceHive.models.Command;
const CommandGetQuery = DeviceHive.models.query.CommandGetQuery;
const CommandListQuery = DeviceHive.models.query.CommandListQuery;
const CommandPollQuery = DeviceHive.models.query.CommandPollQuery;
const CommandPollManyQuery = DeviceHive.models.query.CommandPollManyQuery;
const CommandWaitQuery = DeviceHive.models.query.CommandWaitQuery;

const httpDeviceHive = new DeviceHive(config.server.http);
const wsDeviceHive = new DeviceHive(config.server.ws);


const TIMESTAMP = new Date().toISOString();
const DH_COMMANDS_TEST_DEVICE = {
    id: randomString.generate(),
    name: `DH_COMMANDS_TEST_DEVICE`,
    networkId: 1,
    deviceTypeId: 1,
    isBlocked: false,
    data: {}
};
const TEST_DEVICE_COMMANDS = {
    HTTP: {
        deviceId: DH_COMMANDS_TEST_DEVICE.id,
        command: `command-${randomString.generate()}`,
        timestamp: TIMESTAMP,
        userId: 1,
        networkId: 1,
        deviceTypeId: 1,
        parameters: {
            jsonString: 'jsonString'
        },
        lifetime: 0,
        status: 'status',
        result: {
            jsonString: 'jsonString'
        }
    },
    WS: {
        deviceId: DH_COMMANDS_TEST_DEVICE.id,
        command: `command-${randomString.generate()}`,
        timestamp: TIMESTAMP,
        userId: 1,
        networkId: 1,
        deviceTypeId: 1,
        parameters: {
            jsonString: 'jsonString'
        },
        lifetime: 0,
        status: 'status',
        result: {
            jsonString: 'jsonString'
        }
    }
};

describe('DeviceCommandAPI', () => {

    before(done => {
        Promise.all([httpDeviceHive.connect(), wsDeviceHive.connect()])
            .then(() => httpDeviceHive.device.add(new Device(DH_COMMANDS_TEST_DEVICE)))
            .then(() => done())
            .catch(done);
    });

    it(`should insert new command with name ${TEST_DEVICE_COMMANDS.HTTP.command} via HTTP`, done => {
        const commandModel = new Command(TEST_DEVICE_COMMANDS.HTTP);

        httpDeviceHive.command.insert(DH_COMMANDS_TEST_DEVICE.id, commandModel)
            .then((commandResponse) => {
                TEST_DEVICE_COMMANDS.HTTP.id = commandResponse.id;

                done();
            })
            .catch(done);
    });

    it(`should insert new command with name ${TEST_DEVICE_COMMANDS.WS.command} via WS`, done => {
        const commandModel = new Command(TEST_DEVICE_COMMANDS.WS);

        wsDeviceHive.command.insert(DH_COMMANDS_TEST_DEVICE.id, commandModel)
            .then((commandResponse) => {
                TEST_DEVICE_COMMANDS.WS.id = commandResponse.id;

                done();
            })
            .catch(done);
    });

    it(`should list all commands for device with id ${DH_COMMANDS_TEST_DEVICE.id} via HTTP`, done => {
        const commandListQuery = new CommandListQuery({
            deviceId: DH_COMMANDS_TEST_DEVICE.id
        });

        httpDeviceHive.command.list(commandListQuery)
            .then(commands => {
                assert.equal(commands.length, Object.keys(TEST_DEVICE_COMMANDS).length);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should list all commands for device with id ${DH_COMMANDS_TEST_DEVICE.id} via WS`, done => {
        const commandListQuery = new CommandListQuery({
            deviceId: DH_COMMANDS_TEST_DEVICE.id
        });

        wsDeviceHive.command.list(commandListQuery)
            .then(commands => {
                assert.equal(commands.length, Object.keys(TEST_DEVICE_COMMANDS).length);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should get command with id ${TEST_DEVICE_COMMANDS.HTTP.id} for device with id ${DH_COMMANDS_TEST_DEVICE.id} via HTTP`, done => {
        httpDeviceHive.command.get(DH_COMMANDS_TEST_DEVICE.id, TEST_DEVICE_COMMANDS.HTTP.id)
            .then(command => {
                assert.equal(command.id, TEST_DEVICE_COMMANDS.HTTP.id);
            })
            .then(done)
            .catch(done);
    });

    it(`should get command with id ${TEST_DEVICE_COMMANDS.WS.id} for device with id ${DH_COMMANDS_TEST_DEVICE.id} via WS`, done => {
        wsDeviceHive.command.get(DH_COMMANDS_TEST_DEVICE.id, TEST_DEVICE_COMMANDS.WS.id)
            .then(command => {
                assert.equal(command.id, TEST_DEVICE_COMMANDS.WS.id);
            })
            .then(done)
            .catch(done);
    });

    it(`should not get command with id ${TEST_DEVICE_COMMANDS.HTTP.id} for device with id ${DH_COMMANDS_TEST_DEVICE.id} via HTTP (returnUpdatedCommands = true)`, done => {
        httpDeviceHive.command.get(DH_COMMANDS_TEST_DEVICE.id, TEST_DEVICE_COMMANDS.HTTP.id, new CommandGetQuery({ returnUpdatedCommands: true }))
            .catch(() => done());
    });

    it(`should update command with id ${TEST_DEVICE_COMMANDS.HTTP.id} for device with id ${DH_COMMANDS_TEST_DEVICE.id} via HTTP`, done => {
        TEST_DEVICE_COMMANDS.HTTP.status = `status-${randomString.generate()}`;

        const commandModel = new Command(TEST_DEVICE_COMMANDS.HTTP);

        httpDeviceHive.command.update(commandModel)
            .then(() => httpDeviceHive.command.get(DH_COMMANDS_TEST_DEVICE.id, TEST_DEVICE_COMMANDS.HTTP.id))
            .then((command) => {
                assert.equal(command.status, TEST_DEVICE_COMMANDS.HTTP.status);

                done();
            })
            .catch(done);
    });

    it(`should get updated command with id ${TEST_DEVICE_COMMANDS.HTTP.id} for device with id ${DH_COMMANDS_TEST_DEVICE.id} via HTTP (returnUpdatedCommands = true)`, done => {
        httpDeviceHive.command.get(DH_COMMANDS_TEST_DEVICE.id, TEST_DEVICE_COMMANDS.HTTP.id, new CommandGetQuery({ returnUpdatedCommands: true }))
            .then(command => {
                assert.equal(command.id, TEST_DEVICE_COMMANDS.HTTP.id);
            })
            .then(done)
            .catch(done);
    });

    it(`should update command with id ${TEST_DEVICE_COMMANDS.HTTP.id} for device with id ${DH_COMMANDS_TEST_DEVICE.id} via WS`, done => {
        TEST_DEVICE_COMMANDS.WS.status = `status-${randomString.generate()}`;

        const commandModel = new Command(TEST_DEVICE_COMMANDS.WS);

        wsDeviceHive.command.update(commandModel)
            .then(() => wsDeviceHive.command.get(DH_COMMANDS_TEST_DEVICE.id, TEST_DEVICE_COMMANDS.WS.id))
            .then((command) => {
                assert.equal(command.status, TEST_DEVICE_COMMANDS.WS.status);

                done();
            })
            .catch(done);
    });

    it(`should poll new command for device with id ${DH_COMMANDS_TEST_DEVICE.id} via HTTP`, done => {
        const commandPollQuery = new CommandPollQuery({
            deviceId: DH_COMMANDS_TEST_DEVICE.id,
            waitTimeout: 1
        });

        httpDeviceHive.command.poll(commandPollQuery)
            .then((commands) => {
                assert.equal(commands.length, 1);
                assert.equal(commands[0].command, TEST_DEVICE_COMMANDS.HTTP.command);

                TEST_DEVICE_COMMANDS.HTTP.id = commands[0].id;
                done();
            })
            .catch(done);

        setTimeout(() => {
            TEST_DEVICE_COMMANDS.HTTP.command = `command-${randomString.generate()}`;
            httpDeviceHive.command.insert(DH_COMMANDS_TEST_DEVICE.id, new Command(TEST_DEVICE_COMMANDS.HTTP));
        }, 100);
    });

    it(`should poll command update for device with id ${DH_COMMANDS_TEST_DEVICE.id} via HTTP`, done => {
        const commandPollQuery = new CommandPollQuery({
            deviceId: DH_COMMANDS_TEST_DEVICE.id,
            returnUpdatedCommands: true,
            waitTimeout: 1
        });

        httpDeviceHive.command.poll(commandPollQuery)
            .then((commands) => {
                assert.equal(commands.length, 1);
                assert.equal(commands[0].command, TEST_DEVICE_COMMANDS.HTTP.command);
                assert.equal(commands[0].status, TEST_DEVICE_COMMANDS.HTTP.status);

                TEST_DEVICE_COMMANDS.HTTP.id = commands[0].id;
                done();
            })
            .catch(done);

        setTimeout(() => {
            TEST_DEVICE_COMMANDS.HTTP.status = `status-${randomString.generate()}`;
            httpDeviceHive.command.update(new Command(TEST_DEVICE_COMMANDS.HTTP));
        }, 100);
    });

    it(`should poll new command for network with id ${DH_COMMANDS_TEST_DEVICE.networkId} via HTTP`, done => {
        const commandPollManyQuery = new CommandPollManyQuery({
            networkIds: [ DH_COMMANDS_TEST_DEVICE.networkId ],
            waitTimeout: 1
        });

        httpDeviceHive.command.pollMany(commandPollManyQuery)
            .then((commands) => {
                assert.equal(commands.length, 1);
                assert.equal(commands[0].command, TEST_DEVICE_COMMANDS.HTTP.command);

                done();
            })
            .catch(done);

        setTimeout(() => {
            TEST_DEVICE_COMMANDS.HTTP.command = `command-${randomString.generate()}`;
            httpDeviceHive.command.insert(DH_COMMANDS_TEST_DEVICE.id, new Command(TEST_DEVICE_COMMANDS.HTTP));
        }, 100);
    });

    it(`should wait while command will be processed by device with id ${DH_COMMANDS_TEST_DEVICE.id}`, done => {
        const commandWaitQuery = new CommandWaitQuery({ waitTimeout: 1 });

        httpDeviceHive.command.wait(DH_COMMANDS_TEST_DEVICE.id, TEST_DEVICE_COMMANDS.HTTP.id, commandWaitQuery)
            .then((command) => {
                assert.equal(command.status, TEST_DEVICE_COMMANDS.HTTP.status);

                done()
            })
            .catch(done);

        setTimeout(() => {
            TEST_DEVICE_COMMANDS.HTTP.command = `command-${randomString.generate()}`;

            httpDeviceHive.command.insert(DH_COMMANDS_TEST_DEVICE.id, new Command(TEST_DEVICE_COMMANDS.HTTP))
                .then(() => {
                    TEST_DEVICE_COMMANDS.HTTP.status = `status-${randomString.generate()}`;

                    httpDeviceHive.command.update(new Command(TEST_DEVICE_COMMANDS.HTTP));
                });
        }, 100);
    });

    it(`should subscribe for command insertion notifications on device with id ${DH_COMMANDS_TEST_DEVICE.id} via HTTP`, done => {
        const commandPollQuery = new CommandPollQuery({ deviceId: DH_COMMANDS_TEST_DEVICE.id });
        let subscriptionId;

        httpDeviceHive.command.subscribe(commandPollQuery)
            .then((response) => {
                subscriptionId = response.subscriptionId;

                setTimeout(() => {
                    httpDeviceHive.on(`message`, (command) => {
                        assert.equal(command.command, TEST_DEVICE_COMMANDS.HTTP.command);
                        httpDeviceHive.command.unsubscribe(subscriptionId)
                            .then(() => done())
                            .catch(done);
                    });
                }, 300);

                setTimeout(() => {
                    TEST_DEVICE_COMMANDS.HTTP.command = `command-${randomString.generate()}`;
                    httpDeviceHive.command.insert(DH_COMMANDS_TEST_DEVICE.id, new Command(TEST_DEVICE_COMMANDS.HTTP));
                }, 500);
            })
            .catch(done);
    });

    it(`should subscribe for command insertion notifications on device with id ${DH_COMMANDS_TEST_DEVICE.id} via WS`, done => {
        const commandPollQuery = new CommandPollQuery({ deviceId: DH_COMMANDS_TEST_DEVICE.id });
        let subscriptionId;

        wsDeviceHive.command.subscribe(commandPollQuery)
            .then((response) => {
                subscriptionId = response.subscriptionId;

                setTimeout(() => {
                    wsDeviceHive.on(`message`, (command) => {
                        assert.equal(command.command, TEST_DEVICE_COMMANDS.WS.command);
                        wsDeviceHive.command.unsubscribe(subscriptionId)
                            .then(() => done())
                            .catch(done);
                    });
                }, 300);

                setTimeout(() => {
                    TEST_DEVICE_COMMANDS.WS.command = `command-${randomString.generate()}`;
                    wsDeviceHive.command.insert(DH_COMMANDS_TEST_DEVICE.id, new Command(TEST_DEVICE_COMMANDS.WS));
                }, 500);
            })
            .catch(done);
    });

    after(done => {
        httpDeviceHive.device.delete(DH_COMMANDS_TEST_DEVICE.id)
            .then(() => {
                httpDeviceHive.disconnect();
                wsDeviceHive.disconnect();

                done();
            });
    });
});