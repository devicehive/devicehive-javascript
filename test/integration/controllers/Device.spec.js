const chai = require(`chai`);
const assert = chai.assert;
const config = require('../config');
const DeviceHive = require('../../../index');
const Device = DeviceHive.models.Device;
const DeviceListQuery = DeviceHive.models.query.DeviceListQuery;

const httpDeviceHive = new DeviceHive(config.server.http);
const wsDeviceHive = new DeviceHive(config.server.ws);


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

describe('DeviceAPI', () => {

    before(done => {
        Promise.all([httpDeviceHive.connect(), wsDeviceHive.connect()])
            .then(() => done());
    });

    it(`should add new device with next configuration: ${JSON.stringify(TEST_DEVICES.HTTP)} via HTTP`, done => {
        const deviceModel = new Device(TEST_DEVICES.HTTP);

        httpDeviceHive.device.add(deviceModel)
            .then(() => done())
            .catch(done);
    });

    it(`should add new device with next configuration: ${JSON.stringify(TEST_DEVICES.WS)} via WS`, done => {
        const deviceModel = new Device(TEST_DEVICES.WS);

        wsDeviceHive.device.add(deviceModel)
            .then(() => done())
            .catch(done);
    });

    it(`should get device with next configuration: ${JSON.stringify(TEST_DEVICES.HTTP)} via HTTP`, done => {
        httpDeviceHive.device.get(TEST_DEVICES.HTTP.id)
            .then(device => {
                assert.isObject(device);
                assert.deepEqual(device, TEST_DEVICES.HTTP);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should get device with next configuration: ${JSON.stringify(TEST_DEVICES.WS)} via WS`, done => {
        wsDeviceHive.device.get(TEST_DEVICES.WS.id)
            .then(device => {
                assert.isObject(device);
                assert.deepEqual(device, TEST_DEVICES.WS);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should list all devices with the next name pattern "${TEST_DEVICE_NAME_PREFIX}%" via HTTP`, done => {
        const deviceListQuery = new DeviceListQuery({ namePattern: `${TEST_DEVICE_NAME_PREFIX}%` });

        httpDeviceHive.device.list(deviceListQuery)
            .then(devices => {
                assert.equal(devices.length, Object.keys(TEST_DEVICES).length);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should list all devices with the next name pattern "${TEST_DEVICE_NAME_PREFIX}%" via WS`, done => {
        const deviceListQuery = new DeviceListQuery({ namePattern: `${TEST_DEVICE_NAME_PREFIX}%` });

        wsDeviceHive.device.list(deviceListQuery)
            .then(devices => {
                assert.equal(devices.length, Object.keys(TEST_DEVICES).length);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should count devices with the next name pattern "${TEST_DEVICE_NAME_PREFIX}%" via HTTP`, done => {
        const deviceListQuery = new DeviceListQuery({ namePattern: `${TEST_DEVICE_NAME_PREFIX}%` });

        httpDeviceHive.device.count(deviceListQuery)
            .then(response => {
                assert.equal(response.count, Object.keys(TEST_DEVICES).length);
            })
            .then(done)
            .catch(done);
    });

    it(`should count devices with the next name pattern "${TEST_DEVICE_NAME_PREFIX}%" via WS`, done => {
        const deviceListQuery = new DeviceListQuery({ namePattern: `${TEST_DEVICE_NAME_PREFIX}%` });

        wsDeviceHive.device.count(deviceListQuery)
            .then(response => {
                assert.equal(response.count, Object.keys(TEST_DEVICES).length);
            })
            .then(done)
            .catch(done);
    });

    it(`should delete device with next configuration: ${JSON.stringify(TEST_DEVICES.HTTP)} via HTTP`, done => {
        const deviceModel = new Device(TEST_DEVICES.HTTP);

        httpDeviceHive.device.delete(deviceModel.id)
            .then(() => done())
            .catch(done);
    });

    it(`should delete device with next configuration: ${JSON.stringify(TEST_DEVICES.WS)} via WS`, done => {
        const deviceModel = new Device(TEST_DEVICES.WS);

        wsDeviceHive.device.delete(deviceModel.id)
            .then(() => done())
            .catch(done);
    });

    after(done => {
        httpDeviceHive.disconnect();
        wsDeviceHive.disconnect();

        done();
    });
});