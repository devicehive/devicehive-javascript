const randomString = require(`randomstring`);
const chai = require(`chai`);
const assert = chai.assert;
const config = require('../config');
const DeviceHive = require('../../../index');
const Network = DeviceHive.models.Network;
const NetworkListQuery = DeviceHive.models.query.NetworkListQuery;
const NetworkCountQuery = DeviceHive.models.query.NetworkCountQuery;

const httpDeviceHive = new DeviceHive(config.server.http);
const wsDeviceHive = new DeviceHive(config.server.ws);


const TEST_NETWORK_NAME_PREFIX = `DH-JS-LIB-NETWORK-NAME-`;
const TEST_NETWORK_DESCRIPTION_PREFIX = `DH-JS-LIB-NETWORK-NAME-`;
const TEST_NETWORKS = {
    HTTP: {
        name: `${TEST_NETWORK_NAME_PREFIX}-${randomString.generate()}`,
        description: `${TEST_NETWORK_DESCRIPTION_PREFIX}-${randomString.generate()}`
    },
    WS: {
        name: `${TEST_NETWORK_NAME_PREFIX}-${randomString.generate()}`,
        description: `${TEST_NETWORK_DESCRIPTION_PREFIX}-${randomString.generate()}`
    }
};

describe('NetworkAPI', () => {

    before(done => {
        Promise.all([httpDeviceHive.connect(), wsDeviceHive.connect()])
            .then(() => done());
    });

    it(`should insert new network with next configuration: ${JSON.stringify(TEST_NETWORKS.HTTP)} via HTTP`, done => {
        const networkModel = new Network(TEST_NETWORKS.HTTP);

        httpDeviceHive.network.insert(networkModel)
            .then(({ id }) => {
                TEST_NETWORKS.HTTP.id = id;
                done();
            })
            .catch(done);
    });

    it(`should insert new network with next configuration: ${JSON.stringify(TEST_NETWORKS.WS)} via WS`, done => {
        const networkModel = new Network(TEST_NETWORKS.WS);

        wsDeviceHive.network.insert(networkModel)
            .then(({ id }) => {
                TEST_NETWORKS.WS.id = id;
                done();
            })
            .catch(done);
    });

    it(`should list all device types with the next name pattern: ${TEST_NETWORK_NAME_PREFIX}% via HTTP`, done => {
        const networkListQuery = new NetworkListQuery({ namePattern: `${TEST_NETWORK_NAME_PREFIX}%` });

        httpDeviceHive.network.list(networkListQuery)
            .then(networks => {
                assert(networks.length, Object.keys(TEST_NETWORKS).length);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should list all device types with the next name pattern: ${TEST_NETWORK_NAME_PREFIX}% via WS`, done => {
        const networkListQuery = new NetworkListQuery({ namePattern: `${TEST_NETWORK_NAME_PREFIX}%` });

        wsDeviceHive.network.list(networkListQuery)
            .then(networks => {
                assert(networks.length, Object.keys(TEST_NETWORKS).length);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should get network with name: ${TEST_NETWORKS.HTTP.name} via HTTP`, done => {
        httpDeviceHive.network.get(TEST_NETWORKS.HTTP.id)
            .then(network => {
                assert.equal(network.id, TEST_NETWORKS.HTTP.id);
                assert.equal(network.name, TEST_NETWORKS.HTTP.name);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should get network with name: ${TEST_NETWORKS.WS.name} via WS`, done => {
        wsDeviceHive.network.get(TEST_NETWORKS.WS.id)
            .then(network => {
                assert.equal(network.id, TEST_NETWORKS.WS.id);
                assert.equal(network.name, TEST_NETWORKS.WS.name);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should update network with name: ${TEST_NETWORKS.HTTP.name} via HTTP`, done => {
        TEST_NETWORKS.HTTP.description = `${TEST_NETWORK_DESCRIPTION_PREFIX}-${randomString.generate()}`;

        const networkModel = new Network(TEST_NETWORKS.HTTP);

        httpDeviceHive.network.update(networkModel)
            .then(() => httpDeviceHive.network.get(TEST_NETWORKS.HTTP.id))
            .then((network) => {
                assert.equal(network.description, TEST_NETWORKS.HTTP.description);
            })
            .then(() => done())
            .catch(done);

    });

    it(`should update network with name: ${TEST_NETWORKS.WS.name} via WS`, done => {
        TEST_NETWORKS.WS.description = `${TEST_NETWORK_DESCRIPTION_PREFIX}-${randomString.generate()}`;

        const networkModel = new Network(TEST_NETWORKS.WS);

        wsDeviceHive.network.update(networkModel)
            .then(() => wsDeviceHive.network.get(TEST_NETWORKS.WS.id))
            .then((network) => {
                assert.equal(network.description, TEST_NETWORKS.WS.description);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should count device types with the next name pattern: ${TEST_NETWORK_NAME_PREFIX}% via HTTP`, done => {
        const networkCountQuery = new NetworkCountQuery({ namePattern: `${TEST_NETWORK_NAME_PREFIX}%` });

        httpDeviceHive.network.count(networkCountQuery)
            .then(({ count }) => {
                assert.equal(count, Object.keys(TEST_NETWORKS).length);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should count device types with the next name pattern: ${TEST_NETWORK_NAME_PREFIX}% via WS`, done => {
        const networkCountQuery = new NetworkCountQuery({ namePattern: `${TEST_NETWORK_NAME_PREFIX}%` });

        wsDeviceHive.network.count(networkCountQuery)
            .then(({ count }) => {
                assert.equal(count, Object.keys(TEST_NETWORKS).length);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should delete network with name: ${TEST_NETWORKS.HTTP.name} via HTTP`, done => {
        httpDeviceHive.network.delete(TEST_NETWORKS.HTTP.id)
            .then(() => done())
            .catch(done);
    });

    it(`should delete network with name: ${TEST_NETWORKS.WS.name} via WS`, done => {
        wsDeviceHive.network.delete(TEST_NETWORKS.WS.id)
            .then(() => done())
            .catch(done);
    });

    after(done => {
        httpDeviceHive.disconnect();
        wsDeviceHive.disconnect();

        done();
    });
});