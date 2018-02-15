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

    it('NetworkAPI.get()', done => {

        const expected = {
            networkId: 1
        };
        deviceHive.network.get(expected.networkId);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'network/get', 'Not correct action');
            assert.include(data, expected, 'Not correct data');

            done();
        });
    });

    it('NetworkAPI.list()', done => {

        const expected = {
            name: 'name',
            namePattern: 'namePattern',
            sortField: 'sortField',
            sortOrder: 'sortOrder',
            take: '1',
            skip: '1'
        };

        // Configurating Device List query
        const networkListQuery = new DeviceHive.models.query.NetworkListQuery(expected);

        deviceHive.network.list(networkListQuery);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'network/list', 'Not correct action');
            assert.include(data, expected, 'Not correct data');

            done();
        });
    });


    it('NetworkAPI.insert()', done => {

        // Configurating Network model
        const expected = {
            name: 'name',
            description: 'description'
        };
        const network = new DeviceHive.models.Network(expected);

        deviceHive.network.insert(network);


        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'network/insert', 'Not correct action');
            assert.include(data.network, expected, 'Not correct data');

            done();
        });
    });


    it('NetworkAPI.update()', done => {

        // Configurating Network model
        const expected = {
            id: 'id',
            name: 'name',
            description: 'description'
        };
        const network = new DeviceHive.models.Network(expected);

        deviceHive.network.update(network);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'network/update', 'Not correct action');
            assert.equal(data.networkId, expected.id, 'Not correct data');
            assert.include(data.network, expected, 'Not correct data');

            done();
        });
    });

    it('NetworkAPI.count()', done => {

        const expected = {
            name: 'name',
            namePattern: 'namePattern'
        };

        // Configurating Network List query
        const networkListQuery = new DeviceHive.models.query.NetworkCountQuery(expected);

        deviceHive.network.count(networkListQuery);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'network/count', 'Not correct action');
            assert.include(data, expected, 'Not correct data');

            done();
        });
    });

    it('NetworkAPI.delete()', done => {

        const expected = {
            networkId: '1'
        }

        deviceHive.network.delete(expected.networkId);

        // sent data
        events.once('request', data => {
            assert.equal(data.action, 'network/delete', 'Not correct action');
            assert.include(data, expected, 'Not correct data');

            done();
        });
    });
});