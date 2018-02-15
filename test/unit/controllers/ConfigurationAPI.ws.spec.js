const chai = require(`chai`);
const assert = chai.assert;
const ws = require('ws');

const EventEmitter = require('events');
const events = new EventEmitter();

const DeviceHive = require('../../../index');

let mainService, deviceHive;

describe('ConfigurationAPI WS', () => {

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


    it('ConfigurationAPI.get()', done => {

        const expected = {
            name: 'name'
        }

        deviceHive.configuration.get(expected.name);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'configuration/get', 'Not correct action');
            assert.include(data, expected, 'Not correct data');

            done();
        });
    });


    it('ConfigurationAPI.put()', done => {

        // Configurating Configaration model
        const expected = {
            name: 'myTestName',
            value: 'string'
        };
        const configuration = new DeviceHive.models.Configuration(expected);

        deviceHive.configuration.put(configuration);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'configuration/put', 'Not correct action');
            assert.include(data, expected, 'Not correct data');
            done();
        });
    });

    it('ConfigurationAPI.delete()', done => {

        const expected = {
            name: 'myTestName'
        };

        deviceHive.configuration.delete(expected.name);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'configuration/delete', 'Not correct action');
            assert.include(data, expected, 'Not correct data');

            done();
        });
    });
});