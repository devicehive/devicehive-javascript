const chai = require(`chai`);
const assert = chai.assert;
const config = require('../config');
const DeviceHive = require('../../../index');

const httpDeviceHive = new DeviceHive(config.server.http);
const wsDeviceHive = new DeviceHive(config.server.ws);


describe('ServerInfoAPI', () => {

    before(done => {
        Promise.all([httpDeviceHive.connect(), wsDeviceHive.connect()])
            .then(() => done());
    });

    it('should get server info via HTTP', done => {
        httpDeviceHive.info.getServerInfo()
            .then(serverInfo => {
                assert.exists(serverInfo);
            })
            .then(() => done())
            .catch(done);
    });

    it('should get server info via WS', done => {
        wsDeviceHive.info.getServerInfo()
            .then(serverInfo => {
                assert.exists(serverInfo);
            })
            .then(() => done())
            .catch(done);
    });

    it('should get cache info via HTTP', done => {
        httpDeviceHive.info.getCacheInfo()
            .then(cacheInfo => {
                assert.exists(cacheInfo);
            })
            .then(() => done())
            .catch(done);
    });

    it('should get cluster info via HTTP', done => {
        httpDeviceHive.info.getClusterInfo()
            .then(clusterInfo => {
                assert.exists(clusterInfo);
            })
            .then(() => done())
            .catch(done);
    });

    it('should get cluster info via WS', done => {
        wsDeviceHive.info.getClusterInfo()
            .then(clusterInfo => {
                assert.exists(clusterInfo);
            })
            .then(() => done())
            .catch(done);
    });

    after(done => {
        httpDeviceHive.disconnect();
        wsDeviceHive.disconnect();

        done();
    });
});