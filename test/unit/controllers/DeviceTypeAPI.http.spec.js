const chai = require(`chai`);
const assert = chai.assert;
const http = require('http');
const url = require('url');
const querystring = require('querystring');

const EventEmitter = require('events');
const events = new EventEmitter();

const DeviceHive = require('../../../index');

let authService, mainService, deviceHive;

describe('DeviceTypeAPI HTTP', () => {

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
            authServiceURL: 'http://localhost:3391',
            autoUpdateSession: false
        });

        deviceHive.connect()
            .then(() => done());
    })

    after(() => {
        authService.close();
        mainService.close();
    });

    it('DeviceTypeAPI.get()', done => {

        const deviceTypeId = 1;
        deviceHive.deviceType.get(deviceTypeId);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'GET', 'Not correct method');
            assert.equal(data.url.pathname, `/devicetype/${deviceTypeId}`, 'Not correct URL');

            done();
        });
    });

    it('DeviceTypeAPI.list()', done => {

        const expectedQuery = {
            name: 'string',
            namePattern: 'string',
            sortField: 'string',
            sortOrder: 'string',
            take: '1',
            skip: '1'
        };

        // Configurating Device List query
        const deviceTypeListQuery = new DeviceHive.models.query.DeviceTypeListQuery(expectedQuery);

        deviceHive.deviceType.list(deviceTypeListQuery);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'GET', 'Not correct method');
            assert.equal(data.url.pathname, '/devicetype', 'Not correct URL');
            assert.deepEqual(data.url.parameters, expectedQuery, 'Not correct query');

            done();
        });
    });


    it('DeviceTypeAPI.insert()', done => {

        // Configurating DeviceType model
        const expectedBody = {
            name: 'name',
            description: 'description'
        };
        const deviceType = new DeviceHive.models.DeviceType(expectedBody);

        deviceHive.deviceType.insert(deviceType);


        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'POST', 'Not correct method');
            assert.equal(data.url.pathname, `/devicetype`, 'Not correct URL');
            assert.deepEqual(data.body, expectedBody, 'Not correct body');

            done();
        });
    });


    it('DeviceTypeAPI.update()', done => {

        // Configurating DeviceType model
        const expectedBody = {
            id: 'id',
            name: 'name',
            description: 'description'
        };
        const deviceType = new DeviceHive.models.DeviceType(expectedBody);

        deviceHive.deviceType.update(deviceType);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'PUT', 'Not correct method');
            assert.equal(data.url.pathname, `/devicetype/${expectedBody.id}`, 'Not correct URL');
            assert.deepEqual(data.body, expectedBody, 'Not correct body');

            done();
        });
    });

    it('DeviceTypeAPI.count()', done => {

        const expectedQuery = {
            name: 'name',
            namePattern: 'namePattern'
        };

        // Configurating DeviceType List query
        const deviceTypeListQuery = new DeviceHive.models.query.DeviceTypeCountQuery(expectedQuery);

        deviceHive.deviceType.count(deviceTypeListQuery);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'GET', 'Not correct method');
            assert.equal(data.url.pathname, '/devicetype/count', 'Not correct URL');
            assert.deepEqual(data.url.parameters, expectedQuery, 'Not correct query');

            done();
        });
    });

    it('DeviceTypeAPI.delete()', done => {
        const id = '1';
        const expectedQuery = {
            force: 'false'
        }
        const deviceTypeDeleteQuery = new DeviceHive.models.query.DeviceTypeDeleteQuery({
            deviceTypeId: id,
            force: false
        });

        deviceHive.deviceType.delete(deviceTypeDeleteQuery);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'DELETE', 'Not correct method');
            assert.equal(data.url.pathname, `/devicetype/${id}`, 'Not correct URL');
            assert.deepEqual(data.url.parameters, expectedQuery, 'Not correct query');

            done();
        });
    });
});