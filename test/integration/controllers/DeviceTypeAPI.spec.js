const chai = require(`chai`);
const assert = chai.assert;
const config = require('../config');

const EventEmitter = require('events');
const events = new EventEmitter();

const DeviceHive = require('../../../index');

const httpDeviceHive = new DeviceHive(config.server.http);
const wsDeviceHive = new DeviceHive(config.server.ws)


const testDeviceTypes = [
    {
        name: 'name',
        description: 'description'
    }, {
        name: 'name2',
        description: 'description2'
    }
];

describe('DeviceTypeAPI', () => {

    before(done => {
        // Configaratuion DeviceHive

        Promise.all([httpDeviceHive.connect(), wsDeviceHive.connect()])
            .then(() => done());
    });


    it('DeviceTypeAPI.insert()', done => {

        // Configurating DeviceType model
        const DeviceType = DeviceHive.models.DeviceType;

        const deviceType = new DeviceType(testDeviceTypes[0]);
        const deviceType2 = new DeviceType(testDeviceTypes[1]);

        Promise.all([httpDeviceHive.deviceType.insert(deviceType), wsDeviceHive.deviceType.insert(deviceType2)])
            .then(() => done())
            .catch(done);
    });


    it('DeviceTypeAPI.list()', done => {


        // Configurating Device List query
        const deviceTypeListQuery = new DeviceHive.models.query.DeviceTypeListQuery({
            namePattern: 'name%',
            sortField: 'name',
            sortOrder: 'asc',
            take: 2,
            skip: 0
        });


        Promise.all([httpDeviceHive.deviceType.list(deviceTypeListQuery), wsDeviceHive.deviceType.list(deviceTypeListQuery)])
            .then(dataAll => {
                for (const data of dataAll) {
                    for (const deviceTypeKey in data) {
                        testDeviceTypes[deviceTypeKey].id = data[deviceTypeKey].id;
                        testDeviceTypes[deviceTypeKey].name = data[deviceTypeKey].name;
                        testDeviceTypes[deviceTypeKey].description = data[deviceTypeKey].description;
                        assert.containsAllKeys(data[deviceTypeKey], Object.keys(testDeviceTypes[0]));
                    }
                }
            })
            .then(done)
            .catch(done);
    });


    it('DeviceTypeAPI.get()', done => {

        Promise.all([httpDeviceHive.deviceType.get(testDeviceTypes[0].id), wsDeviceHive.deviceType.get(testDeviceTypes[0].id)])
            .then(dataAll => {
                const expected = testDeviceTypes[0];
                for (const data of dataAll) {
                    assert.isObject(data);
                    assert.deepInclude(data, expected);
                }
            })
            .then(done)
            .catch(done);
    });


    it('DeviceTypeAPI.update()', done => {

        // Configurating DeviceType model
        const DeviceType = DeviceHive.models.DeviceType;

        const deviceType = new DeviceType(testDeviceTypes[0]);
        const deviceType2 = new DeviceType(testDeviceTypes[1]);

        Promise.all([httpDeviceHive.deviceType.update(deviceType), wsDeviceHive.deviceType.update(deviceType2)])
            .then(() => done())
            .catch(done);

    });

    it('DeviceTypeAPI.count()', done => {

        // Configurating DeviceType List query
        const deviceTypeListQuery = new DeviceHive.models.query.DeviceTypeCountQuery({
            name: 'name',
            namePattern: 'namePattern'
        });

        Promise.all([httpDeviceHive.deviceType.count(deviceTypeListQuery), wsDeviceHive.deviceType.count(deviceTypeListQuery)])
            .then(dataAll => {
                for (const data of dataAll) {
                    assert.property(data, 'count');
                }
            })
            .then(done)
            .catch(done);
    });

    it('DeviceTypeAPI.delete()', done => {
        
        Promise.all([httpDeviceHive.deviceType.delete(testDeviceTypes[0].id), wsDeviceHive.deviceType.delete(testDeviceTypes[1].id)])
            .then(() => done())
            .catch(done);
    });
});