const chai = require(`chai`);
const assert = chai.assert;
const http = require('http');
const url = require('url');
const querystring = require('querystring');

const EventEmitter = require('events');
const events = new EventEmitter();

const DeviceHive = require('../../../index');

let authService, mainService, deviceHive;

describe('DeviceAPI', () => {

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

    it('DeviceAPI.get()', done => {

        const deviceid = 1;

        deviceHive.device.get(deviceid);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'GET', 'Not correct method');
            assert.equal(data.url.pathname, `/device/${deviceid}`, 'Not correct URL');

            done();
        });
    });

    it('DeviceAPI.list()', done => {

        const expectedQuery = {
            networkId: '1'
        };

        // Configurating Device List query
        const deviceListQuery = new DeviceHive.models.query.DeviceListQuery(expectedQuery);

        deviceHive.device.list(deviceListQuery);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'GET', 'Not correct method');
            assert.equal(data.url.pathname, '/device', 'Not correct URL');
            assert.deepEqual(data.url.parameters, expectedQuery, 'Not correct query');

            done();
        });
    });


    it('DeviceAPI.add()', done => {

        // Configurating Device model
        const expectedBody = {
            id: 'myTestId',
            name: 'myTestName',
            networkId: 1,
            deviceTypeId: 1,
            isBlocked: false
        };
        const device = new DeviceHive.models.Device(expectedBody);

        deviceHive.device.add(device);


        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'PUT', 'Not correct method');
            assert.equal(data.url.pathname, `/device/${expectedBody.id}`, 'Not correct URL');
            assert.deepEqual(data.body, expectedBody, 'Not correct body');

            done();
        });
    });

    it('DeviceAPI.count()', done => {

        const expectedQuery = {
            networkId: '1'
        };

        // Configurating Device List query
        const deviceListQuery = new DeviceHive.models.query.DeviceCountQuery(expectedQuery);

        deviceHive.device.count(deviceListQuery);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'GET', 'Not correct method');
            assert.equal(data.url.pathname, '/device/count', 'Not correct URL');
            assert.deepEqual(data.url.parameters, expectedQuery, 'Not correct query');

            done();
        });
    });

    it('DeviceAPI.delete()', done => {

        const deviceid = 1;

        deviceHive.device.delete(deviceid);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'DELETE', 'Not correct method');
            assert.equal(data.url.pathname, `/device/${deviceid}`, 'Not correct URL');

            done();
        });
    });
});