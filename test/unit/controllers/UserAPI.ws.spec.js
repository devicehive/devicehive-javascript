const chai = require(`chai`);
const assert = chai.assert;
const ws = require('ws');

const EventEmitter = require('events');
const events = new EventEmitter();

const DeviceHive = require('../../../index');

let mainService, deviceHive;

describe('NetworkAPI WS', () => {

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

    it('UserAPI.get()', done => {

        const expected = {
            userId: 1
        }
        deviceHive.user.get(expected.userId);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'user/get', 'Not correct action');
            assert.include(data, expected, 'Not correct data');

            done();
        });
    });

    it('UserAPI.getCurrent()', done => {

        deviceHive.user.getCurrent();

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'user/getCurrent', 'Not correct action');

            done();
        });
    });

    it('UserAPI.list()', done => {

        const expected = {
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
        const userListQuery = new DeviceHive.models.query.UserListQuery(expected);

        deviceHive.user.list(userListQuery);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'user/list', 'Not correct action');
            assert.include(data, expected, 'Not correct data');

            done();
        });
    });


    it('UserAPI.insert()', done => {

        // Configurating User model
        const expected = {
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
        const user = new DeviceHive.models.User(expected);

        deviceHive.user.insert(user);


        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'user/insert', 'Not correct action');
            assert.deepEqual(data.user, expected, 'Not correct data');

            done();
        });
    });


    it('UserAPI.update()', done => {

        // Configurating User model
        const expected = {
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
        const user = new DeviceHive.models.User(expected);

        deviceHive.user.update(user);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'user/update', 'Not correct action');
            assert.deepEqual(data.user, expected, 'Not correct data');

            done();
        });
    });


    it('UserAPI.updateCurrent()', done => {

        // Configurating User model
        const expected = {
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
        const user = new DeviceHive.models.User(expected);

        deviceHive.user.updateCurrent(user);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'user/updateCurrent', 'Not correct action');
            assert.deepEqual(data.user, expected, 'Not correct data');

            done();
        });
    });


    it('UserAPI.count()', done => {

        const expected = {
            login: 'login',
            loginPattern: 'loginPattern',
            role: '1',
            status: '1',
        };

        // Configurating User List query
        const userListQuery = new DeviceHive.models.query.UserCountQuery(expected);

        deviceHive.user.count(userListQuery);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'user/count', 'Not correct action');
            assert.include(data, expected, 'Not correct data');

            done();
        });
    });


    it('UserAPI.delete()', done => {

        const expected = {
            userId: 'userid'
        }

        deviceHive.user.delete(expected.userId);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'user/delete', 'Not correct action');
            assert.include(data, expected, 'Not correct data');

            done();
        });
    });

    it('UserAPI.unassignNetwork()', done => {

        const expected = {
            userId: 1,
            networkId: 2
        }
        deviceHive.user.unassignNetwork(expected.userId, expected.networkId);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'user/unassignNetwork', 'Not correct action');
            assert.include(data, expected, 'Not correct data');

            done();
        });
    });


    it('UserAPI.getNetwork()', done => {

        const expected = {
            userId: 1,
            networkId: 2
        }
        deviceHive.user.getNetwork(expected.userId, expected.networkId);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'user/getNetwork', 'Not correct action');
            assert.include(data, expected, 'Not correct data');

            done();
        });
    });


    it('UserAPI.assignNetwork()', done => {

        const expected = {
            userId: 1,
            networkId: 2
        }
        deviceHive.user.assignNetwork(expected.userId, expected.networkId);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'user/assignNetwork', 'Not correct action');
            assert.include(data, expected, 'Not correct data');

            done();
        });
    });

});