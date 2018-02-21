const chai = require(`chai`);
const assert = chai.assert;
const config = require('../config');

const EventEmitter = require('events');
const events = new EventEmitter();

const DeviceHive = require('../../../index');

const httpDeviceHive = new DeviceHive(config.server.http);
const wsDeviceHive = new DeviceHive(config.server.ws)


const testDevices = [
    {
        id: 'myTestId',
        name: 'myTestName',
        networkId: 1,
        deviceTypeId: 1,
        isBlocked: false
    }, {
        id: 'myTestId2',
        name: 'myTestName',
        networkId: 1,
        deviceTypeId: 1,
        isBlocked: false
    }
];

describe('DeviceAPI', () => {

    before(done => {
        // Configaratuion DeviceHive

        Promise.all([httpDeviceHive.connect(), wsDeviceHive.connect()])
            .then(() => done());
    });


    it('DeviceAPI.add()', done => {

        // Configurating Device model
        const Device = DeviceHive.models.Device;

        const device = new Device(testDevices[0]);
        const device2 = new Device(testDevices[1]);

        Promise.all([httpDeviceHive.device.add(device), wsDeviceHive.device.add(device2)])
            .then(() => done())
            .catch(done);
    });


    it('DeviceAPI.get()', done => {

        const expected = {
            deviceId: testDevices[0].id
        };

        Promise.all([httpDeviceHive.device.get(expected.deviceId), wsDeviceHive.device.get(expected.deviceId)])
            .then(dataAll => {
                for (const data of dataAll) {
                    assert.isObject(data)
                    assert.include(data, testDevices[0]);
                }
            })
            .then(done)
            .catch(done);
    });


    it('DeviceAPI.list()', done => {

        // Configurating Device List query
        const deviceListQuery = new DeviceHive.models.query.DeviceListQuery({
            networkId: 1
        });


        Promise.all([httpDeviceHive.device.list(deviceListQuery), wsDeviceHive.device.list(deviceListQuery)])
            .then(dataAll => {
                for (const data of dataAll) {
                    for (const device of data) {
                        assert.containsAllKeys(device, Object.keys(testDevices[0]));
                    }
                }
            })
            .then(done)
            .catch(done);

    });


    it('DeviceAPI.count()', done => {

        // Configurating Device List query
        const deviceListQuery = new DeviceHive.models.query.DeviceCountQuery({
            networkId: '1'
        });

        Promise.all([httpDeviceHive.device.count(deviceListQuery), wsDeviceHive.device.count(deviceListQuery)])
            .then(dataAll => {
                for (const data of dataAll) {
                  assert.property(data, 'count');
                }
            })
            .then(done)
            .catch(done);
    });


    it('DeviceAPI.delete()', done => {

        Promise.all([httpDeviceHive.device.delete(testDevices[0].id), wsDeviceHive.device.delete(testDevices[1].id)])
            .then(() => done())
            .catch(done);
    });
});