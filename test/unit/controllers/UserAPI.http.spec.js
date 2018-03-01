const chai = require(`chai`);
const assert = chai.assert;
const http = require('http');
const url = require('url');
const querystring = require('querystring');

const EventEmitter = require('events');
const events = new EventEmitter();

const DeviceHive = require('../../../index');

let authService, mainService, deviceHive;

describe('UserAPI HTTP', () => {

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

    it('UserAPI.get()', done => {

        const userId = 1;
        deviceHive.user.get(userId);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'GET', 'Not correct method');
            assert.equal(data.url.pathname, `/user/${userId}`, 'Not correct URL');

            done();
        });
    });

    it('UserAPI.getCurrent()', done => {

        deviceHive.user.getCurrent();

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'GET', 'Not correct method');
            assert.equal(data.url.pathname, `/user/current`, 'Not correct URL');

            done();
        });
    });

    it('UserAPI.list()', done => {

        const expectedQuery = {
            login: 'string',
            loginPattern: 'string',
            role: '1',
            status: '1',
            sortField: 'string',
            sortOrder: 'string',
            take: '1',
            skip: '1',
        };

        // Configurating User List query
        const userListQuery = new DeviceHive.models.query.UserListQuery(expectedQuery);

        deviceHive.user.list(userListQuery);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'GET', 'Not correct method');
            assert.equal(data.url.pathname, '/user', 'Not correct URL');
            assert.deepEqual(data.url.parameters, expectedQuery, 'Not correct query');

            done();
        });
    });


    it('UserAPI.insert()', done => {

        // Configurating User model
        const expectedBody = {
            id: '1',
            login: 'login',
            role: '0',
            status: '0',
            password: 'password',
            lastLogin: '2018-02-09T10:09:03.033Z',
            data: {
                jsonString: 'jsonString'
            },
            introReviewed: 'false',
            allDeviceTypesAvailable: 'false'
        };
        const user = new DeviceHive.models.User(expectedBody);

        deviceHive.user.insert(user);


        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'POST', 'Not correct method');
            assert.equal(data.url.pathname, `/user`, 'Not correct URL');
            assert.deepEqual(data.body, expectedBody, 'Not correct body');

            done();
        });
    });


    it('UserAPI.update()', done => {

        // Configurating User model
        const expectedBody = {
            id: '1',
            login: 'login',
            role: '0',
            status: '0',
            password: 'password',
            lastLogin: '2018-02-09T10:09:03.033Z',
            data: {
                jsonString: 'jsonString'
            },
            introReviewed: 'false',
            allDeviceTypesAvailable: 'false'
        };
        const user = new DeviceHive.models.User(expectedBody);

        deviceHive.user.update(user);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'PUT', 'Not correct method');
            assert.equal(data.url.pathname, `/user/${expectedBody.id}`, 'Not correct URL');
            assert.deepEqual(data.body, expectedBody, 'Not correct body');

            done();
        });
    });


    it('UserAPI.updateCurrent()', done => {

        // Configurating User model
        const expectedBody = {
            id: '1',
            login: 'login',
            role: '0',
            status: '0',
            password: 'password',
            lastLogin: '2018-02-09T10:09:03.033Z',
            data: {
                jsonString: 'jsonString'
            },
            introReviewed: 'false',
            allDeviceTypesAvailable: 'false'
        };
        const user = new DeviceHive.models.User(expectedBody);

        deviceHive.user.updateCurrent(user);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'PUT', 'Not correct method');
            assert.equal(data.url.pathname, `/user/current`, 'Not correct URL');
            assert.deepEqual(data.body, expectedBody, 'Not correct body');

            done();
        });
    });


    it('UserAPI.count()', done => {

        const expectedQuery = {
            login: 'login',
            loginPattern: 'loginPattern',
            role: '1',
            status: '1',
        };

        // Configurating User List query
        const userListQuery = new DeviceHive.models.query.UserCountQuery(expectedQuery);

        deviceHive.user.count(userListQuery);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'GET', 'Not correct method');
            assert.equal(data.url.pathname, '/user/count', 'Not correct URL');
            assert.deepEqual(data.url.parameters, expectedQuery, 'Not correct query');

            done();
        });
    });


    it('UserAPI.delete()', done => {

        const userid = 'userid';

        deviceHive.user.delete(userid);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'DELETE', 'Not correct method');
            assert.equal(data.url.pathname, `/user/${userid}`, 'Not correct URL');

            done();
        });
    });


    it('UserAPI.getDeviceTypes()', done => {

        const userId = 1;
        deviceHive.user.getDeviceTypes(userId);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'GET', 'Not correct method');
            assert.equal(data.url.pathname, `/user/${userId}/devicetype`, 'Not correct URL');

            done();
        });
    });


    it('UserAPI.unassignAllDeviceTypes()', done => {

        const userid = 'userid';

        deviceHive.user.unassignAllDeviceTypes(userid);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'DELETE', 'Not correct method');
            assert.equal(data.url.pathname, `/user/${userid}/devicetype/all`, 'Not correct URL');

            done();
        });
    });


    it('UserAPI.assignAllDeviceTypes()', done => {

        const userid = 'userid';

        deviceHive.user.assignAllDeviceTypes(userid);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'PUT', 'Not correct method');
            assert.equal(data.url.pathname, `/user/${userid}/devicetype/all`, 'Not correct URL');

            done();
        });
    });

    it('UserAPI.unassignDeviceType()', done => {

        const userId = 1;
        const devicetype = 2;
        deviceHive.user.unassignDeviceType(userId, devicetype);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'DELETE', 'Not correct method');
            assert.equal(data.url.pathname, `/user/${userId}/devicetype/${devicetype}`, 'Not correct URL');

            done();
        });
    });


    it('UserAPI.getDeviceType()', done => {

        const userId = 1;
        const devicetype = 2;
        deviceHive.user.getDeviceType(userId, devicetype);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'GET', 'Not correct method');
            assert.equal(data.url.pathname, `/user/${userId}/devicetype/${devicetype}`, 'Not correct URL');

            done();
        });
    });


    it('UserAPI.assignDeviceType()', done => {

        const userId = 1;
        const devicetype = 2;
        deviceHive.user.assignDeviceType(userId, devicetype);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'PUT', 'Not correct method');
            assert.equal(data.url.pathname, `/user/${userId}/devicetype/${devicetype}`, 'Not correct URL');

            done();
        });
    });

    it('UserAPI.unassignNetwork()', done => {

        const userId = 1;
        const network = 2;
        deviceHive.user.unassignNetwork(userId, network);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'DELETE', 'Not correct method');
            assert.equal(data.url.pathname, `/user/${userId}/network/${network}`, 'Not correct URL');

            done();
        });
    });


    it('UserAPI.getNetwork()', done => {

        const userId = 1;
        const network = 2;
        deviceHive.user.getNetwork(userId, network);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'GET', 'Not correct method');
            assert.equal(data.url.pathname, `/user/${userId}/network/${network}`, 'Not correct URL');

            done();
        });
    });


    it('UserAPI.assignNetwork()', done => {

        const userId = 1;
        const network = 2;
        deviceHive.user.assignNetwork(userId, network);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'PUT', 'Not correct method');
            assert.equal(data.url.pathname, `/user/${userId}/network/${network}`, 'Not correct URL');

            done();
        });
    });

});