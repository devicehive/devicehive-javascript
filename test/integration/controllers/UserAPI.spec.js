const chai = require(`chai`);
const assert = chai.assert;
const config = require('../config');

const EventEmitter = require('events');
const events = new EventEmitter();

const DeviceHive = require('../../../index');

const httpDeviceHive = new DeviceHive(config.server.http);
const wsDeviceHive = new DeviceHive(config.server.ws)


const testUsers = [
    {
        login: 'testLogin',
        role: 1,
        status: 1,
        password: 'password',
        lastLogin: '2018-02-09T10:09:03.033Z',
        data: {
            jsonString: 'jsonString'
        },
        introReviewed: false,
        allDeviceTypesAvailable: false
    }, {
        login: 'testLogin2',
        role: 1,
        status: 1,
        password: 'password',
        lastLogin: '2018-02-09T10:09:03.033Z',
        data: {
            jsonString: 'jsonString'
        },
        introReviewed: false,
        allDeviceTypesAvailable: false
    }
];

describe('UserAPI', () => {

    before(done => {
        // Configaratuion DeviceHive

        Promise.all([httpDeviceHive.connect(), wsDeviceHive.connect()])
            .then(() => done());
    });

    it('UserAPI.insert()', done => {

        // Configurating User model
        const User = DeviceHive.models.User;

        const user = new User(testUsers[0]);
        const user2 = new User(testUsers[1]);

        Promise.all([httpDeviceHive.user.insert(user), wsDeviceHive.user.insert(user2)])
            .then(() => done())
            .catch(done);
    });


    it('UserAPI.list()', done => {

        // Configurating User List query
        const userListQuery = new DeviceHive.models.query.UserListQuery({
            loginPattern: 'testLogin%',
            role: 1,
            status: 1,
            sortField: 'login',
            sortOrder: 'asc',
            take: 2,
            skip: 0,
        });

        Promise.all([httpDeviceHive.user.list(userListQuery), wsDeviceHive.user.list(userListQuery)])
            .then(dataAll => {
                for (const data of dataAll) {
                    for (const userKey in data) {
                        testUsers[userKey].id = data[userKey].id;
                        testUsers[userKey].lastLogin = data[userKey].lastLogin;

                        const expectedKeys = Object.keys(testUsers[0]);
                        expectedKeys.splice(expectedKeys.indexOf('password'), 1);
                        assert.containsAllKeys(data[userKey], expectedKeys);
                    }
                }
            })
            .then(done)
            .catch(done);
    });

    it('UserAPI.get()', done => {

        Promise.all([httpDeviceHive.user.get(testUsers[0].id), wsDeviceHive.user.get(testUsers[0].id)])
            .then(dataAll => {
                const expected = Object.assign({}, testUsers[0]);
                delete expected.password;
                for (const data of dataAll) {
                    assert.isObject(data);
                    assert.deepInclude(data, expected);
                }
            })
            .then(done)
            .catch(done);
    });

    it('UserAPI.getCurrent()', done => {

        Promise.all([httpDeviceHive.user.getCurrent(), wsDeviceHive.user.getCurrent()])
            .then(dataAll => {
                const expected = Object.assign({}, testUsers[0]);
                delete expected.password;
                for (const data of dataAll) {
                    const expectedKeys = Object.keys(testUsers[0]);
                    expectedKeys.splice(expectedKeys.indexOf('password'), 1);

                    assert.isObject(data);
                    assert.containsAllKeys(data, expectedKeys);
                }
            })
            .then(done)
            .catch(done);
    });


    it('UserAPI.update()', done => {

        // Configurating User model
        const User = DeviceHive.models.User;

        const user = new User(testUsers[0]);
        const user2 = new User(testUsers[1]);

        Promise.all([httpDeviceHive.user.update(user), wsDeviceHive.user.update(user2)])
            .then(() => done())
            .catch(done);

    });


    it('UserAPI.updateCurrent()', done => {

        // Configurating User model
        const user = new DeviceHive.models.User({
            status: 0
        });

        Promise.all([httpDeviceHive.user.updateCurrent(user), wsDeviceHive.user.updateCurrent(user)])
            .then(() => done())
            .catch(done);
    });


    it('UserAPI.count()', done => {

        // Configurating User List query
        const userListQuery = new DeviceHive.models.query.UserCountQuery({
            login: 'login',
            loginPattern: 'loginPattern',
            role: '1',
            status: '1',
        });

        Promise.all([httpDeviceHive.user.count(userListQuery), wsDeviceHive.user.count(userListQuery)])
            .then(dataAll => {
                for (const data of dataAll) {
                    assert.property(data, 'count');
                }
            })
            .then(done)
            .catch(done);
    });


    it('UserAPI.getDeviceTypes()', done => {

        Promise.all([httpDeviceHive.user.getDeviceTypes(testUsers[0].id)])
            .then(() => done())
            .catch(done);
    });


    it('UserAPI.assignAllDeviceTypes()', done => {

        Promise.all([httpDeviceHive.user.assignAllDeviceTypes(testUsers[0].id)])        
            .then(() => done())
            .catch(done);
    });


    it('UserAPI.unassignAllDeviceTypes()', done => {

        Promise.all([httpDeviceHive.user.unassignAllDeviceTypes(testUsers[0].id)])
            .then(() => done())
            .catch(done);
    });


    it('UserAPI.assignDeviceType()', done => {

        Promise.all([httpDeviceHive.user.assignDeviceType(testUsers[0].id, 1)])
            .then(() => done())
            .catch(done);
    });


    it('UserAPI.getDeviceType()', done => {

        Promise.all([httpDeviceHive.user.getDeviceType(testUsers[0].id, 1)])
            .then(dataAll => {
                for (const data of dataAll) {
                    assert.isObject(data);
                    assert.property(data, 'deviceType');
                }
            })
            .then(done)
            .catch(done);
    });


    it('UserAPI.unassignDeviceType()', done => {

        Promise.all([httpDeviceHive.user.unassignDeviceType(testUsers[0].id, 1)])
            .then(() => done())
            .catch(done);
    });


    it('UserAPI.assignNetwork()', done => {

        httpDeviceHive.user.assignNetwork(testUsers[0].id, 1)
            .then(() => wsDeviceHive.user.assignNetwork(testUsers[1].id, 1))
            .then(() => done())
            .catch(done);
    });


    it('UserAPI.getNetwork()', done => {

        Promise.all([httpDeviceHive.user.getNetwork(testUsers[0].id, 1), wsDeviceHive.user.getNetwork(testUsers[1].id, 1)])
            .then(dataAll => {
                for (const data of dataAll) {
                    assert.isObject(data);
                    assert.property(data, 'network');
                }
            })
            .then(done)
            .catch(done);
    });


    it('UserAPI.unassignNetwork()', done => {

        httpDeviceHive.user.unassignNetwork(testUsers[0].id, 1)
            .then(() => wsDeviceHive.user.unassignNetwork(testUsers[1].id, 1))
            .then(() => done())
            .catch(done);
    });
    

    it('UserAPI.delete()', done => {

        Promise.all([httpDeviceHive.user.delete(testUsers[0].id), wsDeviceHive.user.delete(testUsers[1].id)])
            .then(() => done())
            .catch(done);
    });

});