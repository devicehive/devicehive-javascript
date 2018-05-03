const randomString = require(`randomstring`);
const chai = require(`chai`);
const assert = chai.assert;
const config = require('../config');
const DeviceHive = require('../../../index');
const Network = DeviceHive.models.Network;
const Device = DeviceHive.models.Device;
const NetworkListQuery = DeviceHive.models.query.NetworkListQuery;
const NetworkCountQuery = DeviceHive.models.query.NetworkCountQuery;
const NetworkDeleteQuery = DeviceHive.models.query.NetworkDeleteQuery;

const httpDeviceHive = new DeviceHive(config.server.http);
const wsDeviceHive = new DeviceHive(config.server.ws);


const TEST_NETWORK_NAME_PREFIX = `DH-JS-LIB-NETWORK-NAME-`;
const TEST_NETWORK_DESCRIPTION_PREFIX = `DH-JS-LIB-NETWORK-NAME-`;
const TEST_NETWORKS = {
    HTTP: {
        name: `${TEST_NETWORK_NAME_PREFIX}${randomString.generate()}`,
        description: `${TEST_NETWORK_DESCRIPTION_PREFIX}${randomString.generate()}`
    },
    WS: {
        name: `${TEST_NETWORK_NAME_PREFIX}${randomString.generate()}`,
        description: `${TEST_NETWORK_DESCRIPTION_PREFIX}${randomString.generate()}`
    }
};

const TEST_DEVICE_ID_PREFIX = `DH-JS-LIB-DEVICE-ID-`;
const TEST_DEVICE_NAME_PREFIX = `DH-JS-LIB-DEVICE-NAME-`;

const TEST_DEVICES = {
    HTTP: {
        id: `${TEST_DEVICE_ID_PREFIX}HTTP`,
        name: `${TEST_DEVICE_NAME_PREFIX}HTTP`,
        networkId: 1,
        deviceTypeId: 1,
        isBlocked: false,
        data: {}
    },
    WS: {
        id: `${TEST_DEVICE_ID_PREFIX}WS`,
        name: `${TEST_DEVICE_NAME_PREFIX}WS`,
        networkId: 1,
        deviceTypeId: 1,
        isBlocked: false,
        data: {}
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
        const networkDeleteQuery = new NetworkDeleteQuery({ networkId: TEST_NETWORKS.HTTP.id });
        httpDeviceHive.network.delete(networkDeleteQuery)
            .then(() => done())
            .catch(done);
    });

    it(`should delete network with name: ${TEST_NETWORKS.WS.name} via WS`, done => {
        const networkDeleteQuery = new NetworkDeleteQuery({ networkId: TEST_NETWORKS.WS.id });
        wsDeviceHive.network.delete(networkDeleteQuery)
            .then(() => done())
            .catch(done);
    });

    it(`should delete network with name: ${TEST_NETWORKS.HTTP.name} via HTTP and delete all it's devices`, done => {

        TEST_NETWORKS.HTTP.id = null;
        const networkModel = new Network(TEST_NETWORKS.HTTP);

        httpDeviceHive.network.insert(networkModel)
            .then(({ id }) => {
                TEST_NETWORKS.HTTP.id = id;
                TEST_DEVICES.HTTP.networkId = id;
            })
            .then(() => {
                const deviceModel = new Device(TEST_DEVICES.HTTP);
                return httpDeviceHive.device.add(deviceModel);
            })
            .then(() => {
                const networkDeleteQuery = new NetworkDeleteQuery({ networkId: TEST_NETWORKS.HTTP.id, force: true });
                return httpDeviceHive.network.delete(networkDeleteQuery)
            })
            .then(() => httpDeviceHive.device.get(TEST_DEVICES.HTTP.id))
            .catch(err => {
                assert.equal(err,`Device with such deviceId = ${TEST_DEVICES.HTTP.id} not found`);
                done();
            });

    });

    it(`should delete network with name: ${TEST_NETWORKS.WS.name} via WS and delete all it's devices`, done => {
        
        TEST_NETWORKS.WS.id = null;
        const networkModel = new Network(TEST_NETWORKS.WS);

        wsDeviceHive.network.insert(networkModel)
            .then(({ id }) => {
                TEST_NETWORKS.WS.id = id;
                TEST_DEVICES.WS.networkId = id;
            })
            .then(() => {
                const deviceModel = new Device(TEST_DEVICES.WS);
                return wsDeviceHive.device.add(deviceModel);
            })
            .then(() => {
                const networkDeleteQuery = new NetworkDeleteQuery({ networkId: TEST_NETWORKS.WS.id, force: true });
                return wsDeviceHive.network.delete(networkDeleteQuery)
            })
            .then(() => wsDeviceHive.device.get(TEST_DEVICES.WS.id))
            .catch(err => {
                assert.equal(err,`Device with such deviceId = ${TEST_DEVICES.WS.id} not found`);
                done();
            });
    });

    after(done => {
        httpDeviceHive.disconnect();
        wsDeviceHive.disconnect();

        done();
    });
});