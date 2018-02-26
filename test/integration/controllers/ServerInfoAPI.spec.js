const chai = require(`chai`);
const assert = chai.assert;
const config = require('../config');

const EventEmitter = require('events');
const events = new EventEmitter();

const DeviceHive = require('../../../index');

const httpDeviceHive = new DeviceHive(config.server.http);
const wsDeviceHive = new DeviceHive(config.server.ws);


describe('ServerInfoAPI', () => {

    before(done => {
        // Configaratuion DeviceHive
        Promise.all([httpDeviceHive.connect(), wsDeviceHive.connect()])
            .then(() => done());
    });


    it('InfoAPI.getServerInfo()', done => {

        Promise.all([httpDeviceHive.info.getServerInfo(), wsDeviceHive.info.getServerInfo()])
            .then(dataAll => {
                for (const data of dataAll) {
                    const expectedKeys = ['apiVersion', 'serverTimestamp']
                    assert.isObject(data);
                    assert.containsAllKeys(data, expectedKeys);
                }
            })
            .then(done)
            .catch(done);
    });

    it('InfoAPI.getCacheInfo()', done => {

        Promise.all([httpDeviceHive.info.getCacheInfo()])
            .then(dataAll => {
                for (const data of dataAll) {
                    const expectedKeys = ['serverTimestamp', 'cacheStats']
                    assert.isObject(data);
                    assert.containsAllKeys(data, expectedKeys);
                }
            })
            .then(done)
            .catch(done);
    });

    it('InfoAPI.getClusterInfo()', done => {
        Promise.all([httpDeviceHive.info.getClusterInfo(), wsDeviceHive.info.getClusterInfo()])
            .then(dataAll => {
                for (const data of dataAll) {
                    assert.isObject(data);
                }
            })
            .then(done)
            .catch(done);
    });
});