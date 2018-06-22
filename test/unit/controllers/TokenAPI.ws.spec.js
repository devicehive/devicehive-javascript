const chai = require(`chai`);
const assert = chai.assert;
const ws = require('ws');

const EventEmitter = require('events');
const events = new EventEmitter();

const DeviceHive = require('../../../index');

let mainService, deviceHive;

describe('TokenAPI WS', () => {

    before(done => {
        // WS SERVER

        mainService = new ws.Server({ port: 4390 });

        mainService.on('connection', socket => {
            socket.on('message', data => {
                const message = JSON.parse(data);
                if (message.action === 'token') {
                    const cred = {
                        action: message.action,
                        requestId: message.requestId,
                        accessToken: 'eyJhbGciOiJIUzI1NiJ9',
                        refreshToken: 'eyJhbGciOiJIUzI1NiJ8'
                    };
                    socket.send(JSON.stringify(cred));
                }
                
                events.emit('request', message);

                socket.send(JSON.stringify({ requestId: message.requestId }));
            });
        });

        // Configaratuion DeviceHive
        deviceHive = new DeviceHive({
            login: `dhadmin`,
            password: `dhadmin_#911`,
            mainServiceURL: 'ws://localhost:4390',
            autoUpdateSession: false
        });

        deviceHive.connect()
            .then(() => done());
    });

    after(() => {
        mainService.close();
    });

    it('TokenAPI.login()', done => {

        const expected = {
            login: 'login',
            password: 'password'
        };

        deviceHive.token.login(expected.login, expected.password);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'token', 'Not correct action');
            assert.include(data, expected, 'Not correct data');

            done();
        });
    });


    it('TokenAPI.createUserToken()', done => {

        // Configurating Token model
        const expected = {
            userId: 1,
            actions: ['string'],
            networkIds: ['string'],
            deviceTypeIds: ['string'],
            expiration: '2018-02-09T10:09:03.033Z'
        };
        const token = new DeviceHive.models.UserToken(expected);

        deviceHive.token.createUserToken(token);


        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'token/create', 'Not correct action');
            assert.deepEqual(data.payload, expected, 'Not correct data');

            done();
        });
    });

    it('TokenAPI.refresh()', done => {

        // Configurating Token model
        const expected = {
            refreshToken: 'refreshToken'
        };

        const token = expected;

        deviceHive.token.refresh(token.refreshToken);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'token/refresh', 'Not correct action');
            assert.include(data, expected, 'Not correct data');

            done();
        });
    });
});