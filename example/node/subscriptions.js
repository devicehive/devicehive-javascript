const DeviceHive = require(`../../index`);

const deviceHive = new DeviceHive({
    login: `dhadmin`,
    password: `dhadmin_#911`,
    //mainServiceURL: 'ws://localhost:8080/dh/websocket',
    mainServiceURL: 'http://localhost:8080/dh/rest',
    authServiceURL: 'http://localhost:8090/dh/rest',
    pluginServiceURL: 'http://localhost:8110/dh/rest',
    autoUpdateSession: true
});


void async function start () {
    try {
        deviceHive.on(DeviceHive.MESSAGE_EVENT, (message) => {
            console.log(message);
        });

        deviceHive.on(DeviceHive.ERROR_EVENT, (error) => {
            console.error(error);
        });

        await deviceHive.connect();

        const { subscriptionId } = await deviceHive.notification.subscribe(new DeviceHive.models.query.NotificationPollQuery({
            deviceId: `e50d6085-2aba-48e9-b1c3-73c673e414be`,
            names: [`test`]
        }));

        console.log(subscriptionId);

        setTimeout(async () => {
            await deviceHive.notification.unsubscribe(subscriptionId);
            console.log(`unsubscribed`);
        }, 10000);

    } catch (error) {
        console.warn(error);
    }
}();