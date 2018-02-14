const chai = require(`chai`);
const assert = chai.assert;
const http = require('http');
const url = require('url');
const querystring = require('querystring');

const EventEmitter = require('events');
const events = new EventEmitter();

const DeviceHive = require('../../../index');

let authService, mainService, deviceHive;

describe('NetworkAPI', () => {

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

    it('NetworkAPI.get()', done => {

        const networkId = 1;
        deviceHive.network.get(networkId);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'GET', 'Not correct method');
            assert.equal(data.url.pathname, `/network/${networkId}`, 'Not correct URL');

            done();
        });
    });

    it('NetworkAPI.list()', done => {

        const expectedQuery = {
            name: 'string',
            namePattern: 'string',
            sortField: 'string',
            sortOrder: 'string',
            take: '1',
            skip: '1'
        };

        // Configurating User List query
        const networkListQuery = new DeviceHive.models.query.NetworkListQuery(expectedQuery);

        deviceHive.network.list(networkListQuery);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'GET', 'Not correct method');
            assert.equal(data.url.pathname, '/network', 'Not correct URL');
            assert.deepEqual(data.url.parameters, expectedQuery, 'Not correct query');

            done();
        });
    });


    it('NetworkAPI.insert()', done => {

        // Configurating Network model
        const expectedBody = {
            name: 'name',
            description: 'description'
        };
        const network = new DeviceHive.models.Network(expectedBody);

        deviceHive.network.insert(network);


        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'POST', 'Not correct method');
            assert.equal(data.url.pathname, `/network`, 'Not correct URL');
            assert.deepEqual(data.body, expectedBody, 'Not correct body');

            done();
        });
    });


    it('NetworkAPI.update()', done => {

        // Configurating Network model
        const expectedBody = {
            id: 'id',
            name: 'name',
            description: 'description'
        };
        const network = new DeviceHive.models.Network(expectedBody);

        deviceHive.network.update(network);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'PUT', 'Not correct method');
            assert.equal(data.url.pathname, `/network/${expectedBody.id}`, 'Not correct URL');
            assert.deepEqual(data.body, expectedBody, 'Not correct body');

            done();
        });
    });

    it('NetworkAPI.count()', done => {

        const expectedQuery = {
            name: 'name',
            namePattern: 'namePattern'
        };

        // Configurating Network List query
        const networkListQuery = new DeviceHive.models.query.NetworkCountQuery(expectedQuery);

        deviceHive.network.count(networkListQuery);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'GET', 'Not correct method');
            assert.equal(data.url.pathname, '/network/count', 'Not correct URL');
            assert.deepEqual(data.url.parameters, expectedQuery, 'Not correct query');

            done();
        });
    });

    it('NetworkAPI.delete()', done => {

        const name = 'name';

        deviceHive.network.delete(name);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'DELETE', 'Not correct method');
            assert.equal(data.url.pathname, `/network/${name}`, 'Not correct URL');

            done();
        });
    });
});