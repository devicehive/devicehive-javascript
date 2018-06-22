const chai = require(`chai`);
const assert = chai.assert;
const http = require('http');
const url = require('url');
const querystring = require('querystring');

const EventEmitter = require('events');
const events = new EventEmitter();

const DeviceHive = require('../../../index');

let authService, mainService, deviceHive;

describe('DeviceCommandAPI HTTP', () => {

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
            let parsedURL;
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

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify({ message: 'Mock server response'}));
            res.end();
        }).listen(3390);

        // Configaratuion DeviceHive
        deviceHive = new DeviceHive({
            login: `dhadmin`,
            password: `dhadmin_#911`,
            mainServiceURL: 'http://localhost:3390',
            authServiceURL: 'http://localhost:3391',
            autoUpdateSession: false
        });

        deviceHive.connect()
            .then(() => done());
    });

    after(() => {
        authService.close();
        mainService.close();
    });

    it('DeviceCommandAPI.get()', done => {
        const deviceId = 1;
        const commandId = 1;
        const query = { returnUpdatedCommands: 'false' };

        deviceHive.command.get(deviceId, commandId);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'GET', 'Not correct method');
            assert.equal(data.url.pathname, `/device/${deviceId}/command/${commandId}`, 'Not correct URL');
            assert.deepEqual(data.url.parameters, query, 'Not correct query');

            done();
        });
    });

    it('DeviceCommandAPI.list()', done => {

        const source = {
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

        const expected = {
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
        const commandListQuery = new DeviceHive.models.query.CommandListQuery(source);

        deviceHive.command.list(commandListQuery);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'GET', 'Not correct method');
            assert.equal(data.url.pathname, `/device/${source.deviceId}/command`, 'Not correct URL');
            assert.deepEqual(data.url.parameters, expected, 'Not correct query');

            done();
        });
    });


    it('DeviceCommandAPI.insert()', done => {

        const deviceId = 1;

        // Configurating Command model
        const expectedBody = {
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
        const command = new DeviceHive.models.Command(expectedBody);

        deviceHive.command.insert(deviceId, command);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'POST', 'Not correct method');
            assert.equal(data.url.pathname, `/device/${deviceId}/command`, 'Not correct URL');
            assert.deepEqual(data.body, expectedBody, 'Not correct body');

            done();
        });
    });


    it('DeviceCommandAPI.update()', done => {

        // Configurating Command model
        const expectedBody = {
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
        const command = new DeviceHive.models.Command(expectedBody);

        deviceHive.command.update(command);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'PUT', 'Not correct method');
            assert.equal(data.url.pathname, `/device/${expectedBody.deviceId}/command/${expectedBody.id}`, 'Not correct URL');
            assert.deepEqual(data.body, expectedBody, 'Not correct body');

            done();
        });
    });

    it('DeviceCommandAPI.poll()', done => {

        const source = {
            deviceId: 'deviceId',
            names: 'names',
            timestamp: '2018-02-09T10:09:03.033Z',
            returnUpdatedCommands: 'returnUpdatedCommands',
            waitTimeout: '10',
            limit: '1',
        };

        const expected = {
            names: 'names',
            timestamp: '2018-02-09T10:09:03.033Z',
            returnUpdatedCommands: 'returnUpdatedCommands',
            waitTimeout: '10',
            limit: '1',
        };

        // Configurating Command List query
        const commandPollQuery = new DeviceHive.models.query.CommandPollQuery(source);

        deviceHive.command.poll(commandPollQuery);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'GET', 'Not correct method');
            assert.equal(data.url.pathname, `/device/${source.deviceId}/command/poll`, 'Not correct URL');
            assert.deepEqual(data.url.parameters, expected, 'Not correct query');

            done();
        });
    });

    it('DeviceCommandAPI.pollMany()', done => {

        const expectedQuery = {
            deviceIds: 'deviceIds',
            networkIds: '2018-02-09T10:09:03.033Z',
            deviceTypeIds: 'deviceTypeIds',
            names: 'string',
            timestamp: '2018-02-09T10:09:03.033Z',
            waitTimeout: '1',
            limit: '1'
        };

        // Configurating Command List query
        const commandPollManyQuery = new DeviceHive.models.query.CommandPollManyQuery(expectedQuery);

        deviceHive.command.pollMany(commandPollManyQuery);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'GET', 'Not correct method');
            assert.equal(data.url.pathname, `/device/command/poll`, 'Not correct URL');
            assert.deepEqual(data.url.parameters, expectedQuery, 'Not correct query');

            done();
        });
    });

    it('DeviceCommandAPI.wait()', done => {

        const source = {
            deviceId: '1',
            commandId: '1',
            waitTimeout: '1'
        };

        const expected = {
            waitTimeout: '1'
        };

        // Configurating Command List query
        const commandWaitQuery = new DeviceHive.models.query.CommandWaitQuery(source);

        deviceHive.command.wait(source.deviceId, source.commandId, commandWaitQuery);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'GET', 'Not correct method');
            assert.equal(data.url.pathname, `/device/${source.deviceId}/command/${source.commandId}/poll`, 'Not correct URL');
            assert.deepEqual(data.url.parameters, expected, 'Not correct query');

            done();
        });
    });
});