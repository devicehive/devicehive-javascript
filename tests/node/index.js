const DeviceHive = require(`../../index`);

const httpDeviceHive = new DeviceHive({
    login: `dhadmin`,
    password: `dhadmin_#911`,
    mainServiceURL: 'http://localhost:8080/dh/rest',
    authServiceURL: 'http://localhost:8090/dh/rest',
    pluginServiceURL: 'http://localhost:8110/dh/rest'
});

const CommandPollQuery = DeviceHive.models.query.CommandPollQuery;
const query = new CommandPollQuery({
    deviceId: 'e50d6085-2aba-48e9-b1c3-73c673e414be',
    names: 'test'
});

let subscriptionId;

httpDeviceHive.on(`message`, (message) => {
    console.log(message);
});

httpDeviceHive.connect()
    .then((httpDeviceHive) => httpDeviceHive.command.subscribe(query))
    .then((data) => subscriptionId = data.subscriptionId)
    .catch((error) => console.warn(error));

setTimeout(() => {
    httpDeviceHive.command.unsubscribe(subscriptionId)
        .then((data) => subscriptionId = data.subscriptionId)
}, 10000);