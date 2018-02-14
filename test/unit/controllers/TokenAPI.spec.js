const chai = require(`chai`);
const assert = chai.assert;
const http = require('http');
const url = require('url');
const querystring = require('querystring');

const EventEmitter = require('events');
const events = new EventEmitter();

const DeviceHive = require('../../../index');

let authService, mainService, deviceHive;

describe('TokenAPI', () => {

    before(done => {
        // authService
        authService = http.createServer((request, res) => {
            if (request.url === '/token' && request.method === 'POST') {
                const cred = {
                    accessToken: 'eyJhbGciOiJIUzI1NiJ9',
                    refreshToken: 'eyJhbGciOiJIUzI1NiJ8'
                };
                res.write(JSON.stringify(cred));
            }

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

            res.end();

        }).listen(3391);

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
    });

    it('TokenAPI.login()', done => {

        const expectedBody = {
            login: 'login',
            password: 'password'
        };

        const token = expectedBody;

        deviceHive.token.login(token.login, token.password);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'POST', 'Not correct method');
            assert.equal(data.url.pathname, '/token', 'Not correct URL');
            assert.deepEqual(data.body, expectedBody, 'Not correct query');

            done();
        });
    });


    it('TokenAPI.createUserToken()', done => {

        // Configurating Token model
        const expectedBody = {
            userId: 1,
            actions: ['string'],
            networkIds: ['string'],
            deviceTypeIds: ['string'],
            expiration: '2018-02-09T10:09:03.033Z'
        };
        const token = new DeviceHive.models.UserToken(expectedBody);

        deviceHive.token.createUserToken(token);


        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'POST', 'Not correct method');
            assert.equal(data.url.pathname, `/token/create`, 'Not correct URL');
            assert.deepEqual(data.body, expectedBody, 'Not correct body');

            done();
        });
    });

    it('TokenAPI.createPluginToken()', done => {

        // Configurating Token model
        const sourceBody = {
            actions: [0],
            expiration: '2018-02-09T10:09:03.033Z',
            type: 0,
            topicName: 'string'
        }
        const expectedBody = {
            a: [0],
            e: '2018-02-09T10:09:03.033Z',
            t: 0,
            tpc: 'string'
        };
        const token = new DeviceHive.models.PluginToken(sourceBody);

        deviceHive.token.createPluginToken(token);


        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'POST', 'Not correct method');
            assert.equal(data.url.pathname, `/token/plugin/create`, 'Not correct URL');
            assert.deepEqual(data.body, expectedBody, 'Not correct body');

            done();
        });
    });


    it('TokenAPI.refresh()', done => {

        // Configurating Token model
        const expectedBody = {
            refreshToken: 'refreshToken'
        };

        const token = expectedBody;

        deviceHive.token.refresh(token);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'POST', 'Not correct method');
            assert.equal(data.url.pathname, `/token/refresh`, 'Not correct URL');
            assert.deepEqual(data.body, expectedBody, 'Not correct body');

            done();
        });
    });

    it('TokenAPI.authPlugin()', done => {

        const token = 'token';

        deviceHive.token.authPlugin(token);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'GET', 'Not correct method');
            assert.equal(data.url.pathname, `/token/plugin/authenticate`, 'Not correct URL');
            assert.deepEqual(data.url.parameters, { token }, 'Not correct query');

            done();
        });
    });
});