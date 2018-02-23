const DeviceHive = require(`../../index`);

const httpDeviceHive = new DeviceHive({
    // login: `dhadmin`,
    // password: `dhadmin_#911`,
    accessToken: "eyJhbGciOiJIUzI1NiJ9.eyJwYXlsb2FkIjp7ImEiOlswXSwiZSI6MTUxOTM5ODgxNjg5NCwidCI6MSwidSI6MSwibiI6WyIqIl0sImR0IjpbIioiXX19.cMQ5biZFHZMiCWZtdZAcT8Sb4yqG6h9Jj-Ht1yKydIM",
    mainServiceURL: 'http://localhost:8080/dh/rest',
    authServiceURL: 'http://localhost:8090/dh/rest',
    pluginServiceURL: 'http://localhost:8110/dh/rest'
});

const wsDeviceHive = new DeviceHive({
    // login: `dhadmin`,
    // password: `dhadmin_#911`,
    accessToken: "eyJhbGciOiJIUzI1NiJ9.eyJwYXlsb2FkIjp7ImEiOlswXSwiZSI6MTUxOTQwNDUyMTA5OSwidCI6MSwidSI6MSwibiI6WyIqIl0sImR0IjpbIioiXX19.P3MIy194dUgTM3U--KvPG7yc2pNgsEOABIY8Y5xXdGE",
    mainServiceURL: 'ws://localhost:8080/dh/websocket',
    autoUpdateSession: true
});

const DeviceListQuery = DeviceHive.models.query.DeviceListQuery;
const DeviceTypeListQuery = DeviceHive.models.query.DeviceTypeListQuery;
const NetworkListQuery = DeviceHive.models.query.NetworkListQuery;

const deviceListQuery = new DeviceListQuery({
    networkId: 1
});

const deviceTypeListQuery = new DeviceTypeListQuery();
const networkListQuery = new NetworkListQuery();

void async function start () {
    try {
        // await httpDeviceHive.connect();
        await wsDeviceHive.connect();

        // {
        //     const {accessToken, refreshToken} = await httpDeviceHive.token.login('dhadmin', 'dhadmin_#911');
        //     console.log({accessToken, refreshToken});
        //     console.log(await  httpDeviceHive.device.list(deviceListQuery));
        //     console.log(await  httpDeviceHive.deviceType.list(deviceTypeListQuery));
        //     console.log(await  httpDeviceHive.network.list(networkListQuery));
        //     console.log(await  httpDeviceHive.network.list(networkListQuery));
        //     console.log(await  httpDeviceHive.token.refresh(refreshToken));
        //
        //     setTimeout(async () => {
        //         console.log(await  httpDeviceHive.network.list(networkListQuery));
        //     }, 60000);
        // }

        {
            const {accessToken, refreshToken} = await wsDeviceHive.token.login('dhadmin', 'dhadmin_#911');
            console.log({accessToken, refreshToken});
            console.log(await  wsDeviceHive.device.list(deviceListQuery));
            console.log(await  wsDeviceHive.deviceType.list(deviceTypeListQuery));
            console.log(await  wsDeviceHive.network.list(networkListQuery));
            console.log(await  wsDeviceHive.token.refresh(refreshToken));
        }
    } catch (error) {
        console.warn(error);
    }
}();