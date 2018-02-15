const chai = require(`chai`);
const assert = chai.assert;
const http = require('http');
const url = require('url');
const querystring = require('querystring');

const EventEmitter = require('events');
const events = new EventEmitter();

const DeviceHive = require('../../../index');

let authService, mainService, deviceHive;

describe('InfoAPI HTTP', () => {

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


    it('InfoAPI.getServerInfo()', done => {
        deviceHive.info.getServerInfo();

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'GET', 'Not correct method');
            assert.equal(data.url.pathname, '/info', 'Not correct URL');

            done();
        });
    });

    it('InfoAPI.getCacheInfo()', done => {
        deviceHive.info.getCacheInfo();

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'GET', 'Not correct method');
            assert.equal(data.url.pathname, '/info/cache', 'Not correct URL');

            done();
        });
    });

    it('InfoAPI.getClusterInfo()', done => {
        deviceHive.info.getClusterInfo();

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'GET', 'Not correct method');
            assert.equal(data.url.pathname, '/info/config/cluster', 'Not correct URL');

            done();
        });
    });
});