const randomString = require(`randomstring`);
const chai = require(`chai`);
const assert = chai.assert;
const config = require(`../config`);
const DeviceHive = require(`../../../index`);
const User = DeviceHive.models.User;
const UserListQuery = DeviceHive.models.query.UserListQuery;
const UserCountQuery = DeviceHive.models.query.UserCountQuery;

const httpDeviceHive = new DeviceHive(config.server.http);
const wsDeviceHive = new DeviceHive(config.server.ws);


const TEST_USER_LOGIN_PREFIX = `DH-JS-LIB-USER-LOGIN-`;
const TEST_USERS = {
    HTTP: {
        login: `${TEST_USER_LOGIN_PREFIX}-${randomString.generate()}`,
        role: 1,
        status: 1,
        password: `password`,
        data: {
            jsonString: `jsonString`
        }
    },
    WS: {
        login: `${TEST_USER_LOGIN_PREFIX}-${randomString.generate()}`,
        role: 1,
        status: 1,
        password: `password`,
        data: {
            jsonString: `jsonString`
        }
    }
};

describe(`UserAPI`, () => {

    before(done => {
        Promise.all([httpDeviceHive.connect(), wsDeviceHive.connect()])
            .then(() => done());
    });

    it(`should add new user with login ${TEST_USERS.HTTP.login} via HTTP`, done => {
        const userModel = new User(TEST_USERS.HTTP);

        httpDeviceHive.user.insert(userModel)
            .then(({ id }) => {
                assert.exists(id);

                TEST_USERS.HTTP.id = id;
            })
            .then(() => done())
            .catch(done);
    });

    it(`should add new user with login ${TEST_USERS.WS.login} via WS`, done => {
        const userModel = new User(TEST_USERS.WS);

        wsDeviceHive.user.insert(userModel)
            .then(({ id }) => {
                assert.exists(id);

                TEST_USERS.WS.id = id;
            })
            .then(() => done())
            .catch(done);
    });

    it(`should list users with the next login pattern: ${TEST_USER_LOGIN_PREFIX}% via HTTP`, done => {
        const userListQuery = new UserListQuery({ loginPattern: `${TEST_USER_LOGIN_PREFIX}%` });

        httpDeviceHive.user.list(userListQuery)
            .then(users => {
                assert.equal(users.length, Object.keys(TEST_USERS).length);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should list users with the next login pattern: ${TEST_USER_LOGIN_PREFIX}% via HTTP`, done => {
        const userListQuery = new UserListQuery({ loginPattern: `${TEST_USER_LOGIN_PREFIX}%` });

        wsDeviceHive.user.list(userListQuery)
            .then(users => {
                assert.equal(users.length, Object.keys(TEST_USERS).length);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should get user with name: ${TEST_USERS.HTTP.name} via HTTP`, done => {
        httpDeviceHive.user.get(TEST_USERS.HTTP.id)
            .then(user => {
                assert.equal(user.name, TEST_USERS.HTTP.name);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should get user with name: ${TEST_USERS.WS.name} via WS`, done => {
        wsDeviceHive.user.get(TEST_USERS.WS.id)
            .then(user => {
                assert.equal(user.name, TEST_USERS.WS.name);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should get current user: login ${config.TEST_USER_LOGIN}, password ${config.TEST_USER_PASSWORD} via HTTP`, done => {
        httpDeviceHive.user.getCurrent()
            .then(user => {
                assert.equal(user.login, config.TEST_USER_LOGIN);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should get current user: login ${config.TEST_USER_LOGIN}, password ${config.TEST_USER_PASSWORD} via WS`, done => {
        wsDeviceHive.user.getCurrent()
            .then(user => {
                assert.equal(user.login, config.TEST_USER_LOGIN);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should update user with login: ${TEST_USERS.HTTP.login} via HTTP`, done => {
        TEST_USERS.HTTP.data = { update: true };

        const userModel = new User(TEST_USERS.HTTP);

        httpDeviceHive.user.update(userModel)
            .then(() => httpDeviceHive.user.get(TEST_USERS.HTTP.id))
            .then((user) => {
                assert.deepEqual(user.data, TEST_USERS.HTTP.data);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should update user with login: ${TEST_USERS.WS.login} via WS`, done => {
        TEST_USERS.WS.data = { update: true };

        const userModel = new User(TEST_USERS.WS);

        wsDeviceHive.user.update(userModel)
            .then(() => wsDeviceHive.user.get(TEST_USERS.WS.id))
            .then((user) => {
                assert.deepEqual(user.data, TEST_USERS.WS.data);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should update current user with login ${config.TEST_USER_LOGIN} via HTTP`, done => {
        const userModel = new User({ status: 0 });

        httpDeviceHive.user.updateCurrent(userModel)
            .then(() => httpDeviceHive.user.getCurrent())
            .then(user => {
                assert.equal(user.status, userModel.status);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should update current user with login ${config.TEST_USER_LOGIN} via WS`, done => {
        const userModel = new User({ status: 1 });

        wsDeviceHive.user.updateCurrent(userModel)
            .then(() => wsDeviceHive.user.getCurrent())
            .then(user => {
                assert.equal(user.status, userModel.status);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should count users with the next login pattern ${TEST_USER_LOGIN_PREFIX}% via HTTP`, done => {
        const userListQuery = new UserCountQuery({ loginPattern: `${TEST_USER_LOGIN_PREFIX}%` });

        httpDeviceHive.user.count(userListQuery)
            .then(({ count }) => {
                assert.equal(count, Object.keys(TEST_USERS).length);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should count users with the next login pattern ${TEST_USER_LOGIN_PREFIX}% via WS`, done => {
        const userListQuery = new UserCountQuery({ loginPattern: `${TEST_USER_LOGIN_PREFIX}%` });

        wsDeviceHive.user.count(userListQuery)
            .then(({ count }) => {
                assert.equal(count, Object.keys(TEST_USERS).length);
            })
            .then(() => done())
            .catch(done);
    });

    it(`UserAPI.getDeviceTypes()`, done => {

        Promise.all([httpDeviceHive.user.getDeviceTypes(testUsers[0].id)])
            .then(() => done())
            .catch(done);
    });


    it(`UserAPI.assignAllDeviceTypes()`, done => {

        Promise.all([httpDeviceHive.user.assignAllDeviceTypes(testUsers[0].id)])        
            .then(() => done())
            .catch(done);
    });


    it(`UserAPI.unassignAllDeviceTypes()`, done => {

        Promise.all([httpDeviceHive.user.unassignAllDeviceTypes(testUsers[0].id)])
            .then(() => done())
            .catch(done);
    });


    it(`UserAPI.assignDeviceType()`, done => {

        Promise.all([httpDeviceHive.user.assignDeviceType(testUsers[0].id, 1)])
            .then(() => done())
            .catch(done);
    });


    it(`UserAPI.getDeviceType()`, done => {

        Promise.all([httpDeviceHive.user.getDeviceType(testUsers[0].id, 1)])
            .then(dataAll => {
                for (const data of dataAll) {
                    assert.isObject(data);
                    assert.property(data, `deviceType`);
                }
            })
            .then(done)
            .catch(done);
    });


    it(`UserAPI.unassignDeviceType()`, done => {

        Promise.all([httpDeviceHive.user.unassignDeviceType(testUsers[0].id, 1)])
            .then(() => done())
            .catch(done);
    });


    it(`UserAPI.assignNetwork()`, done => {

        httpDeviceHive.user.assignNetwork(testUsers[0].id, 1)
            .then(() => wsDeviceHive.user.assignNetwork(testUsers[1].id, 1))
            .then(() => done())
            .catch(done);
    });


    it(`UserAPI.getNetwork()`, done => {

        Promise.all([httpDeviceHive.user.getNetwork(testUsers[0].id, 1), wsDeviceHive.user.getNetwork(testUsers[1].id, 1)])
            .then(dataAll => {
                for (const data of dataAll) {
                    assert.isObject(data);
                    assert.property(data, `network`);
                }
            })
            .then(done)
            .catch(done);
    });


    it(`UserAPI.unassignNetwork()`, done => {

        httpDeviceHive.user.unassignNetwork(testUsers[0].id, 1)
            .then(() => wsDeviceHive.user.unassignNetwork(testUsers[1].id, 1))
            .then(() => done())
            .catch(done);
    });
    

    it(`UserAPI.delete()`, done => {

        Promise.all([httpDeviceHive.user.delete(testUsers[0].id), wsDeviceHive.user.delete(testUsers[1].id)])
            .then(() => done())
            .catch(done);
    });

    after(done => {
        httpDeviceHive.disconnect();
        wsDeviceHive.disconnect();

        done();
    });
});