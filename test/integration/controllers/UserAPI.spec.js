const randomString = require(`randomstring`);
const chai = require(`chai`);
const assert = chai.assert;
const expect = chai.expect;
const config = require(`../config`);
const DeviceHive = require(`../../../index`);
const User = DeviceHive.models.User;
const DeviceType = DeviceHive.models.DeviceType;
const Network = DeviceHive.models.Network;
const UserListQuery = DeviceHive.models.query.UserListQuery;
const UserCountQuery = DeviceHive.models.query.UserCountQuery;

const httpDeviceHive = new DeviceHive(config.server.http);
const wsDeviceHive = new DeviceHive(config.server.ws);


const TEST_USER_LOGIN_PREFIX = `DH-JS-LIB-USER-LOGIN-`;
const TEST_USERS = {
    HTTP: {
        login: `${TEST_USER_LOGIN_PREFIX}${randomString.generate()}`,
        role: 1,
        status: 0,
        password: `password`,
        data: {
            jsonString: `jsonString`
        }
    },
    WS: {
        login: `${TEST_USER_LOGIN_PREFIX}${randomString.generate()}`,
        role: 1,
        status: 0,
        password: `password`,
        data: {
            jsonString: `jsonString`
        }
    }
};
const TEST_DEVICE_TYPE_NAME_PREFIX = `DH-JS-LIB-DEVICE-TYPE-NAME-`;
const TEST_DEVICE_TYPE_DESCRIPTION_PREFIX = `DH-JS-LIB-DEVICE-TYPE-NAME-`;
const TEST_DEVICE_TYPE = {
    name: `${TEST_DEVICE_TYPE_NAME_PREFIX}${randomString.generate()}`,
    description: `${TEST_DEVICE_TYPE_DESCRIPTION_PREFIX}${randomString.generate()}`
};
const TEST_NETWORK_NAME_PREFIX = `DH-JS-LIB-NETWORK-NAME-`;
const TEST_NETWORK_DESCRIPTION_PREFIX = `DH-JS-LIB-NETWORK-NAME-`;
const TEST_NETWORK = {
    name: `${TEST_NETWORK_NAME_PREFIX}${randomString.generate()}`,
    description: `${TEST_NETWORK_DESCRIPTION_PREFIX}${randomString.generate()}`
};

describe(`UserAPI`, () => {
    const deviceTypeModel = new DeviceType(TEST_DEVICE_TYPE);
    const networkModel = new Network(TEST_NETWORK);

    before(done => {
        Promise.all([httpDeviceHive.connect(), wsDeviceHive.connect()])
            .then(() => httpDeviceHive.deviceType.insert(deviceTypeModel))
            .then(({ id }) => TEST_DEVICE_TYPE.id = id)
            .then(() => httpDeviceHive.network.insert(networkModel))
            .then(({ id }) => TEST_NETWORK.id = id)
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

    it(`should get user with login: ${TEST_USERS.HTTP.login} via HTTP`, done => {
        httpDeviceHive.user.get(TEST_USERS.HTTP.id)
            .then(user => {
                assert.equal(user.login, TEST_USERS.HTTP.login);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should get user with login: ${TEST_USERS.WS.login} via WS`, done => {
        wsDeviceHive.user.get(TEST_USERS.WS.id)
            .then(user => {
                assert.equal(user.login, TEST_USERS.WS.login);
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
        const userModel = new User({ data: { update: true } });

        httpDeviceHive.user.updateCurrent(userModel)
            .then(() => httpDeviceHive.user.getCurrent())
            .then(user => {
                assert.deepEqual(user.data, userModel.data);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should update current user with login ${config.TEST_USER_LOGIN} via WS`, done => {
        const userModel = new User({ data: { update: true } });

        wsDeviceHive.user.updateCurrent(userModel)
            .then(() => wsDeviceHive.user.getCurrent())
            .then(user => {
                assert.deepEqual(user.data, userModel.data);
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

    it(`should get user's deviceTypes via HTTP`, done => {
        httpDeviceHive.user.getDeviceTypes(TEST_USERS.HTTP.id)
            .then(deviceTypes => {
                assert.exists(deviceTypes);
                expect(deviceTypes).to.be.an('array');
            })
            .then(() => done())
            .catch(done);
    });

    it(`should unassign all device types from user with login: ${TEST_USERS.HTTP.login} via HTTP`, done => {
        httpDeviceHive.user.unassignAllDeviceTypes(TEST_USERS.HTTP.id)
            .then(() => httpDeviceHive.user.getDeviceTypes(TEST_USERS.HTTP.id))
            .then((deviceTypes) => {
                assert.exists(deviceTypes);
                expect(deviceTypes).to.be.an('array').that.is.empty;
            })
            .then(() => done())
            .catch(done);
    });

    it(`should assign all device types to user with login: ${TEST_USERS.HTTP.login} via HTTP`, done => {
        httpDeviceHive.user.assignAllDeviceTypes(TEST_USERS.HTTP.id)
            .then(() => httpDeviceHive.user.getDeviceTypes(TEST_USERS.HTTP.id))
            .then((deviceTypes) => {
                assert.exists(deviceTypes);
                expect(deviceTypes).to.be.an('array').that.is.not.empty;
            })
            .then(() => done())
            .catch(done);
    });

    it(`should assign device type with name: ${TEST_DEVICE_TYPE.name} to user with login: ${TEST_USERS.HTTP.login} via HTTP`, done => {
        httpDeviceHive.user.unassignAllDeviceTypes(TEST_USERS.HTTP.id)
            .then(() => httpDeviceHive.user.assignDeviceType(TEST_USERS.HTTP.id, TEST_DEVICE_TYPE.id))
            .then(() => done())
            .catch(done);
    });

    it(`should get users device type with name: ${TEST_DEVICE_TYPE.name} via HTTP`, done => {
        httpDeviceHive.user.getDeviceType(TEST_USERS.HTTP.id, TEST_DEVICE_TYPE.id)
            .then(({ deviceType }) => {
                assert.exists(deviceType);
                assert.equal(deviceType.name, TEST_DEVICE_TYPE.name);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should unassign device type with name: ${TEST_DEVICE_TYPE.name} from user with login: ${TEST_USERS.HTTP.login} via HTTP`, done => {
        httpDeviceHive.user.unassignDeviceType(TEST_USERS.HTTP.id, TEST_DEVICE_TYPE.id)
            .then(() => httpDeviceHive.user.getDeviceType(TEST_USERS.HTTP.id, TEST_DEVICE_TYPE.id))
            .then(() => done(new Error(`Device type with id ${TEST_DEVICE_TYPE.id} for user with id ${TEST_USERS.HTTP.id} should not be found`)))
            .catch(() => done());
    });

    it(`should assign network with name: ${TEST_NETWORK.name} to user with login: ${TEST_USERS.HTTP.login} via HTTP`, done => {
            httpDeviceHive.user.assignNetwork(TEST_USERS.HTTP.id, TEST_NETWORK.id)
            .then(() => done())
            .catch(done);
    });

    it(`should get users network with name: ${TEST_NETWORK.name} via HTTP`, done => {
        httpDeviceHive.user.getNetwork(TEST_USERS.HTTP.id, TEST_NETWORK.id)
            .then(({ network }) => {
                assert.exists(network);
                assert.equal(network.name, TEST_NETWORK.name);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should unassign network with name: ${TEST_NETWORK.name} from user with login: ${TEST_USERS.HTTP.login} via HTTP`, done => {
        httpDeviceHive.user.unassignNetwork(TEST_USERS.HTTP.id, TEST_NETWORK.id)
            .then(() => httpDeviceHive.user.getNetwork(TEST_USERS.HTTP.id, TEST_NETWORK.id))
            .then(() => done(new Error(`Network with id ${TEST_NETWORK.id} for user with id ${TEST_USERS.HTTP.id} should not be found`)))
            .catch(() => done());
    });

    it(`should assign network with name: ${TEST_NETWORK.name} to user with login: ${TEST_USERS.WS.login} via WS`, done => {
        wsDeviceHive.user.assignNetwork(TEST_USERS.WS.id, TEST_NETWORK.id)
            .then(() => done())
            .catch(done);
    });

    it(`should get users network with name: ${TEST_NETWORK.name} via WS`, done => {
        wsDeviceHive.user.getNetwork(TEST_USERS.WS.id, TEST_NETWORK.id)
            .then(({ network }) => {
                assert.exists(network);
                assert.equal(network.name, TEST_NETWORK.name);
            })
            .then(() => done())
            .catch(done);
    });

    it(`should unassign network with name: ${TEST_NETWORK.name} from user with login: ${TEST_USERS.WS.login} via WS`, done => {
        wsDeviceHive.user.unassignNetwork(TEST_USERS.WS.id, TEST_NETWORK.id)
            .then(() => wsDeviceHive.user.getNetwork(TEST_USERS.WS.id, TEST_NETWORK.id))
            .then(() => done(new Error(`Network with id ${TEST_NETWORK.id} for user with id ${TEST_USERS.WS.id} should not be found`)))
            .catch(() => done());
    });

    it(`should delete user with login: ${TEST_USERS.HTTP.login} via HTTP`, done => {
        httpDeviceHive.user.delete(TEST_USERS.HTTP.id)
            .then(() => done())
            .catch(done);
    });

    it(`should delete user with login: ${TEST_USERS.WS.login} via WS`, done => {
        wsDeviceHive.user.delete(TEST_USERS.WS.id)
            .then(() => done())
            .catch(done);
    });

    after(done => {
        httpDeviceHive.deviceType.delete(TEST_DEVICE_TYPE.id)
            .then(() => httpDeviceHive.network.delete(TEST_NETWORK.id))
            .then(() => {
                httpDeviceHive.disconnect();
                wsDeviceHive.disconnect();

                done();
            });
    });
});