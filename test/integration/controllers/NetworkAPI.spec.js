const chai = require(`chai`);
const assert = chai.assert;
const config = require('../config');

const EventEmitter = require('events');
const events = new EventEmitter();

const DeviceHive = require('../../../index');

const httpDeviceHive = new DeviceHive(config.server.http);
const wsDeviceHive = new DeviceHive(config.server.ws);


const testNetworks = [
    {
        name: 'name',
        description: 'description'
    }, {
        name: 'name2',
        description: 'description2'
    }
];

describe('NetworkAPI', () => {

    before(done => {
        // Configaratuion DeviceHive

        Promise.all([httpDeviceHive.connect(), wsDeviceHive.connect()])
            .then(() => done());
    });


    it('NetworkAPI.insert()', done => {

        // Configurating Network model
        const Network = DeviceHive.models.Network;

        const network = new Network(testNetworks[0]);
        const network2 = new Network(testNetworks[1]);

        Promise.all([httpDeviceHive.network.insert(network), wsDeviceHive.network.insert(network2)])
            .then(() => done())
            .catch(done);
    });


    it('NetworkAPI.list()', done => {

        // Configurating Device List query
        const networkListQuery = new DeviceHive.models.query.NetworkListQuery({
            namePattern: 'name%',
            sortField: 'name',
            sortOrder: 'asc',
            take: 2,
            skip: 0
        });


        Promise.all([httpDeviceHive.network.list(networkListQuery), wsDeviceHive.network.list(networkListQuery)])
            .then(dataAll => {
                for (const data of dataAll) {
                    for (const networkKey in data) {
                        testNetworks[networkKey].id = data[networkKey].id;
                        testNetworks[networkKey].name = data[networkKey].name;
                        testNetworks[networkKey].description = data[networkKey].description;
                        assert.containsAllKeys(data[networkKey], Object.keys(testNetworks[0]));
                    }
                }
            })
            .then(done)
            .catch(done);
    });


    it('NetworkAPI.get()', done => {

        Promise.all([httpDeviceHive.network.get(testNetworks[0].id), wsDeviceHive.network.get(testNetworks[0].id)])
            .then(dataAll => {
                const expected = testNetworks[0];
                for (const data of dataAll) {
                    assert.isObject(data);
                    assert.deepInclude(data, expected);
                }
            })
            .then(done)
            .catch(done);
    });


    it('NetworkAPI.update()', done => {

        // Configurating Network model
        const Network = DeviceHive.models.Network;

        const network = new Network(testNetworks[0]);
        const network2 = new Network(testNetworks[1]);

        Promise.all([httpDeviceHive.network.update(network), wsDeviceHive.network.update(network2)])
            .then(() => done())
            .catch(done);

    });

    it('NetworkAPI.count()', done => {

        // Configurating Network List query
        const networkListQuery = new DeviceHive.models.query.NetworkCountQuery({
            name: 'name',
            namePattern: 'namePattern'
        });

        Promise.all([httpDeviceHive.network.count(networkListQuery), wsDeviceHive.network.count(networkListQuery)])
            .then(dataAll => {
                for (const data of dataAll) {
                    assert.property(data, 'count');
                }
            })
            .then(done)
            .catch(done);
    });

    it('NetworkAPI.delete()', done => {
        
        Promise.all([httpDeviceHive.network.delete(testNetworks[0].id), wsDeviceHive.network.delete(testNetworks[1].id)])
            .then(() => done())
            .catch(done);
    });
});