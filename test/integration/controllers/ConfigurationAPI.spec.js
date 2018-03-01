const chai = require(`chai`);
const assert = chai.assert;
const config = require('../config');
const DeviceHive = require('../../../index');
const Configuration = DeviceHive.models.Configuration;

const httpDeviceHive = new DeviceHive(config.server.http);
const wsDeviceHive = new DeviceHive(config.server.ws);


const TEST_CONFIGURATIONS = {
    HTTP: {
        name: `myTestConfigurationName-HTTP}`,
        value: `myTestConfigurationValue-HTTP}`
    },
    WS: {
        name: `myTestConfigurationName-WS}`,
        value: `myTestConfigurationValue-WS}`
    }
};

describe('ConfigurationAPI', () => {

    before(done => {
        Promise.all([httpDeviceHive.connect(), wsDeviceHive.connect()])
            .then(() => done());
    });

    it(`should add new configuration with name ${TEST_CONFIGURATIONS.HTTP.name} and value ${TEST_CONFIGURATIONS.HTTP.value} via HTTP`, (done) => {
        const configurationModel = new Configuration(TEST_CONFIGURATIONS.HTTP);

        httpDeviceHive.configuration.put(configurationModel)
            .then(() => done())
            .catch(done);
    });

    it(`should add new configuration with name ${TEST_CONFIGURATIONS.WS.name} and value ${TEST_CONFIGURATIONS.WS.value} via WS`, (done) => {
        const configurationModel = new Configuration(TEST_CONFIGURATIONS.WS);

        wsDeviceHive.configuration.put(configurationModel)
            .then(() => done())
            .catch(done);
    });

    it(`should get configuration with name ${TEST_CONFIGURATIONS.HTTP.name} and value ${TEST_CONFIGURATIONS.HTTP.value} via HTTP`, done => {
        httpDeviceHive.configuration.get(TEST_CONFIGURATIONS.HTTP.name)
            .then(configuration => {
                assert.isObject(configuration);
                assert.equal(configuration.name, TEST_CONFIGURATIONS.HTTP.name);
                assert.equal(configuration.value, TEST_CONFIGURATIONS.HTTP.value);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should get configuration with name ${TEST_CONFIGURATIONS.WS.name} and value ${TEST_CONFIGURATIONS.WS.value} via WS`, done => {
            wsDeviceHive.configuration.get(TEST_CONFIGURATIONS.WS.name)
                .then(configuration => {
                    assert.isObject(configuration);
                    assert.equal(configuration.name, TEST_CONFIGURATIONS.WS.name);
                    assert.equal(configuration.value, TEST_CONFIGURATIONS.WS.value);
                })
                .then(() => done())
                .catch(done);
    });

    it(`should delete configuration with name ${TEST_CONFIGURATIONS.HTTP.name} and value ${TEST_CONFIGURATIONS.HTTP.value} via HTTP`, done => {
        httpDeviceHive.configuration.delete(TEST_CONFIGURATIONS.HTTP.name)
            .then(() => done())
            .catch(done);
    });

    it(`should delete configuration with name ${TEST_CONFIGURATIONS.WS.name} and value ${TEST_CONFIGURATIONS.WS.value} via WS`, done => {
        wsDeviceHive.configuration.delete(TEST_CONFIGURATIONS.WS.name)
            .then(() => done())
            .catch(done);
    });

    it(`should not get configuration with name ${TEST_CONFIGURATIONS.HTTP.name} and value ${TEST_CONFIGURATIONS.HTTP.value} via HTTP`, done => {
        httpDeviceHive.configuration.get(TEST_CONFIGURATIONS.HTTP.name)
            .then(() => done(new Error(`Configuration exists after deletion`)))
            .catch(() => done());
    });

    it(`should not get configuration with name ${TEST_CONFIGURATIONS.WS.name} and value ${TEST_CONFIGURATIONS.WS.value} via WS`, done => {
        wsDeviceHive.configuration.get(TEST_CONFIGURATIONS.WS.name)
            .then(() => done(new Error(`Configuration exists after deletion`)))
            .catch(() => done());
    });

    after(done => {
        httpDeviceHive.disconnect();
        wsDeviceHive.disconnect();

        done();
    });
});