const chai = require(`chai`);
const assert = chai.assert;
const ws = require('ws');

const EventEmitter = require('events');
const events = new EventEmitter();

const DeviceHive = require('../../../index');

let mainService, deviceHive;

describe('InfoAPI WS', () => {

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
                } else {
                    events.emit('request', message);
                }

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


    it('InfoAPI.getServerInfo()', done => {
        deviceHive.info.getServerInfo();

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'server/info', 'Not correct action');

            done();
        });
    });

    it('InfoAPI.getClusterInfo()', done => {
        deviceHive.info.getClusterInfo();

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'cluster/info', 'Not correct action');

            done();
        });
    });
});