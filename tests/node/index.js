const DeviceHive = require(`../../index`);

const httpDeviceHive = new DeviceHive({
    login: `dhadmin`,
    password: `dhadmin_#911`,
    mainServiceURL: 'http://localhost:8080/dh/rest',
    authServiceURL: 'http://localhost:8090/dh/rest',
    pluginServiceURL: 'http://localhost:8110/dh/rest'
});

const wsDeviceHive = new DeviceHive({
    login: `dhadmin`,
    password: `dhadmin_#911`,
    mainServiceURL: 'ws://localhost:8080/dh/websocket'
});

const DeviceListQuery = DeviceHive.models.query.DeviceListQuery;

const query1 = new DeviceListQuery({
    networkId: 1
});

void async function start () {
    try {
        await httpDeviceHive.connect();
        await wsDeviceHive.connect();

        console.log(await httpDeviceHive.token.login('dhadmin', 'dhadmin_#911'));
        console.log(await  httpDeviceHive.device.list(query1));


        console.log(await wsDeviceHive.token.login('dhadmin', 'dhadmin_#911'));
        console.log(await  wsDeviceHive.device.list(query1));
    } catch (error) {
        console.warn(error);
    }
}();