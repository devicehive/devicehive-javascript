



# DeviceHive-javascript

DeviceHive-javascript is promise-based library for using DeviceHive.

## Installation Instructions

For Node.js use case (Node v4.x on Mac, Linux, or Windows on a x86 or x64 processor), DeviceHive-javascript will install nice and easy with:

`npm install devicehive`

### Generation bundle for browser usage

In case you want to use DeviceHive-javascript in the browser:
1. Clone repo;
2. Inside repo folder run `npm install`;
3. Inside repo folder run `npm run build`;
4. Get `devicehive.js`/`devicehive.min.js` in `dist` folder.

## Usage

During development you can use this library with Promises, and Async/Await functions.

### Connecting to DeviceHive

#### Using HTTP/HTTPS
*Note: Using HTTP/HTTPS you need to pass 3 different service URL`s: **mainServiceURL**, **authServiceURL** and **pluginServiceURL**.*

``` js
const DeviceHive = require('devicehive');
const httpDeviceHive = new DeviceHive({
    login: 'login',
    password: 'password',
    mainServiceURL: 'http://<host>:<port>/<path>',
    authServiceURL: 'http://<host>:<port>/<path>',
    pluginServiceURL: 'http://<host>:<port>/<path>'
});
httpDeviceHive.connect();
```

#### Using WebSocket
*Note: Using WebSocket you need to pass only one service URL: **mainServiceURL**.*
``` js
const DeviceHive = require('devicehive');
const wsDeviceHive= new DeviceHive({
    login: 'login',
    password: 'password',
    mainServiceURL: 'ws://<host>:<port>/<path>'
});
wsDeviceHive.connect();
```

### Using Models
You can use models described in [DeviceHive.models](#DeviceHive.models)

``` js
// Getting Device model
const Device = DeviceHive.models.Device;

// Getting Device list query model
const DeviceListQuery = DeviceHive.models.query.DeviceListQuery;
```

### Full Example and using API

You can use API described in [DeviceHive.command](#DeviceHive.command), [DeviceHive.configuration](#DeviceHive.configuration), [DeviceHive.device](#DeviceHive.device), [DeviceHive.deviceType](#DeviceHive.deviceType), [DeviceHive.info](#DeviceHive.info), [DeviceHive.notification](#DeviceHive.notification), [DeviceHive.network](#DeviceHive.network), [DeviceHive.plugin](#DeviceHive.plugin), [DeviceHive.token](#DeviceHive.token), [DeviceHive.user](#DeviceHive.user).

Here is example of how you can use DeviceHive-javascript:

``` js
const DeviceHive = require('devicehive');

// Getting Device model
const Device = DeviceHive.models.Device
// Getting Device list query model
const DeviceListQuery = DeviceHive.models.query.DeviceListQuery;

// Configurating DeviceHive
const myDeviceHive = new DeviceHive({
    login: 'login',
    password: 'password',
    mainServiceURL: 'ws://<host>:<port>/<path>'
});

// Configurating Device model
const device = new Device({
    id: 'myTestId',
    name: 'myTestName',
    networkId: 1,
    deviceTypeId: 1,
    blocked: false
});

// Configurating Device List query
const myDeviceListQuery = new DeviceListQuery({
    networkId: 1
});

// Connecting and usin API
myDeviceHive.connect()
    .then(() => myDeviceHive.device.list(myDeviceListQuery))
    .then(data => console.log(data))
    .then(() => myDeviceHive.device.add(device))
    .then(data => console.log(data))
    .then(() => myDeviceHive.device.list(myDeviceListQuery))
    .then(data => console.log(data))
    .then(() => myDeviceHive.device.delete(device.id))
    .then(data => console.log(data))
    .then(() => myDeviceHive.device.list(myDeviceListQuery))
    .then(data => console.log(data))
    .catch(error => console.warn(error));
```

## API Reference
  
<a name="DeviceHive"></a>

## DeviceHive
DeviceHive module

* [DeviceHive](#DeviceHive)
    * [new DeviceHive(options)](#new_DeviceHive_new)
    * _instance_
        * [.connect()](#DeviceHive+connect)
    * _static_
        * [.models](#DeviceHive.models) : <code>Object</code>

<a name="new_DeviceHive_new"></a>

### new DeviceHive(options)
DeviceHive module


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Initial settings |
| [options.accessToken] | <code>string</code> | Access token |
| [options.refreshToken] | <code>string</code> | Refresh token |
| [options.login] | <code>string</code> | Login |
| [options.password] | <code>string</code> | Paaword |
| options.mainServiceURL | <code>string</code> | Main Service URL |
| [options.authServiceURL] | <code>string</code> | Auth Service URL (required only for http) |
| [options.pluginServiceURL] | <code>string</code> | Alug inServi ceURL (required only for http) |

<a name="DeviceHive+connect"></a>

### deviceHive.connect()
Connect and authorize

<a name="DeviceHive.models"></a>

### DeviceHive.models : <code>Object</code>
Returns DeviceHive models

* [Command](#Command)
* [Configuration](#Configuration)
* [DeviceType](#DeviceType)
* [Network](#Network)
* [Notification](#Notification)
* [UserToken](#UserToken)
* [PluginToken](#PluginToken)
* [User](#User)
* query
    * [CommandListQuery](#CommandListQuery)
    * [CommandPollManyQuery](#CommandPollManyQuery)
    * [CommandPollQuery](#CommandPollQuery)
    * [CommandWaitQuery](#CommandWaitQuery)
    * [DeviceCountQuery](#DeviceCountQuery)
    * [DeviceListQuery](#DeviceListQuery)
    * [DeviceTypeCountQuery](#DeviceTypeCountQuery)
    * [DeviceTypeListQuery](#DeviceTypeListQuery)
    * [PluginUpdateQuery](#PluginUpdateQuery)
    * [NetworkCountQuery](#NetworkCountQuery)
    * [NetworkListQuery](#NetworkListQuery)
    * [NotificationListQuery](#NotificationListQuery)
    * [NotificationPollManyQuery](#NotificationPollManyQuery)
    * [NotificationPollQuery](#NotificationPollQuery)
    * [UserCountQuery](#UserCountQuery)
    * [UserListQuery](#UserListQuery)
    * [PluginCountQuery](#PluginCountQuery)
    * [PluginListQuery](#PluginListQuery)
    * [PluginRegisterQuery](#PluginRegisterQuery)

<a name="DeviceHive.command"></a>
### DeviceHive.command: <code>Object</code>
Look at [DeviceCommandAPI](#DeviceCommandAPI).

<a name="DeviceHive.configuration"></a>
### DeviceHive.configuration : <code>Object</code>
Look at [ConfigurationAPI](#ConfigurationAPI).

<a name="DeviceHive.device"></a>
### DeviceHive.device: <code>Object</code>
Look at [DeviceAPI](#DeviceAPI).

<a name="DeviceHive.deviceType"></a>
### DeviceHive.deviceType: <code>Object</code>
Look at [deviceTypeAPI](#DeviceTypeAPI).


<a name="DeviceHive.info"></a>
### DeviceHive.info: <code>Object</code>
Look at [InfoAPI](#InfoAPI).

<a name="DeviceHive.notification"></a>
### DeviceHive.notification: <code>Object</code>
Look at [DeviceNotificationAPI](#DeviceNotificationAPI).

<a name="DeviceHive.network"></a>
### DeviceHive.network: <code>Object</code>
Look at [NetworkAPI](#NetworkAPI).

<a name="DeviceHive.plugin"></a>
### DeviceHive.plugin: <code>Object</code>
Look at [PluginAPI](#PluginAPI).

<a name="DeviceHive.token"></a>
### DeviceHive.token: <code>Object</code>
Look at [TokenAPI](#TokenAPI).

<a name="DeviceHive.user"></a>
### DeviceHive.user: <code>Object</code>
Look at [UserAPI](#UserAPI).


---

## Nested DeviceHive API


<a name="ConfigurationAPI"></a>

## ConfigurationAPI
Returns information about the current configuration


* [ConfigurationAPI](#ConfigurationAPI)
    * [.get(name)](#ConfigurationAPI+get) ⇒ <code>Promise</code>
    * [.put(configuration)](#ConfigurationAPI+put) ⇒ <code>Promise</code>
    * [.delete(name)](#ConfigurationAPI+delete) ⇒ <code>Promise</code>

<a name="ConfigurationAPI+get"></a>

### configurationAPI.get(name) ⇒ <code>Promise</code>
Creates ConfigurationAPI

| Param | Type |
| --- | --- |
| name | <code>number</code> | 

<a name="ConfigurationAPI+put"></a>

### configurationAPI.put(configuration) ⇒ <code>Promise</code>
Updates a configuration

| Param | Type |
| --- | --- |
| configuration | <code>Configuration</code> | 

<a name="ConfigurationAPI+delete"></a>

### configurationAPI.delete(name) ⇒ <code>Promise</code>
Deletes an existing configuration


| Param | Type |
| --- | --- |
| name | <code>number</code> | 

<a name="DeviceAPI"></a>

## DeviceAPI
Returns information about the current device


* [DeviceAPI](#DeviceAPI)
    * [.get(deviceId)](#DeviceAPI+get) ⇒ <code>Promise</code>
    * [.list(deviceListQuery)](#DeviceAPI+list) ⇒ <code>Promise</code>
    * [.count(deviceCountQuery)](#DeviceAPI+count) ⇒ <code>Promise</code>
    * [.add(device)](#DeviceAPI+add) ⇒ <code>Promise</code>
    * [.delete(deviceId)](#DeviceAPI+delete) ⇒ <code>Promise</code>

<a name="DeviceAPI+get"></a>

### deviceAPI.get(deviceId) ⇒ <code>Promise</code>
Creates DeviceAPI

| Param | Type |
| --- | --- |
| deviceId | <code>string</code> | 

<a name="DeviceAPI+list"></a>

### deviceAPI.list(deviceListQuery) ⇒ <code>Promise</code>
Return a list of devices

| Param | Type |
| --- | --- |
| deviceListQuery | <code>DeviceListQuery</code> | 

<a name="DeviceAPI+count"></a>

### deviceAPI.count(deviceCountQuery) ⇒ <code>Promise</code>
Returns count of devices

| Param | Type |
| --- | --- |
| deviceCountQuery | <code>DeviceCountQuery</code> | 

<a name="DeviceAPI+add"></a>

### deviceAPI.add(device) ⇒ <code>Promise</code>
Registers or updates a device

| Param | Type | Description |
| --- | --- | --- |
| device | <code>object</code> | data |

<a name="DeviceAPI+delete"></a>

### deviceAPI.delete(deviceId) ⇒ <code>Promise</code>
Deletes an existing device


| Param | Type |
| --- | --- |
| deviceId | <code>string</code> | 

<a name="DeviceCommandAPI"></a>

## DeviceCommandAPI
Returns information about the current command


* [DeviceCommandAPI](#DeviceCommandAPI)
    * [.get(deviceId, commandId)](#DeviceCommandAPI+get) ⇒ <code>Promise</code>
    * [.list(commandListQuery)](#DeviceCommandAPI+list) ⇒ <code>Promise</code>
    * [.insert(deviceId, command)](#DeviceCommandAPI+insert) ⇒ <code>Promise</code>
    * [.update(command)](#DeviceCommandAPI+update) ⇒ <code>Promise</code>
    * [.poll(commandPollQuery)](#DeviceCommandAPI+poll) ⇒ <code>Promise</code>
    * [.pollMany(commandPollManyQuery)](#DeviceCommandAPI+pollMany) ⇒ <code>Promise</code>
    * [.wait(deviceId, commandId)](#DeviceCommandAPI+wait) ⇒ <code>Promise</code>
    * [.subscribe(commandPollQuery)](#DeviceCommandAPI+subscribe) ⇒ <code>Promise</code>
    * [.unsubscribe(subscriptionId)](#DeviceCommandAPI+unsubscribe) ⇒ <code>Promise</code>

<a name="DeviceCommandAPI+get"></a>

### deviceCommandAPI.get(deviceId, commandId) ⇒ <code>Promise</code>
Creates DeviceCommandAPI

| Param | Type | Description |
| --- | --- | --- |
| deviceId | <code>number</code> | Device ID |
| commandId | <code>number</code> | Command ID |

<a name="DeviceCommandAPI+list"></a>

### deviceCommandAPI.list(commandListQuery) ⇒ <code>Promise</code>
Return a list of commands

| Param | Type |
| --- | --- |
| commandListQuery | <code>CommandListQuery</code> | 

<a name="DeviceCommandAPI+insert"></a>

### deviceCommandAPI.insert(deviceId, command) ⇒ <code>Promise</code>
Registers a command

| Param | Type | Description |
| --- | --- | --- |
| deviceId | <code>number</code> | Device ID |
| command | <code>Command</code> |  |

<a name="DeviceCommandAPI+update"></a>

### deviceCommandAPI.update(command) ⇒ <code>Promise</code>
Updates a command

| Param | Type |
| --- | --- |
| command | <code>Command</code> | 

<a name="DeviceCommandAPI+poll"></a>

### deviceCommandAPI.poll(commandPollQuery) ⇒ <code>Promise</code>

| Param | Type |
| --- | --- |
| commandPollQuery | <code>CommandPollQuery</code> | 

<a name="DeviceCommandAPI+pollMany"></a>

### deviceCommandAPI.pollMany(commandPollManyQuery) ⇒ <code>Promise</code>

| Param | Type |
| --- | --- |
| commandPollManyQuery | <code>CommandPollManyQuery</code> | 

<a name="DeviceCommandAPI+wait"></a>

### deviceCommandAPI.wait(deviceId, commandId) ⇒ <code>Promise</code>

| Param |
| --- |
| deviceId | 
| commandId | 

<a name="DeviceCommandAPI+subscribe"></a>

### deviceCommandAPI.subscribe(commandPollQuery) ⇒ <code>Promise</code>

| Param | Type |
| --- | --- |
| commandPollQuery | <code>CommandPollQuery</code> | 

<a name="DeviceCommandAPI+unsubscribe"></a>

### deviceCommandAPI.unsubscribe(subscriptionId) ⇒ <code>Promise</code>

| Param | Type |
| --- | --- |
| subscriptionId | <code>Number</code> | 

<a name="DeviceNotificationAPI"></a>

## DeviceNotificationAPI
Returns information about the current notification


* [DeviceNotificationAPI](#DeviceNotificationAPI)
    * [.get(deviceId, notificationId)](#DeviceNotificationAPI+get) ⇒ <code>Promise</code>
    * [.list(notificationListQuery)](#DeviceNotificationAPI+list) ⇒ <code>Promise</code>
    * [.insert(notification)](#DeviceNotificationAPI+insert) ⇒ <code>Promise</code>
    * [.poll(notificationPollQuery)](#DeviceNotificationAPI+poll) ⇒ <code>\*</code>
    * [.pollMany(notificationPollManyQuery)](#DeviceNotificationAPI+pollMany) ⇒ <code>\*</code>
    * [.subscribe(notificationPollQuery)](#DeviceNotificationAPI+subscribe) ⇒ <code>Promise</code>
    * [.unsubscribe(subscriptionId)](#DeviceNotificationAPI+unsubscribe) ⇒ <code>Promise</code>

<a name="DeviceNotificationAPI+get"></a>

### deviceNotificationAPI.get(deviceId, notificationId) ⇒ <code>Promise</code>
Creates DeviceNotificationAPI

| Param | Type | Description |
| --- | --- | --- |
| deviceId | <code>number</code> | Device ID |
| notificationId | <code>number</code> | Notification ID |

<a name="DeviceNotificationAPI+list"></a>

### deviceNotificationAPI.list(notificationListQuery) ⇒ <code>Promise</code>
Return a list of notifications

| Param | Type |
| --- | --- |
| notificationListQuery | <code>NotificationListQuery</code> | 

<a name="DeviceNotificationAPI+insert"></a>

### deviceNotificationAPI.insert(notification) ⇒ <code>Promise</code>
Registers a notification

| Param | Type |
| --- | --- |
| notification | <code>Notification</code> | 

<a name="DeviceNotificationAPI+poll"></a>

### deviceNotificationAPI.poll(notificationPollQuery) ⇒ <code>\*</code>

| Param | Type |
| --- | --- |
| notificationPollQuery | <code>NotificationPollQuery</code> | 

<a name="DeviceNotificationAPI+pollMany"></a>

### deviceNotificationAPI.pollMany(notificationPollManyQuery) ⇒ <code>\*</code>

| Param | Type |
| --- | --- |
| notificationPollManyQuery | <code>NotificationPollManyQuery</code> | 

<a name="DeviceNotificationAPI+subscribe"></a>

### deviceNotificationAPI.subscribe(notificationPollQuery) ⇒ <code>Promise</code>

| Param | Type |
| --- | --- |
| notificationPollQuery | <code>NotificationPollQuery</code> | 

<a name="DeviceNotificationAPI+unsubscribe"></a>

### deviceNotificationAPI.unsubscribe(subscriptionId) ⇒ <code>Promise</code>

| Param | Type |
| --- | --- |
| subscriptionId | <code>Number</code> | 

<a name="DeviceTypeAPI"></a>

## DeviceTypeAPI
Returns information about the current deviceType


* [DeviceTypeAPI](#DeviceTypeAPI)
    * [.get(deviceTypeId)](#DeviceTypeAPI+get) ⇒ <code>Promise</code>
    * [.list(deviceTypeListQuery)](#DeviceTypeAPI+list) ⇒ <code>Promise</code>
    * [.count(deviceTypeCountQuery)](#DeviceTypeAPI+count) ⇒ <code>Promise</code>
    * [.insert(deviceType)](#DeviceTypeAPI+insert) ⇒ <code>Promise</code>
    * [.update(deviceType)](#DeviceTypeAPI+update) ⇒ <code>Promise</code>
    * [.delete(deviceTypeId)](#DeviceTypeAPI+delete) ⇒ <code>Promise</code>

<a name="DeviceTypeAPI+get"></a>

### deviceTypeAPI.get(deviceTypeId) ⇒ <code>Promise</code>
Creates DeviceTypeAPI

| Param | Type |
| --- | --- |
| deviceTypeId | <code>number</code> | 

<a name="DeviceTypeAPI+list"></a>

### deviceTypeAPI.list(deviceTypeListQuery) ⇒ <code>Promise</code>
Return a list of deviceTypes

| Param | Type |
| --- | --- |
| deviceTypeListQuery | <code>DeviceTypeListQuery</code> | 

<a name="DeviceTypeAPI+count"></a>

### deviceTypeAPI.count(deviceTypeCountQuery) ⇒ <code>Promise</code>
Returns count of deviceTypes

| Param | Type |
| --- | --- |
| deviceTypeCountQuery | <code>DeviceTypeCountQuery</code> | 

<a name="DeviceTypeAPI+insert"></a>

### deviceTypeAPI.insert(deviceType) ⇒ <code>Promise</code>
Registers a deviceType

| Param | Type | Description |
| --- | --- | --- |
| deviceType | <code>DeviceType</code> | data |

<a name="DeviceTypeAPI+update"></a>

### deviceTypeAPI.update(deviceType) ⇒ <code>Promise</code>
Updates a deviceType

| Param | Type | Description |
| --- | --- | --- |
| deviceType | <code>DeviceType</code> | data |

<a name="DeviceTypeAPI+delete"></a>

### deviceTypeAPI.delete(deviceTypeId) ⇒ <code>Promise</code>
Deletes an existing deviceType


| Param | Type |
| --- | --- |
| deviceTypeId | <code>number</code> | 

<a name="NetworkAPI"></a>

## NetworkAPI
Returns information about the current network


* [NetworkAPI](#NetworkAPI)
    * [.get(networkId)](#NetworkAPI+get) ⇒ <code>Promise</code>
    * [.list(networkListQuery)](#NetworkAPI+list) ⇒ <code>Promise</code>
    * [.count(networkCountQuery)](#NetworkAPI+count) ⇒ <code>Promise</code>
    * [.insert(network)](#NetworkAPI+insert) ⇒ <code>Promise</code>
    * [.update(networkId, network)](#NetworkAPI+update) ⇒ <code>Promise</code>
    * [.delete(networkId)](#NetworkAPI+delete) ⇒ <code>Promise</code>

<a name="NetworkAPI+get"></a>

### networkAPI.get(networkId) ⇒ <code>Promise</code>
Returns a network

| Param | Type |
| --- | --- |
| networkId | <code>number</code> | 

<a name="NetworkAPI+list"></a>

### networkAPI.list(networkListQuery) ⇒ <code>Promise</code>
Return a list of networks

| Param | Type |
| --- | --- |
| networkListQuery | <code>NetworkListQuery</code> | 

<a name="NetworkAPI+count"></a>

### networkAPI.count(networkCountQuery) ⇒ <code>Promise</code>
Returns count of networks

| Param | Type |
| --- | --- |
| networkCountQuery | <code>NetworkCountQuery</code> | 

<a name="NetworkAPI+insert"></a>

### networkAPI.insert(network) ⇒ <code>Promise</code>
Registers a network

| Param | Type | Description |
| --- | --- | --- |
| network | <code>Network</code> | data |

<a name="NetworkAPI+update"></a>

### networkAPI.update(networkId, network) ⇒ <code>Promise</code>
Updates a network

| Param | Type | Description |
| --- | --- | --- |
| networkId | <code>number</code> |  |
| network | <code>Network</code> | data |

<a name="NetworkAPI+delete"></a>

### networkAPI.delete(networkId) ⇒ <code>Promise</code>
Deletes an existing network

| Param | Type |
| --- | --- |
| networkId | <code>number</code> | 

<a name="PluginAPI"></a>

## PluginAPI
Returns information about the current plugin


* [PluginAPI](#PluginAPI)
    * [.list(pluginListQuery)](#PluginAPI+list) ⇒ <code>Promise</code>
    * [.count(pluginCountQuery)](#PluginAPI+count) ⇒ <code>Promise</code>
    * [.insert(plugin, pluginRegisterQuery)](#PluginAPI+insert) ⇒ <code>Promise</code>
    * [.update(plugin)](#PluginAPI+update) ⇒ <code>Promise</code>
    * [.delete(Plugin)](#PluginAPI+delete) ⇒ <code>Promise</code>

<a name="PluginAPI+list"></a>

### pluginAPI.list(pluginListQuery) ⇒ <code>Promise</code>
Return a list of plugins

| Param | Type |
| --- | --- |
| pluginListQuery | <code>PluginListQuery</code> | 

<a name="PluginAPI+count"></a>

### pluginAPI.count(pluginCountQuery) ⇒ <code>Promise</code>
Returns count of plugins

| Param | Type |
| --- | --- |
| pluginCountQuery | <code>PluginCountQuery</code> | 

<a name="PluginAPI+insert"></a>

### pluginAPI.insert(plugin, pluginRegisterQuery) ⇒ <code>Promise</code>
Registers a plugin

| Param | Type |
| --- | --- |
| plugin | <code>Plugin</code> | 
| pluginRegisterQuery | <code>PluginRegisterQuery</code> | 

<a name="PluginAPI+update"></a>

### pluginAPI.update(plugin) ⇒ <code>Promise</code>
Updates a plugin

| Param | Type |
| --- | --- |
| plugin | <code>Promise</code> | 

<a name="PluginAPI+delete"></a>

### pluginAPI.delete(Plugin) ⇒ <code>Promise</code>
Deletes an existing plugin

| Param | Type |
| --- | --- |
| Plugin | <code>object</code> | 

<a name="InfoAPI"></a>

## InfoAPI
Get server info


* [InfoAPI](#InfoAPI)
    * [.getServerInfo()](#InfoAPI+getServerInfo)
    * [.getCacheInfo()](#InfoAPI+getCacheInfo)
    * [.getClusterInfo()](#InfoAPI+getClusterInfo)

<a name="InfoAPI+getServerInfo"></a>

### infoAPI.getServerInfo()
Creates InfoAPI

<a name="InfoAPI+getCacheInfo"></a>

### infoAPI.getCacheInfo()
Get cache info

<a name="InfoAPI+getClusterInfo"></a>

### infoAPI.getClusterInfo()
Get cluster info

<a name="TokenAPI"></a>

## TokenAPI
Authentificate using login and password

**Kind**: global class

* [TokenAPI](#TokenAPI)
    * [.login(login, password)](#TokenAPI+login)
    * [.authPlugin(token)](#TokenAPI+authPlugin)
    * [.createUserToken(userToken)](#TokenAPI+createUserToken)
    * [.createPluginToken(pluginToken)](#TokenAPI+createPluginToken)
    * [.refresh(refreshToken)](#TokenAPI+refresh)

<a name="TokenAPI+login"></a>

### tokenAPI.login(login, password)
Creates TokenAPI

**Kind**: instance method of [<code>TokenAPI</code>](#TokenAPI)

| Param | Type |
| --- | --- |
| login | <code>string</code> |
| password | <code>string</code> |

<a name="TokenAPI+authPlugin"></a>

### tokenAPI.authPlugin(token)
Create user token

**Kind**: instance method of [<code>TokenAPI</code>](#TokenAPI)

| Param | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | Plugin token |

<a name="TokenAPI+createUserToken"></a>

### tokenAPI.createUserToken(userToken)
Create user token

**Kind**: instance method of [<code>TokenAPI</code>](#TokenAPI)

| Param | Type |
| --- | --- |
| userToken | <code>UserToken</code> |

<a name="TokenAPI+createPluginToken"></a>

### tokenAPI.createPluginToken(pluginToken)
Create plugin token

**Kind**: instance method of [<code>TokenAPI</code>](#TokenAPI)

| Param | Type |
| --- | --- |
| pluginToken | <code>PluginToken</code> |

<a name="TokenAPI+refresh"></a>

### tokenAPI.refresh(refreshToken)
Refresg token

**Kind**: instance method of [<code>TokenAPI</code>](#TokenAPI)

| Param | Type |
| --- | --- |
| refreshToken | <code>string</code> |

<a name="UserAPI"></a>

## UserAPI
Return a list of users


* [UserAPI](#UserAPI)
    * [.list(userListQuery)](#UserAPI+list) ⇒ <code>Promise</code>
    * [.count(userCountQuery)](#UserAPI+count) ⇒ <code>Promise</code>
    * [.get(userId)](#UserAPI+get) ⇒ <code>Promise</code>
    * [.insert(user)](#UserAPI+insert) ⇒ <code>Promise</code>
    * [.update(user)](#UserAPI+update) ⇒ <code>Promise</code>
    * [.delete(userId)](#UserAPI+delete) ⇒ <code>Promise</code>
    * [.getCurrent()](#UserAPI+getCurrent) ⇒ <code>Promise</code>
    * [.updateCurrent(user)](#UserAPI+updateCurrent) ⇒ <code>Promise</code>
    * [.getDeviceTypes(userId)](#UserAPI+getDeviceTypes) ⇒ <code>Promise</code>
    * [.unassignAllDeviceTypes(userId)](#UserAPI+unassignAllDeviceTypes) ⇒ <code>Promise</code>
    * [.assignAllDeviceTypes(userId)](#UserAPI+assignAllDeviceTypes) ⇒ <code>Promise</code>
    * [.unassignDeviceType(userId, deviceTypeId)](#UserAPI+unassignDeviceType) ⇒ <code>Promise</code>
    * [.getDeviceType(userId, deviceTypeId)](#UserAPI+getDeviceType) ⇒ <code>Promise</code>
    * [.assignDeviceType(userId, deviceTypeId)](#UserAPI+assignDeviceType) ⇒ <code>Promise</code>
    * [.getNetwork(userId, networkId)](#UserAPI+getNetwork) ⇒ <code>Promise</code>
    * [.assignNetwork(userId, networkId)](#UserAPI+assignNetwork) ⇒ <code>Promise</code>
    * [.unassignNetwork(userId, networkId)](#UserAPI+unassignNetwork) ⇒ <code>Promise</code>

<a name="UserAPI+list"></a>

### userAPI.list(userListQuery) ⇒ <code>Promise</code>
Creates UserAPI

| Param | Type |
| --- | --- |
| userListQuery | <code>UserListQuery</code> | 

<a name="UserAPI+count"></a>

### userAPI.count(userCountQuery) ⇒ <code>Promise</code>
Returns count of users

| Param | Type |
| --- | --- |
| userCountQuery | <code>UserCountQuery</code> | 

<a name="UserAPI+get"></a>

### userAPI.get(userId) ⇒ <code>Promise</code>
Returns information about the current user

| Param | Type |
| --- | --- |
| userId | <code>number</code> | 

<a name="UserAPI+insert"></a>

### userAPI.insert(user) ⇒ <code>Promise</code>
Registers a user

| Param | Type | Description |
| --- | --- | --- |
| user | <code>User</code> | data |

<a name="UserAPI+update"></a>

### userAPI.update(user) ⇒ <code>Promise</code>
Updates a user (only for administrators)

| Param | Type | Description |
| --- | --- | --- |
| user | <code>User</code> | data |

<a name="UserAPI+delete"></a>

### userAPI.delete(userId) ⇒ <code>Promise</code>
Deletes an existing user


| Param | Type |
| --- | --- |
| userId | <code>number</code> | 

<a name="UserAPI+getCurrent"></a>

### userAPI.getCurrent() ⇒ <code>Promise</code>
Returns information about the current user

<a name="UerAPI+updateCurrent"></a>

### userAPI.updateCurrent(user) ⇒ <code>Promise</code>
Updates a user (only for administrators)

| Param | Type | Description |
| --- | --- | --- |
| user | <code>User</code> | data |

<a name="UserAPI+getDeviceTypes"></a>

### userAPI.getDeviceTypes(userId) ⇒ <code>Promise</code>

| Param |
| --- |
| userId | 

<a name="UserAPI+unassignAllDeviceTypes"></a>

### userAPI.unassignAllDeviceTypes(userId) ⇒ <code>Promise</code>

| Param |
| --- |
| userId | 

<a name="UserAPI+assignAllDeviceTypes"></a>

### userAPI.assignAllDeviceTypes(userId) ⇒ <code>Promise</code>

| Param |
| --- |
| userId | 

<a name="UserAPI+unassignDeviceType"></a>

### userAPI.unassignDeviceType(userId, deviceTypeId) ⇒ <code>Promise</code>

| Param |
| --- |
| userId | 
| deviceTypeId | 

<a name="UserAPI+getDeviceType"></a>

### userAPI.getDeviceType(userId, deviceTypeId) ⇒ <code>Promise</code>

| Param |
| --- |
| userId | 
| deviceTypeId | 

<a name="UserAPI+assignDeviceType"></a>

### userAPI.assignDeviceType(userId, deviceTypeId) ⇒ <code>Promise</code>

| Param |
| --- |
| userId | 
| deviceTypeId | 

<a name="UserAPI+getNetwork"></a>

### userAPI.getNetwork(userId, networkId) ⇒ <code>Promise</code>
Gets information about user/network association


| Param | Type | Description |
| --- | --- | --- |
| userId | <code>number</code> | User ID |
| networkId | <code>number</code> | Network ID |

<a name="UserAPI+assignNetwork"></a>

### userAPI.assignNetwork(userId, networkId) ⇒ <code>Promise</code>
Associates network with the user


| Param | Type | Description |
| --- | --- | --- |
| userId | <code>number</code> | User ID |
| networkId | <code>number</code> | Network ID |

<a name="UserAPI+unassignNetwork"></a>

### userAPI.unassignNetwork(userId, networkId) ⇒ <code>Promise</code>
Removes association between network and user


| Param | Type | Description |
| --- | --- | --- |
| userId | <code>number</code> | User ID |
| networkId | <code>number</code> | Network ID |




## Classes

<dl>
<dt><a href="#DeviceCommand">DeviceCommand</a></dt>
<dd><p>DeviceCommand model</p>
</dd>
<dt><a href="#Configuration">Configuration</a></dt>
<dd><p>Configuration model</p>
</dd>
<dt><a href="#Device">Device</a></dt>
<dd><p>Device model</p>
</dd>
<dt><a href="#DeviceType">DeviceType</a></dt>
<dd><p>DeviceType model</p>
</dd>
<dt><a href="#Network">Network</a></dt>
<dd><p>Network model</p>
</dd>
<dt><a href="#DeviceNotification">DeviceNotification</a></dt>
<dd><p>DeviceNotification model</p>
</dd>
<dt><a href="#Plugin">Plugin</a></dt>
<dd><p>Plugin model</p>
</dd>
<dt><a href="#Token">Token</a></dt>
<dd><p>Token model</p>
</dd>
<dt><a href="#User">User</a></dt>
<dd><p>User model</p>
</dd>
</dl>

<a name="DeviceCommand"></a>

## DeviceCommand
DeviceCommand model


* [DeviceCommand](#DeviceCommand)
    * [new DeviceCommand(options)](#new_DeviceCommand_new)
    * [.id](#DeviceCommand+id) ⇒ <code>number</code>
    * [.name](#DeviceCommand+name) ⇒ <code>string</code>
    * [.notification](#DeviceCommand+notification) ⇒ <code>string</code>
    * [.timestamp](#DeviceCommand+timestamp) ⇒ <code>string</code>
    * [.lastUpdated](#DeviceCommand+lastUpdated) ⇒ <code>string</code>
    * [.userId](#DeviceCommand+userId) ⇒ <code>number</code>
    * [.deviceId](#DeviceCommand+deviceId) ⇒ <code>number</code>
    * [.networkId](#DeviceCommand+networkId) ⇒ <code>number</code>
    * [.deviceTypeId](#DeviceCommand+deviceTypeId) ⇒ <code>number</code>
    * [.parameters](#DeviceCommand+parameters) ⇒ <code>object</code>
    * [.lifetime](#DeviceCommand+lifetime) ⇒ <code>number</code>
    * [.status](#DeviceCommand+status) ⇒ <code>string</code>
    * [.result](#DeviceCommand+result) ⇒ <code>string</code>
    * [.toString()](#DeviceCommand+toString) ⇒ <code>string</code>
    * [.toObject()](#DeviceCommand+toObject) ⇒ <code>object</code>

<a name="new_DeviceCommand_new"></a>

### new DeviceCommand(options)
DeviceCommand model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | ({ id, command, timestamp, lastUpdated, userId, deviceId, networkId, deviceTypeId, parameters, lifetime, status, result }) |

<a name="DeviceCommand+id"></a>

### deviceCommand.id ⇒ <code>number</code>
**Returns**: <code>number</code> - id;  
<a name="DeviceCommand+id"></a>

### deviceCommand.id ⇒ <code>number</code>
**Returns**: <code>number</code> - id;  

| Param | Type |
| --- | --- |
| value; | <code>number</code> | 

<a name="DeviceCommand+name"></a>

### deviceCommand.name ⇒ <code>string</code>
**Returns**: <code>string</code> - name;  
<a name="DeviceCommand+name"></a>

### deviceCommand.name ⇒ <code>string</code>
**Returns**: <code>string</code> - name;  

| Param | Type |
| --- | --- |
| value; | <code>string</code> | 

<a name="DeviceCommand+notification"></a>

### deviceCommand.notification ⇒ <code>string</code>
**Returns**: <code>string</code> - notification;  
<a name="DeviceCommand+notification"></a>

### deviceCommand.notification ⇒ <code>string</code>
**Returns**: <code>string</code> - notification;  

| Param | Type |
| --- | --- |
| value; | <code>string</code> | 

<a name="DeviceCommand+timestamp"></a>

### deviceCommand.timestamp ⇒ <code>string</code>
**Returns**: <code>string</code> - timestamp;  
<a name="DeviceCommand+timestamp"></a>

### deviceCommand.timestamp ⇒ <code>string</code>
**Returns**: <code>string</code> - timestamp;  

| Param | Type |
| --- | --- |
| value; | <code>string</code> | 

<a name="DeviceCommand+lastUpdated"></a>

### deviceCommand.lastUpdated ⇒ <code>string</code>
**Returns**: <code>string</code> - lastUpdated;  
<a name="DeviceCommand+lastUpdated"></a>

### deviceCommand.lastUpdated ⇒ <code>string</code>
**Returns**: <code>string</code> - lastUpdated;  

| Param | Type |
| --- | --- |
| value; | <code>string</code> | 

<a name="DeviceCommand+userId"></a>

### deviceCommand.userId ⇒ <code>number</code>
**Returns**: <code>number</code> - userId;  
<a name="DeviceCommand+userId"></a>

### deviceCommand.userId ⇒ <code>number</code>
**Returns**: <code>number</code> - userId;  

| Param | Type |
| --- | --- |
| value; | <code>number</code> | 

<a name="DeviceCommand+deviceId"></a>

### deviceCommand.deviceId ⇒ <code>number</code>
**Returns**: <code>number</code> - deviceId;  
<a name="DeviceCommand+deviceId"></a>

### deviceCommand.deviceId ⇒ <code>number</code>
**Returns**: <code>number</code> - deviceId;  

| Param | Type |
| --- | --- |
| value; | <code>number</code> | 

<a name="DeviceCommand+networkId"></a>

### deviceCommand.networkId ⇒ <code>number</code>
**Returns**: <code>number</code> - networkId;  
<a name="DeviceCommand+networkId"></a>

### deviceCommand.networkId ⇒ <code>number</code>
**Returns**: <code>number</code> - networkId;  

| Param | Type |
| --- | --- |
| value; | <code>number</code> | 

<a name="DeviceCommand+deviceTypeId"></a>

### deviceCommand.deviceTypeId ⇒ <code>number</code>
**Returns**: <code>number</code> - deviceTypeId;  
<a name="DeviceCommand+deviceTypeId"></a>

### deviceCommand.deviceTypeId ⇒ <code>number</code>
**Returns**: <code>number</code> - deviceTypeId;  

| Param | Type |
| --- | --- |
| value; | <code>number</code> | 

<a name="DeviceCommand+parameters"></a>

### deviceCommand.parameters ⇒ <code>object</code>
**Returns**: <code>object</code> - parameters;  
<a name="DeviceCommand+parameters"></a>

### deviceCommand.parameters ⇒ <code>object</code>
**Returns**: <code>object</code> - parameters;  

| Param | Type |
| --- | --- |
| value; | <code>object</code> | 

<a name="DeviceCommand+lifetime"></a>

### deviceCommand.lifetime ⇒ <code>number</code>
**Returns**: <code>number</code> - lifetime;  
<a name="DeviceCommand+lifetime"></a>

### deviceCommand.lifetime ⇒ <code>number</code>
**Returns**: <code>number</code> - lifetime;  

| Param | Type |
| --- | --- |
| value; | <code>number</code> | 

<a name="DeviceCommand+status"></a>

### deviceCommand.status ⇒ <code>string</code>
**Returns**: <code>string</code> - status;  
<a name="DeviceCommand+status"></a>

### deviceCommand.status ⇒ <code>string</code>
**Returns**: <code>string</code> - status;  

| Param | Type |
| --- | --- |
| value; | <code>string</code> | 

<a name="DeviceCommand+result"></a>

### deviceCommand.result ⇒ <code>string</code>
**Returns**: <code>string</code> - status;  
<a name="DeviceCommand+result"></a>

### deviceCommand.result ⇒ <code>string</code>
**Returns**: <code>string</code> - status;  

| Param | Type |
| --- | --- |
| value; | <code>string</code> | 

<a name="DeviceCommand+toObject"></a>

### deviceCommand.toObject() ⇒ <code>object</code>
Returns a copy of instance

**Returns**: <code>object</code> - A copy of instance  
<a name="DeviceCommand+toString"></a>

### deviceCommand.toString() ⇒ <code>object</code>
Returns a stringified instance

**Returns**: <code>object</code> - A stringified instance  
<a name="Configuration"></a>

## Configuration
Configuration model


* [Configuration](#Configuration)
    * [new Configuration(options)](#new_Configuration_new)
    * [.name](#Configuration+name) ⇒ <code>string</code>
    * [.value](#Configuration+value) ⇒ <code>string</code>
    * [.entityVersion](#Configuration+entityVersion) ⇒ <code>number</code>
    * [.toObject()](#Configuration+toObject) ⇒ <code>object</code>
    * [.toString()](#Configuration+toString) ⇒ <code>string</code>

<a name="new_Configuration_new"></a>

### new Configuration(options)
Creates Configuration model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | ({ name, value, entityVersion }) |

<a name="Configuration+name"></a>

### configuration.name ⇒ <code>string</code>
**Returns**: <code>string</code> - name;  
<a name="Configuration+name"></a>

### configuration.name ⇒ <code>string</code>
**Returns**: <code>string</code> - name;  

| Param | Type |
| --- | --- |
| value; | <code>string</code> | 

<a name="Configuration+value"></a>

### configuration.value ⇒ <code>string</code>
**Returns**: <code>string</code> - description;  
<a name="Configuration+value"></a>

### configuration.value ⇒ <code>string</code>
**Returns**: <code>string</code> - value;  

| Param | Type |
| --- | --- |
| value; | <code>string</code> | 

<a name="Configuration+entityVersion"></a>

### configuration.entityVersion ⇒ <code>number</code>
**Returns**: <code>number</code> - entityVersion;  
<a name="Configuration+entityVersion"></a>

### configuration.entityVersion ⇒ <code>number</code>
**Returns**: <code>number</code> - entityVersion;  

| Param | Type |
| --- | --- |
| value; | <code>number</code> | 

<a name="Configuration+toObject"></a>

### configuration.toObject() ⇒ <code>object</code>
Returns a copy of instance

**Returns**: <code>object</code> - A copy of instance  
<a name="Configuration+toString"></a>

### configuration.toString() ⇒ <code>object</code>
Returns a stringified instance

**Returns**: <code>object</code> - A stringified instance  
<a name="Device"></a>

## Device
Device model


* [Device](#Device)
    * [new Device(options)](#new_Device_new)
    * [.id](#Device+id) ⇒ <code>string</code>
    * [.name](#Device+name) ⇒ <code>string</code>
    * [.data](#Device+data) ⇒ <code>object</code>
    * [.networkId](#Device+networkId) ⇒ <code>string</code>
    * [.deviceTypeId](#Device+deviceTypeId) ⇒ <code>string</code>
    * [.blocked](#Device+blocked) ⇒ <code>boolean</code>
    * [.toObject()](#Device+toObject) ⇒ <code>object</code>
    * [.toString()](#Device+toString) ⇒ <code>string</code>

<a name="new_Device_new"></a>

### new Device(options)
Creates Device model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | ({ id, name, data, networkId, deviceTypeId, blocked }) |

<a name="Device+id"></a>

### device.id ⇒ <code>string</code>
**Returns**: <code>string</code> - id;  
<a name="Device+id"></a>

### device.id ⇒ <code>string</code>
**Returns**: <code>string</code> - id;  

| Param | Type |
| --- | --- |
| value; | <code>string</code> | 

<a name="Device+name"></a>

### device.name ⇒ <code>string</code>
**Returns**: <code>string</code> - name;  
<a name="Device+name"></a>

### device.name ⇒ <code>string</code>
**Returns**: <code>string</code> - name;  

| Param | Type |
| --- | --- |
| value; | <code>string</code> | 

<a name="Device+data"></a>

### device.data ⇒ <code>object</code>
**Returns**: <code>object</code> - data;  
<a name="Device+data"></a>

### device.data ⇒ <code>object</code>
**Returns**: <code>object</code> - data;  

| Param | Type |
| --- | --- |
| value; | <code>object</code> | 

<a name="Device+networkId"></a>

### device.networkId ⇒ <code>string</code>
**Returns**: <code>string</code> - networkId;  
<a name="Device+networkId"></a>

### device.networkId ⇒ <code>string</code>
**Returns**: <code>string</code> - networkId;  

| Param | Type |
| --- | --- |
| value; | <code>string</code> | 

<a name="Device+deviceTypeId"></a>

### device.deviceTypeId ⇒ <code>string</code>
**Returns**: <code>string</code> - deviceTypeId;  
<a name="Device+deviceTypeId"></a>

### device.deviceTypeId ⇒ <code>string</code>
**Returns**: <code>string</code> - deviceTypeId;  

| Param | Type |
| --- | --- |
| value; | <code>string</code> | 

<a name="Device+blocked"></a>

### device.blocked ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - blocked;  
<a name="Device+blocked"></a>

### device.blocked ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - blocked;  

| Param | Type |
| --- | --- |
| value; | <code>boolean</code> | 

<a name="Device+toObject"></a>

### device.toObject() ⇒ <code>object</code>
Returns a copy of instance

**Returns**: <code>object</code> - A copy of instance  
<a name="Device+toString"></a>

### device.toString() ⇒ <code>object</code>
Returns a stringified instance

**Returns**: <code>object</code> - A stringified instance  
<a name="DeviceType"></a>

## DeviceType
DeviceType model


* [DeviceType](#DeviceType)
    * [new DeviceType(options)](#new_DeviceType_new)
    * [.id](#DeviceType+id) ⇒ <code>number</code>
    * [.name](#DeviceType+name) ⇒ <code>string</code>
    * [.description](#DeviceType+description) ⇒ <code>string</code>
    * [.toObject()](#DeviceType+toObject) ⇒ <code>object</code>
    * [.toString()](#DeviceType+toString) ⇒ <code>string</code>

<a name="new_DeviceType_new"></a>

### new DeviceType(options)
Creates DeviceType model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | ({ id, name, description }) |

<a name="DeviceType+id"></a>

### deviceType.id ⇒ <code>number</code>
**Returns**: <code>number</code> - id;  
<a name="DeviceType+id"></a>

### deviceType.id ⇒ <code>number</code>
**Returns**: <code>number</code> - id;  

| Param | Type |
| --- | --- |
| value; | <code>number</code> | 

<a name="DeviceType+name"></a>

### deviceType.name ⇒ <code>string</code>
**Returns**: <code>string</code> - name;  
<a name="DeviceType+name"></a>

### deviceType.name ⇒ <code>string</code>
**Returns**: <code>string</code> - name;  

| Param | Type |
| --- | --- |
| value; | <code>string</code> | 

<a name="DeviceType+description"></a>

### deviceType.description ⇒ <code>string</code>
**Returns**: <code>string</code> - description;  
<a name="DeviceType+description"></a>

### deviceType.description ⇒ <code>string</code>
**Returns**: <code>string</code> - description;  

| Param | Type |
| --- | --- |
| value; | <code>string</code> | 

<a name="DeviceType+toObject"></a>

### deviceType.toObject() ⇒ <code>object</code>
Returns a copy of instance

**Returns**: <code>object</code> - A copy of instance  
<a name="DeviceType+toString"></a>

### deviceType.toString() ⇒ <code>object</code>
Returns a stringified instance

**Returns**: <code>object</code> - A stringified instance  
<a name="Network"></a>

## Network
Network model


* [Network](#Network)
    * [new Network(options)](#new_Network_new)
    * [.id](#Network+id) ⇒ <code>number</code>
    * [.name](#Network+name) ⇒ <code>string</code>
    * [.description](#Network+description) ⇒ <code>string</code>
    * [.toObject()](#Network+toObject) ⇒ <code>object</code>
    * [.toString()](#Network+toString) ⇒ <code>string</code>

<a name="new_Network_new"></a>

### new Network(options)
Creates Network model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | ({ id, name, description }) |

<a name="Network+id"></a>

### network.id ⇒ <code>number</code>
**Returns**: <code>number</code> - id;  
<a name="Network+id"></a>

### network.id ⇒ <code>number</code>
**Returns**: <code>number</code> - id;  

| Param | Type |
| --- | --- |
| value; | <code>number</code> | 

<a name="Network+name"></a>

### network.name ⇒ <code>string</code>
**Returns**: <code>string</code> - name;  
<a name="Network+name"></a>

### network.name ⇒ <code>string</code>
**Returns**: <code>string</code> - name;  

| Param | Type |
| --- | --- |
| value; | <code>string</code> | 

<a name="Network+description"></a>

### network.description ⇒ <code>string</code>
**Returns**: <code>string</code> - description;  
<a name="Network+description"></a>

### network.description ⇒ <code>string</code>
**Returns**: <code>string</code> - description;  

| Param | Type |
| --- | --- |
| value; | <code>string</code> | 

<a name="Network+toObject"></a>

### network.toObject() ⇒ <code>object</code>
Returns a copy of instance

**Returns**: <code>object</code> - A copy of instance  
<a name="Network+toString"></a>

### network.toString() ⇒ <code>object</code>
Returns a stringified instance

**Returns**: <code>object</code> - A stringified instance  
<a name="DeviceNotification"></a>

## DeviceNotification
DeviceNotification model


* [DeviceNotification](#DeviceNotification)
    * [new DeviceNotification(options)](#new_DeviceNotification_new)
    * [.id](#DeviceNotification+id) ⇒ <code>number</code>
    * [.name](#DeviceNotification+name) ⇒ <code>string</code>
    * [.notification](#DeviceNotification+notification) ⇒ <code>string</code>
    * [.timestamp](#DeviceNotification+timestamp) ⇒ <code>string</code>
    * [.parameters](#DeviceNotification+parameters) ⇒ <code>object</code>
    * [.toObject()](#DeviceNotification+toObject) ⇒ <code>object</code>
    * [.toString()](#DeviceNotification+toString) ⇒ <code>string</code>

<a name="new_DeviceNotification_new"></a>

### new DeviceNotification(options)
Creates DeviceNotification model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | ({ id, notification, timestamp, parameters }) |

<a name="DeviceNotification+id"></a>

### deviceNotification.id ⇒ <code>number</code>
**Returns**: <code>number</code> - id;  
<a name="DeviceNotification+id"></a>

### deviceNotification.id ⇒ <code>number</code>
**Returns**: <code>number</code> - id;  

| Param | Type |
| --- | --- |
| value; | <code>number</code> | 

<a name="DeviceNotification+name"></a>

### deviceNotification.name ⇒ <code>string</code>
**Returns**: <code>string</code> - name;  
<a name="DeviceNotification+name"></a>

### deviceNotification.name ⇒ <code>string</code>
**Returns**: <code>string</code> - name;  

| Param | Type |
| --- | --- |
| value; | <code>string</code> | 

<a name="DeviceNotification+notification"></a>

### deviceNotification.notification ⇒ <code>string</code>
**Returns**: <code>string</code> - notification;  
<a name="DeviceNotification+notification"></a>

### deviceNotification.notification ⇒ <code>string</code>
**Returns**: <code>string</code> - notification;  

| Param | Type |
| --- | --- |
| value; | <code>string</code> | 

<a name="DeviceNotification+timestamp"></a>

### deviceNotification.timestamp ⇒ <code>string</code>
**Returns**: <code>string</code> - timestamp;  
<a name="DeviceNotification+timestamp"></a>

### deviceNotification.timestamp ⇒ <code>string</code>
**Returns**: <code>string</code> - timestamp;  

| Param | Type |
| --- | --- |
| value; | <code>string</code> | 

<a name="DeviceNotification+parameters"></a>

### deviceNotification.parameters ⇒ <code>object</code>
**Returns**: <code>object</code> - parameters;  
<a name="DeviceNotification+parameters"></a>

### deviceNotification.parameters ⇒ <code>object</code>
**Returns**: <code>object</code> - parameters;  

| Param | Type |
| --- | --- |
| value; | <code>object</code> | 

<a name="DeviceNotification+toObject"></a>

### deviceNotification.toObject() ⇒ <code>object</code>
Returns a copy of instance

**Returns**: <code>object</code> - A copy of instance  
<a name="DeviceNotification+toString"></a>

### deviceNotification.toString() ⇒ <code>object</code>
Returns a stringified instance

**Returns**: <code>object</code> - A stringified instance  
<a name="Plugin"></a>

## Plugin
Plugin model


* [Plugin](#Plugin)
    * [new Plugin(options)](#new_Plugin_new)
    * [.id](#Plugin+id) ⇒ <code>number</code>
    * [.name](#Plugin+name) ⇒ <code>string</code>
    * [.description](#Plugin+description) ⇒ <code>string</code>
    * [.topicName](#Plugin+topicName) ⇒ <code>string</code>
    * [.filter](#Plugin+filter) ⇒ <code>string</code>
    * [.status](#Plugin+status) ⇒ <code>string</code>
    * [.subscriptionId](#Plugin+subscriptionId) ⇒ <code>number</code>
    * [.userId](#Plugin+userId) ⇒ <code>number</code>
    * [.parameters](#Plugin+parameters) ⇒ <code>object</code>
    * [.toObject()](#Plugin+toObject) ⇒ <code>object</code>
    * [.toString()](#Plugin+toString) ⇒ <code>string</code>

<a name="new_Plugin_new"></a>

### new Plugin(options)
Creates Plugin model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | ({ id, name, description }) |

<a name="Plugin+id"></a>

### plugin.id ⇒ <code>number</code>
**Returns**: <code>number</code> - id;  
<a name="Plugin+id"></a>

### plugin.id ⇒ <code>number</code>
**Returns**: <code>number</code> - id;  

| Param | Type |
| --- | --- |
| value; | <code>number</code> | 

<a name="Plugin+name"></a>

### plugin.name ⇒ <code>string</code>
**Returns**: <code>string</code> - name;  
<a name="Plugin+name"></a>

### plugin.name ⇒ <code>string</code>
**Returns**: <code>string</code> - name;  

| Param | Type |
| --- | --- |
| value; | <code>string</code> | 

<a name="Plugin+description"></a>

### plugin.description ⇒ <code>string</code>
**Returns**: <code>string</code> - description;  
<a name="Plugin+description"></a>

### plugin.description ⇒ <code>string</code>
**Returns**: <code>string</code> - description;  

| Param | Type |
| --- | --- |
| value; | <code>string</code> | 

<a name="Plugin+topicName"></a>

### plugin.topicName ⇒ <code>string</code>
**Returns**: <code>string</code> - topicName;  
<a name="Plugin+topicName"></a>

### plugin.topicName ⇒ <code>string</code>
**Returns**: <code>string</code> - topicName;  

| Param | Type |
| --- | --- |
| value; | <code>string</code> | 

<a name="Plugin+filter"></a>

### plugin.filter ⇒ <code>string</code>
**Returns**: <code>string</code> - filter;  
<a name="Plugin+filter"></a>

### plugin.filter ⇒ <code>string</code>
**Returns**: <code>string</code> - filter;  

| Param | Type |
| --- | --- |
| value; | <code>string</code> | 

<a name="Plugin+status"></a>

### plugin.status ⇒ <code>string</code>
**Returns**: <code>string</code> - status;  
<a name="Plugin+status"></a>

### plugin.status ⇒ <code>string</code>
**Returns**: <code>string</code> - status;  

| Param | Type |
| --- | --- |
| value; | <code>string</code> | 

<a name="Plugin+subscriptionId"></a>

### plugin.subscriptionId ⇒ <code>number</code>
**Returns**: <code>number</code> - subscriptionId;  
<a name="Plugin+subscriptionId"></a>

### plugin.subscriptionId ⇒ <code>number</code>
**Returns**: <code>number</code> - subscriptionId;  

| Param | Type |
| --- | --- |
| value; | <code>number</code> | 

<a name="Plugin+userId"></a>

### plugin.userId ⇒ <code>number</code>
**Returns**: <code>number</code> - userId;  
<a name="Plugin+userId"></a>

### plugin.userId ⇒ <code>number</code>
**Returns**: <code>number</code> - userId;  

| Param | Type |
| --- | --- |
| value; | <code>number</code> | 

<a name="Plugin+parameters"></a>

### plugin.parameters ⇒ <code>object</code>
**Returns**: <code>object</code> - parameters;  
<a name="Plugin+parameters"></a>

### plugin.parameters ⇒ <code>object</code>
**Returns**: <code>object</code> - parameters;  

| Param | Type |
| --- | --- |
| value; | <code>object</code> | 

<a name="Plugin+toObject"></a>

### plugin.toObject() ⇒ <code>object</code>
Returns a copy of instance

**Returns**: <code>object</code> - A copy of instance  
<a name="Plugin+toString"></a>

### plugin.toString() ⇒ <code>object</code>
Returns a stringified instance

**Returns**: <code>object</code> - A stringified instance  
<a name="Token"></a>


<a name="UserToken"></a>

## UserToken
UserToken model


* [UserToken](#UserToken)
    * [new UserToken(options)](#new_UserToken_new)
    * [.userId](#UserToken+userId) ⇒ <code>string</code>
    * [.actions](#UserToken+actions) ⇒ <code>string</code>
    * [.networkIds](#UserToken+networkIds) ⇒ <code>string</code>
    * [.deviceTypeIds](#UserToken+deviceTypeIds) ⇒ <code>string</code>
    * [.expiration](#UserToken+expiration) ⇒ <code>string</code>
    * [.toObject()](#UserToken+toObject) ⇒ <code>object</code>
    * [.toString()](#UserToken+toString) ⇒ <code>string</code>

<a name="new_UserToken_new"></a>

### new UserToken(options)
Creates UserToken model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | ({ userId, actions, networkIds, deviceTypeIds, expiration }) |

<a name="UserToken+userId"></a>

### userToken.userId ⇒ <code>string</code>
**Returns**: <code>string</code> - userId;
<a name="UserToken+userId"></a>

### userToken.userId ⇒ <code>string</code>
**Returns**: <code>string</code> - userId;

| Param | Type |
| --- | --- |
| value; | <code>string</code> |

<a name="UserToken+actions"></a>

### userToken.actions ⇒ <code>string</code>
**Returns**: <code>string</code> - actions;
<a name="UserToken+actions"></a>

### userToken.actions ⇒ <code>string</code>
**Returns**: <code>string</code> - actions;

| Param | Type |
| --- | --- |
| value; | <code>string</code> |

<a name="UserToken+networkIds"></a>

### userToken.networkIds ⇒ <code>string</code>
**Returns**: <code>string</code> - networkIds;
<a name="UserToken+networkIds"></a>

### userToken.networkIds ⇒ <code>string</code>
**Returns**: <code>string</code> - networkIds;

| Param | Type |
| --- | --- |
| value; | <code>string</code> |

<a name="UserToken+deviceTypeIds"></a>

### userToken.deviceTypeIds ⇒ <code>string</code>
**Returns**: <code>string</code> - deviceTypeIds;
<a name="UserToken+deviceTypeIds"></a>

### userToken.deviceTypeIds ⇒ <code>string</code>
**Returns**: <code>string</code> - deviceTypeIds;

| Param | Type |
| --- | --- |
| value; | <code>string</code> |

<a name="UserToken+expiration"></a>

### userToken.expiration ⇒ <code>string</code>
**Returns**: <code>string</code> - expiration;
<a name="UserToken+expiration"></a>

### userToken.expiration ⇒ <code>string</code>
**Returns**: <code>string</code> - expiration;

| Param | Type |
| --- | --- |
| value; | <code>string</code> |

<a name="UserToken+toObject"></a>

### userToken.toObject() ⇒ <code>object</code>
Returns a copy of instance

**Returns**: <code>object</code> - A copy of instance
<a name="UserToken+toString"></a>

### userToken.toString() ⇒ <code>string</code>
Returns a stringified instance

**Returns**: <code>string</code> - A stringified instance

<a name="PluginToken"></a>

## PluginToken
PluginToken model


* [PluginToken](#PluginToken)
    * [new PluginToken(options)](#new_PluginToken_new)
    * [.actions](#PluginToken+actions) ⇒ <code>string</code>
    * [.expiration](#PluginToken+expiration) ⇒ <code>string</code>
    * [.type](#PluginToken+type) ⇒ <code>string</code>
    * [.topicName](#PluginToken+topicName) ⇒ <code>string</code>
    * [.toObject()](#PluginToken+toObject) ⇒ <code>object</code>
    * [.toString()](#PluginToken+toString) ⇒ <code>string</code>

<a name="new_PluginToken_new"></a>

### new PluginToken(options)
Creates PluginToken model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options for instance |
| options.actions | <code>Array</code> | Actions |
| options.expiration | <code>string</code> | Expiration date (UTC) |
| options.type | <code>number</code> | Token type (0 - REFRESH, 1 - ACCESS) |
| options.topicName | <code>string</code> | Permitted topic name |

<a name="PluginToken+actions"></a>

### pluginToken.actions ⇒ <code>string</code>
**Returns**: <code>string</code> - actions;
<a name="PluginToken+actions"></a>

### pluginToken.actions ⇒ <code>string</code>
**Returns**: <code>string</code> - actions;

| Param | Type |
| --- | --- |
| value; | <code>string</code> |

<a name="PluginToken+expiration"></a>

### pluginToken.expiration ⇒ <code>string</code>
**Returns**: <code>string</code> - expiration;
<a name="PluginToken+expiration"></a>

### pluginToken.expiration ⇒ <code>string</code>
**Returns**: <code>string</code> - expiration;

| Param | Type |
| --- | --- |
| value; | <code>string</code> |

<a name="PluginToken+type"></a>

### pluginToken.type ⇒ <code>string</code>
**Returns**: <code>string</code> - type;
<a name="PluginToken+type"></a>

### pluginToken.type ⇒ <code>string</code>
**Returns**: <code>string</code> - type;

| Param | Type |
| --- | --- |
| value; | <code>string</code> |

<a name="PluginToken+topicName"></a>

### pluginToken.topicName ⇒ <code>string</code>
**Returns**: <code>string</code> - topicName;
<a name="PluginToken+topicName"></a>

### pluginToken.topicName ⇒ <code>string</code>
**Returns**: <code>string</code> - topicName;

| Param | Type |
| --- | --- |
| value; | <code>string</code> |

<a name="PluginToken+toObject"></a>

### pluginToken.toObject() ⇒ <code>object</code>
Returns a copy of instance

**Returns**: <code>object</code> - A copy of instance
<a name="PluginToken+toString"></a>

### pluginToken.toString() ⇒ <code>string</code>
Returns a stringified instance

**Returns**: <code>string</code> - A stringified instance

## User
User model


* [User](#User)
    * [new User(options)](#new_User_new)
    * [.id](#User+id) ⇒ <code>number</code>
    * [.name](#User+name) ⇒ <code>string</code>
    * [.login](#User+login) ⇒ <code>string</code>
    * [.role](#User+role) ⇒ <code>numner</code>
    * [.status](#User+status) ⇒ <code>numner</code>
    * [.lastLogin](#User+lastLogin) ⇒ <code>string</code>
    * [.data](#User+data) ⇒ <code>object</code>
    * [.password](#User+password) ⇒ <code>string</code>
    * [.introReviewed](#User+introReviewed) ⇒ <code>boolean</code>
    * [.allDeviceTypesAvailable](#User+allDeviceTypesAvailable) ⇒ <code>boolean</code>
    * [.toObject()](#User+toObject) ⇒ <code>object</code>
    * [.toString()](#User+toString) ⇒ <code>string</code>

<a name="new_User_new"></a>

### new User(options)
Creates User model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | ({ id, login, role, status, lastLogin, data, password, introReviewed, allDeviceTypesAvailable }) |

<a name="User+id"></a>

### user.id ⇒ <code>number</code>
**Returns**: <code>number</code> - id;  
<a name="User+id"></a>

### user.id ⇒ <code>number</code>
**Returns**: <code>number</code> - id;  

| Param | Type |
| --- | --- |
| value; | <code>number</code> | 

<a name="User+name"></a>

### user.name ⇒ <code>string</code>
**Returns**: <code>string</code> - name;  
<a name="User+name"></a>

### user.name ⇒ <code>string</code>
**Returns**: <code>string</code> - name;  

| Param | Type |
| --- | --- |
| value; | <code>string</code> | 

<a name="User+login"></a>

### user.login ⇒ <code>string</code>
**Returns**: <code>string</code> - login;  
<a name="User+login"></a>

### user.login ⇒ <code>string</code>
**Returns**: <code>string</code> - login;  

| Param | Type |
| --- | --- |
| value; | <code>string</code> | 

<a name="User+role"></a>

### user.role ⇒ <code>numner</code>
**Returns**: <code>numner</code> - role;  
<a name="User+role"></a>

### user.role ⇒ <code>numner</code>
**Returns**: <code>numner</code> - role;  

| Param | Type |
| --- | --- |
| value; | <code>numner</code> | 

<a name="User+status"></a>

### user.status ⇒ <code>numner</code>
**Returns**: <code>numner</code> - status;  
<a name="User+status"></a>

### user.status ⇒ <code>numner</code>
**Returns**: <code>numner</code> - status;  

| Param | Type |
| --- | --- |
| value; | <code>numner</code> | 

<a name="User+lastLogin"></a>

### user.lastLogin ⇒ <code>string</code>
**Returns**: <code>string</code> - lastLogin;  
<a name="User+lastLogin"></a>

### user.lastLogin ⇒ <code>string</code>
**Returns**: <code>string</code> - lastLogin;  

| Param | Type |
| --- | --- |
| value; | <code>string</code> | 

<a name="User+data"></a>

### user.data ⇒ <code>object</code>
**Returns**: <code>object</code> - data;  
<a name="User+data"></a>

### user.data ⇒ <code>object</code>
**Returns**: <code>object</code> - data;  

| Param | Type |
| --- | --- |
| value; | <code>object</code> | 

<a name="User+password"></a>

### user.password ⇒ <code>string</code>
**Returns**: <code>string</code> - password;  
<a name="User+password"></a>

### user.password ⇒ <code>string</code>
**Returns**: <code>string</code> - password;  

| Param | Type |
| --- | --- |
| value; | <code>string</code> | 

<a name="User+introReviewed"></a>

### user.introReviewed ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - introReviewed;  
<a name="User+introReviewed"></a>

### user.introReviewed ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - introReviewed;  

| Param | Type |
| --- | --- |
| value; | <code>boolean</code> | 

<a name="User+allDeviceTypesAvailable"></a>

### user.allDeviceTypesAvailable ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - introReviewed;  
<a name="User+allDeviceTypesAvailable"></a>

### user.allDeviceTypesAvailable ⇒ <code>boolean</code>
**Returns**: <code>boolean</code> - allDeviceTypesAvailable;  

| Param | Type |
| --- | --- |
| value; | <code>boolean</code> | 

<a name="User+toObject"></a>

### user.toObject() ⇒ <code>object</code>
Returns a copy of instance

**Returns**: <code>object</code> - A copy of instance  
<a name="User+toString"></a>

### user.toString() ⇒ <code>object</code>
Returns a stringified instance

**Returns**: <code>object</code> - A stringified instance  




## License

[DeviceHive] is developed by [DataArt] Apps and distributed under Open Source
[Apache 2.0 license](https://en.wikipedia.org/wiki/Apache_License). 

© Copyright 2018 [DataArt] Apps © All Rights Reservedstrong text