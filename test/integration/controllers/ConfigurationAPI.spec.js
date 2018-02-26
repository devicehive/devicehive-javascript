const chai = require(`chai`);
const assert = chai.assert;
const config = require('../config');

const EventEmitter = require('events');
const events = new EventEmitter();

const DeviceHive = require('../../../index');

const httpDeviceHive = new DeviceHive(config.server.http);
const wsDeviceHive = new DeviceHive(config.server.ws);


const testConfigurations = [
    {
        name: 'myTestName',
        value: 'string'
    },
    {
        name: 'myTestName2',
        value: 'string'
    }
];

describe('ConfigurationAPI', () => {

    before(done => {
        // Configaratuion DeviceHive
        Promise.all([httpDeviceHive.connect(), wsDeviceHive.connect()])
            .then(() => done());
    });


    it('ConfigurationAPI.put()', done => {

        // Configurating Configaration model
        const configuration = new DeviceHive.models.Configuration(testConfigurations[0]);
        const configuration2 = new DeviceHive.models.Configuration(testConfigurations[1]);

        Promise.all([httpDeviceHive.configuration.put(configuration), wsDeviceHive.configuration.put(configuration2)])
            .then(() => done())
            .catch(done);
    });


    it('ConfigurationAPI.get()', done => {

        Promise.all([httpDeviceHive.configuration.get(testConfigurations[0].name), wsDeviceHive.configuration.get(testConfigurations[1].name)])
            .then(dataAll => {
                for (const key in dataAll) {
                    assert.isObject(dataAll[key])
                    assert.include(dataAll[key], testConfigurations[key]);
                }
            })
            .then(done)
            .catch(done);
    });


    it('ConfigurationAPI.delete()', done => {

        Promise.all([httpDeviceHive.configuration.delete(testConfigurations[0].name), wsDeviceHive.configuration.delete(testConfigurations[1].name)])
            .then(() => done())
            .catch(done);
    });
});