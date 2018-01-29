class API {

    static get login() { return 'login'; };
    static get createUserToken() { return 'createUserToken'; };
    static get refreshToken() { return 'refreshToken'; };
    static get createPluginToken() { return 'createPluginToken'; };
    static get authenticatePlugin() { return 'authenticatePlugin'; };

    static get getServerInfo() { return 'getServerInfo'; };
    static get getClusterInfo() { return 'getClusterInfo'; };

    static get getConfiguration() { return 'getConfiguration'; };
    static get putConfiguration() { return 'putConfiguration'; };
    static get deleteConfiguration() { return 'deleteConfiguration'; };

    static get listDevice() { return 'listDevice'; };
    static get countDevice() { return 'countDevice'; };
    static get getDevice() { return 'getDevice'; };
    static get addDevice() { return 'addDevice'; };
    static get deleteDevice() { return 'deleteDevice'; };

    static get listDeviceType() { return 'listDeviceType'; };
    static get countDeviceType() { return 'countDeviceType'; };
    static get getDeviceType() { return 'getDeviceType'; };
    static get addDeviceType() { return 'addDeviceType'; };
    static get updateDeviceType() { return 'updateDeviceType'; };
    static get deleteDeviceType() { return 'deleteDeviceType'; };

    static get getCommand() { return 'getCommand'; };
    static get listCommand() { return 'listCommand'; };
    static get insertCommand() { return 'insertCommand'; };
    static get subscribeCommand() { return 'subscribeCommand'; };
    static get pollCommand() { return 'pollCommand'; };
    static get pollManyCommand() { return 'pollManyCommand'; };
    static get waitCommand() { return 'waitCommand'; };
    static get unsubscribeCommand() { return 'unsubscribeCommand'; };
    static get updateCommand() { return 'updateCommand'; };

    static get getNotification() { return 'getNotification'; };
    static get listNotification() { return 'listNotification'; };
    static get insertNotification() { return 'insertNotification'; };
    static get subscribeNotification() { return 'subscribeNotification'; };
    static get unsubscribeNotification() { return 'unsubscribeNotification'; };
    static get pollNotification() { return 'pollNotification'; };
    static get pollManyNotification() { return 'pollManyNotification'; };

    static get listNetwork() { return 'listNetwork'; };
    static get countNetwork() { return 'countNetwork'; };
    static get getNetwork() { return 'getNetwork'; };
    static get addNetwork() { return 'addNetwork'; };
    static get updateNetwork() { return 'updateNetwork'; };
    static get deleteNetwork() { return 'deleteNetwork'; };

    static get listUser() { return 'listUser'; };
    static get countUser() { return 'countUser'; };
    static get getUser() { return 'getUser'; };
    static get addUser() { return 'addUser'; };
    static get updateUser() { return 'updateUser'; };
    static get deleteUser() { return 'deleteUser'; };
    static get getCurrentUser() { return 'getCurrentUser'; };
    static get updateCurrentUser() { return 'updateCurrentUser'; };
    static get getUserNetwork() { return 'getUserNetwork'; };
    static get assignNetwork() { return 'assignNetwork'; };
    static get unassignNetwork() { return 'unassignNetwork'; };

    static get registerPlugin() { return 'registerPlugin'; };


    static get INFO_TYPE() { return 'info'; }
    static get CONFIGURATION_TYPE() { return 'configuration'; }
    static get DEVICE_TYPE() { return 'device'; }
    static get DEVICECOMMAND_TYPE() { return 'command'; }
    static get DEVICENOTIFICATION_TYPE() { return 'notification'; }
    static get DEVICETYPE_TYPE() { return 'devicetype'; }
    static get NETWORK_TYPE() { return 'network'; }
    static get TOKEN_TYPE() { return 'token'; }
    static get USER_TYPE() { return 'user'; }

    /**
     * API
     */
    constructor({ strategy }) {
        this.send = data => {
            return strategy.send({
                apiType: this.type,
                nestedApiType: this.nestedType,
                ...data,
            });
        }
    }
}

module.exports = API;