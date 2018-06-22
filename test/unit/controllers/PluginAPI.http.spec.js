const chai = require(`chai`);
const assert = chai.assert;
const http = require('http');
const url = require('url');
const querystring = require('querystring');

const EventEmitter = require('events');
const events = new EventEmitter();

const DeviceHive = require('../../../index');

let authService, mainService, pluginService, deviceHive;

describe('PluginAPI HTTP', () => {

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
            }).on('data', chunk => {
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

        // pluginService
        pluginService = http.createServer((request, res) => {
            let body = [];
            request.on('error', (err) => {
                console.error(err);
            }).on('data', chunk => {
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
        }).listen(3392);

        // Configaratuion DeviceHive
        deviceHive = new DeviceHive({
            login: `dhadmin`,
            password: `dhadmin_#911`,
            mainServiceURL: 'http://localhost:3390',
            authServiceURL: 'http://localhost:3391',
            pluginServiceURL: 'http://localhost:3392',
            autoUpdateSession: false
        });

        deviceHive.connect()
            .then(() => done());
    })

    after(() => {
        authService.close();
        mainService.close();
        pluginService.close();
    });


    it('PluginAPI.list()', done => {

        const expectedQuery = {
            name: 'string',
            namePattern: 'string',
            topicName: 'string',
            status: '1',
            userId: '1',
            sortField: 'string',
            sortOrder: 'string',
            take: '1',
            skip: '1'
        };

        // Configurating Plugin List query
        const pluginListQuery = new DeviceHive.models.query.PluginListQuery(expectedQuery);

        deviceHive.plugin.list(pluginListQuery);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'GET', 'Not correct method');
            assert.equal(data.url.pathname, '/plugin', 'Not correct URL');
            assert.deepEqual(data.url.parameters, expectedQuery, 'Not correct query');

            done();
        });
    });


    it('PluginAPI.register()', done => {

        // Configurating Plugin model
        const expectedBody = {
            name: 'string',
            description: 'string',
            parameters: {
                jsonString: 'string'
            }
        };

        const expectedQuery = {
            deviceId: 'string',
            networkIds: 'string',
            deviceTypeIds: 'string',
            names: 'string',
            returnCommands: 'false',
            returnUpdatedCommands: 'false',
            returnNotifications: 'false'
        };
        const plugin = new DeviceHive.models.Plugin(expectedBody);
        const pluginQuery = new DeviceHive.models.query.PluginRegisterQuery(expectedQuery);

        deviceHive.plugin.register(plugin, pluginQuery);


        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'POST', 'Not correct method');
            assert.equal(data.url.pathname, `/plugin`, 'Not correct URL');
            assert.deepEqual(data.body, expectedBody, 'Not correct body');
            assert.deepEqual(data.url.parameters, expectedQuery, 'Not correct query');

            done();
        });
    });


    it('PluginAPI.update()', done => {

        // Configurating Plugin model
        const expectedQuery = {
            topicName: 'string',
            deviceId: 'string',
            networkIds: 'string',
            deviceTypeIds: 'string',
            names: 'string',
            returnCommands: 'false',
            returnUpdatedCommands: 'false',
            returnNotifications: 'false',
            status: 'string',
            name: 'string',
            description: 'string',
            parameters: 'string'
        };
        const plugin = new DeviceHive.models.query.PluginUpdateQuery(expectedQuery);

        deviceHive.plugin.update(plugin);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'PUT', 'Not correct method');
            assert.equal(data.url.pathname, `/plugin`, 'Not correct URL');
            assert.deepEqual(data.url.parameters, expectedQuery, 'Not correct query');

            done();
        });
    });

    it('PluginAPI.count()', done => {

        const expectedQuery = {
            name: 'string',
            namePattern: 'string',
            topicName: 'string',
            status: '1',
            userId: '1'
        };

        // Configurating Plugin List query
        const pluginListQuery = new DeviceHive.models.query.PluginCountQuery(expectedQuery);

        deviceHive.plugin.count(pluginListQuery);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'GET', 'Not correct method');
            assert.equal(data.url.pathname, '/plugin/count', 'Not correct URL');
            assert.deepEqual(data.url.parameters, expectedQuery, 'Not correct query');

            done();
        });
    });

    it('PluginAPI.delete()', done => {

        const expectedBody = {
            topicName: 'name'
        };

        const plugin = new DeviceHive.models.Plugin(expectedBody);
        deviceHive.plugin.delete(plugin.topicName);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'DELETE', 'Not correct method');
            assert.equal(data.url.pathname, `/plugin`, 'Not correct URL');
            assert.deepEqual(data.url.parameters, expectedBody, 'Not correct query');

            done();
        });
    });
});