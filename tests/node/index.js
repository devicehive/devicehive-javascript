const DeviceHive = require(`../../index`);

const httpDeviceHive = new DeviceHive({
    login: `dhadmin`,
    password: `dhadmin_#911`,
    //mainServiceURL: 'http://localhost:8080/dh/rest',
    mainServiceURL: 'ws://localhost:8080/dh/websocket',
    authServiceURL: 'http://localhost:8090/dh/rest',
    pluginServiceURL: 'http://localhost:8110/dh/rest'
});

const CommandPollQuery = DeviceHive.models.query.CommandPollQuery;
const NotificationPollQuery = DeviceHive.models.query.NotificationPollQuery;
const DeviceListQuery = DeviceHive.models.query.DeviceListQuery;
const Device = DeviceHive.models.Device;
const query = new CommandPollQuery({
    deviceId: 'e50d6085-2aba-48e9-b1c3-73c673e414be',
    names: [ 'test' ]
});

const nQuery = new NotificationPollQuery({
    deviceId: 'e50d6085-2aba-48e9-b1c3-73c673e414be',
    names: [ 'test' ]
});

const query1 = new DeviceListQuery({
    networkId: 1
});

const device = new Device({
    id: `myTestId`,
    name: `myTestName`,
    networkId: 1,
    deviceTypeId: 1,
    blocked: false
});

httpDeviceHive.on(`message`, (message) => {
    console.log(message);
});

httpDeviceHive.connect()
    .then(() => httpDeviceHive.command.subscribe(query))
    .then((data) => console.log(data))
    .catch((error) => console.warn(error));

// httpDeviceHive.connect()
//     .then(() => httpDeviceHive.device.list(query1))
//     .then((data) => console.log(data))
//     .then(() => httpDeviceHive.device.add(device))
//     .then((data) => console.log(data))
//     .then(() => httpDeviceHive.device.list(query1))
//     .then((data) => console.log(data))
//     .then(() => httpDeviceHive.device.delete(device.id))
//     .then((data) => console.log(data))
//     .then(() => httpDeviceHive.device.list(query1))
//     .then((data) => console.log(data))
//     .catch((error) => console.warn(error));
