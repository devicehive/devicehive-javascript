const DeviceHive = require('./src/DeviceHive');

module.exports = DeviceHive;



const Device = require(`./src/models/Device`);

const testDevice = new Device({
    id: `testId2`,
    name: `testName`,
    data: {},
    networkId: 1,
    deviceTypeId: 1,
    blocked: false
});

const httpDeviceHive = new DeviceHive({
    login: `dhadmin`,
    password: `dhadmin_#911`,
    mainServiceURL: 'http://localhost:8080/dh/rest',
    authServiceURL: 'http://localhost:8090/dh/rest',
    pluginServiceURL: 'http://localhost:8110/dh/rest'
});

httpDeviceHive.connect()
    .then(() => httpDeviceHive.info.getServerInfo())
    .then((info) => console.log(info))
    .then(() => httpDeviceHive.info.getClusterInfo())
    .then((info) => console.log(info))
    .then(() => httpDeviceHive.device.get('testId'))
    .then((info) => console.log(info))
    .then(() => httpDeviceHive.device.add(testDevice))
    .then((info) => console.log(info))
    .then(() => httpDeviceHive.token.login('username', 'password'))
    .then((info) => console.log(info))
    .catch((err) => console.warn(err));


const wsDeviceHive = new DeviceHive({
    login: `dhadmin`,
    password: `dhadmin_#911`,
    mainServiceURL: 'ws://localhost:8080/dh/rest'
});

wsDeviceHive.connect()
    .then(() => wsDeviceHive.info.getServerInfo())
    .then((info) => console.log(info))
    .then(() => wsDeviceHive.info.getClusterInfo())
    .then((info) => console.log(info))
    .then(() => wsDeviceHive.device.get('testId'))
    .then((info) => console.log(info))
    .then(() => wsDeviceHive.device.add(testDevice))
    .then((info) => console.log(info))
    .then(() => wsDeviceHive.token.login('username', 'password'))
    .then((info) => console.log(info))
    .catch((err) => console.warn(err));