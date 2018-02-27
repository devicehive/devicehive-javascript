
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
| [options.password] | <code>string</code> | Password |
| options.mainServiceURL | <code>string</code> | Main Service URL |
| [options.authServiceURL] | <code>string</code> | Auth Service URL (required only for http) |
| [options.pluginServiceURL] | <code>string</code> | Plugin Service URL (required only for http) |
| [options.autoUpdateSession] | <code>boolean</code> | Flag to enable/disable autoupdating session. Default: true |

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


* [TokenAPI](#TokenAPI)
    * [.login(login, password)](#TokenAPI+login)
    * [.authPlugin(token)](#TokenAPI+authPlugin)
    * [.createUserToken(userToken)](#TokenAPI+createUserToken)
    * [.createPluginToken(pluginToken)](#TokenAPI+createPluginToken)
    * [.refresh(refreshToken)](#TokenAPI+refresh)

<a name="TokenAPI+login"></a>

### tokenAPI.login(login, password)
Creates TokenAPI


| Param | Type |
| --- | --- |
| login | <code>string</code> |
| password | <code>string</code> |

<a name="TokenAPI+authPlugin"></a>

### tokenAPI.authPlugin(token)
Create user token


| Param | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | Plugin token |

<a name="TokenAPI+createUserToken"></a>

### tokenAPI.createUserToken(userToken)
Create user token


| Param | Type |
| --- | --- |
| userToken | <code>UserToken</code> |

<a name="TokenAPI+createPluginToken"></a>

### tokenAPI.createPluginToken(pluginToken)
Create plugin token


| Param | Type |
| --- | --- |
| pluginToken | <code>PluginToken</code> |

<a name="TokenAPI+refresh"></a>

### tokenAPI.refresh(refreshToken)
Refresg token


| Param | Type |
| --- | --- |
| refreshToken | <code>string</code> |

<a name="UserAPI"></a>

## UserAPI

<dl>
<dt><a href="#ConfigurationAPI">ConfigurationAPI</a></dt>
<dd><p>Returns information about the current configuration</p>
</dd>
<dt><a href="#DeviceAPI">DeviceAPI</a></dt>
<dd><p>Returns information about the current device</p>
</dd>
<dt><a href="#DeviceCommandAPI">DeviceCommandAPI</a></dt>
<dd><p>Returns information about the current command</p>
</dd>
<dt><a href="#DeviceNotificationAPI">DeviceNotificationAPI</a></dt>
<dd><p>Returns information about the current notification</p>
</dd>
<dt><a href="#DeviceTypeAPI">DeviceTypeAPI</a></dt>
<dd><p>Returns information about the current deviceType</p>
</dd>
<dt><a href="#NetworkAPI">NetworkAPI</a></dt>
<dd><p>Returns information about the current network</p>
</dd>
<dt><a href="#PluginAPI">PluginAPI</a></dt>
<dd><p>Returns information about the current plugin</p>
</dd>
<dt><a href="#InfoAPI">InfoAPI</a></dt>
<dd><p>Get server info</p>
</dd>
<dt><a href="#TokenAPI">TokenAPI</a></dt>
<dd><p>Authenticate using login and password</p>
</dd>
<dt><a href="#UserAPI">UserAPI</a></dt>
<dd><p>Return a list of users</p>
</dd>
</dl>


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

**Returns**: <code>Promise</code> - selected configuration  

| Param | Type |
| --- | --- |
| name | <code>number</code> | 

<a name="ConfigurationAPI+put"></a>

### configurationAPI.put(configuration) ⇒ <code>Promise</code>
Updates a configuration

**Returns**: <code>Promise</code> - count of configuration  

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

**Returns**: <code>Promise</code> - selected device  

| Param | Type |
| --- | --- |
| deviceId | <code>string</code> | 

<a name="DeviceAPI+list"></a>

### deviceAPI.list(deviceListQuery) ⇒ <code>Promise</code>
Return a list of devices

**Returns**: <code>Promise</code> - list of devices  

| Param | Type |
| --- | --- |
| deviceListQuery | <code>DeviceListQuery</code> | 

<a name="DeviceAPI+count"></a>

### deviceAPI.count(deviceCountQuery) ⇒ <code>Promise</code>
Returns count of devices

**Returns**: <code>Promise</code> - count of devices  

| Param | Type |
| --- | --- |
| deviceCountQuery | <code>DeviceCountQuery</code> | 

<a name="DeviceAPI+add"></a>

### deviceAPI.add(device) ⇒ <code>Promise</code>
Registers or updates a device

**Returns**: <code>Promise</code> - count of devices  

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

**Returns**: <code>Promise</code> - selected command  

| Param | Type | Description |
| --- | --- | --- |
| deviceId | <code>number</code> | Device ID |
| commandId | <code>number</code> | Command ID |

<a name="DeviceCommandAPI+list"></a>

### deviceCommandAPI.list(commandListQuery) ⇒ <code>Promise</code>
Return a list of commands

**Returns**: <code>Promise</code> - list of commands  

| Param | Type |
| --- | --- |
| commandListQuery | <code>CommandListQuery</code> | 

<a name="DeviceCommandAPI+insert"></a>

### deviceCommandAPI.insert(deviceId, command) ⇒ <code>Promise</code>
Registers a command

**Returns**: <code>Promise</code> - count of commands  

| Param | Type | Description |
| --- | --- | --- |
| deviceId | <code>number</code> | Device ID |
| command | <code>Command</code> |  |

<a name="DeviceCommandAPI+update"></a>

### deviceCommandAPI.update(command) ⇒ <code>Promise</code>
Updates a command

**Returns**: <code>Promise</code> - count of commands  

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
    * [.insert(deviceId, notification)](#DeviceNotificationAPI+insert) ⇒ <code>Promise</code>
    * [.poll(notificationPollQuery)](#DeviceNotificationAPI+poll) ⇒ <code>\*</code>
    * [.pollMany(notificationPollManyQuery)](#DeviceNotificationAPI+pollMany) ⇒ <code>\*</code>
    * [.subscribe(notificationPollQuery)](#DeviceNotificationAPI+subscribe) ⇒ <code>Promise</code>
    * [.unsubscribe(subscriptionId)](#DeviceNotificationAPI+unsubscribe) ⇒ <code>Promise</code>

<a name="DeviceNotificationAPI+get"></a>

### deviceNotificationAPI.get(deviceId, notificationId) ⇒ <code>Promise</code>
Creates DeviceNotificationAPI

**Returns**: <code>Promise</code> - selected notification  

| Param | Type | Description |
| --- | --- | --- |
| deviceId | <code>number</code> | Device ID |
| notificationId | <code>number</code> | Notification ID |

<a name="DeviceNotificationAPI+list"></a>

### deviceNotificationAPI.list(notificationListQuery) ⇒ <code>Promise</code>
Return a list of notifications

**Returns**: <code>Promise</code> - list of notifications  

| Param | Type |
| --- | --- |
| notificationListQuery | <code>NotificationListQuery</code> | 

<a name="DeviceNotificationAPI+insert"></a>

### deviceNotificationAPI.insert(deviceId, notification) ⇒ <code>Promise</code>
Registers a notification

**Returns**: <code>Promise</code> - count of notifications  

| Param | Type |
| --- | --- |
| deviceId | <code>Number</code> | 
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

**Returns**: <code>Promise</code> - selected deviceType  

| Param | Type |
| --- | --- |
| deviceTypeId | <code>number</code> | 

<a name="DeviceTypeAPI+list"></a>

### deviceTypeAPI.list(deviceTypeListQuery) ⇒ <code>Promise</code>
Return a list of deviceTypes

**Returns**: <code>Promise</code> - list of deviceTypes  

| Param | Type |
| --- | --- |
| deviceTypeListQuery | <code>DeviceTypeListQuery</code> | 

<a name="DeviceTypeAPI+count"></a>

### deviceTypeAPI.count(deviceTypeCountQuery) ⇒ <code>Promise</code>
Returns count of deviceTypes

**Returns**: <code>Promise</code> - count of deviceTypes  

| Param | Type |
| --- | --- |
| deviceTypeCountQuery | <code>DeviceTypeCountQuery</code> | 

<a name="DeviceTypeAPI+insert"></a>

### deviceTypeAPI.insert(deviceType) ⇒ <code>Promise</code>
Registers a deviceType

**Returns**: <code>Promise</code> - count of deviceTypes  

| Param | Type | Description |
| --- | --- | --- |
| deviceType | <code>DeviceType</code> | data |

<a name="DeviceTypeAPI+update"></a>

### deviceTypeAPI.update(deviceType) ⇒ <code>Promise</code>
Updates a deviceType

**Returns**: <code>Promise</code> - count of deviceTypes  

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
    * [.update(network)](#NetworkAPI+update) ⇒ <code>Promise</code>
    * [.delete(networkId)](#NetworkAPI+delete) ⇒ <code>Promise</code>

<a name="NetworkAPI+get"></a>

### networkAPI.get(networkId) ⇒ <code>Promise</code>
Returns a network

**Returns**: <code>Promise</code> - selected network  

| Param | Type |
| --- | --- |
| networkId | <code>number</code> | 

<a name="NetworkAPI+list"></a>

### networkAPI.list(networkListQuery) ⇒ <code>Promise</code>
Return a list of networks

**Returns**: <code>Promise</code> - list of networks  

| Param | Type |
| --- | --- |
| networkListQuery | <code>NetworkListQuery</code> | 

<a name="NetworkAPI+count"></a>

### networkAPI.count(networkCountQuery) ⇒ <code>Promise</code>
Returns count of networks

**Returns**: <code>Promise</code> - count of networks  

| Param | Type |
| --- | --- |
| networkCountQuery | <code>NetworkCountQuery</code> | 

<a name="NetworkAPI+insert"></a>

### networkAPI.insert(network) ⇒ <code>Promise</code>
Registers a network

**Returns**: <code>Promise</code> - Network  

| Param | Type | Description |
| --- | --- | --- |
| network | <code>Network</code> | data |

<a name="NetworkAPI+update"></a>

### networkAPI.update(network) ⇒ <code>Promise</code>
Updates a network

**Returns**: <code>Promise</code> - Network  

| Param | Type | Description |
| --- | --- | --- |
| network | <code>Network</code> | data |

<a name="NetworkAPI+delete"></a>

### networkAPI.delete(networkId) ⇒ <code>Promise</code>
Deletes an existing network

**Returns**: <code>Promise</code> - Network  

| Param | Type |
| --- | --- |
| networkId | <code>number</code> | 

<a name="PluginAPI"></a>

## PluginAPI
Returns information about the current plugin


* [PluginAPI](#PluginAPI)
    * [.list(pluginListQuery)](#PluginAPI+list) ⇒ <code>Promise</code>
    * [.count(pluginCountQuery)](#PluginAPI+count) ⇒ <code>Promise</code>
    * [.register(plugin, pluginRegisterQuery)](#PluginAPI+register) ⇒ <code>Promise</code>
    * [.update(pluginUpdateQuery)](#PluginAPI+update) ⇒ <code>Promise</code>
    * [.delete(topicName)](#PluginAPI+delete) ⇒ <code>Promise</code>

<a name="PluginAPI+list"></a>

### pluginAPI.list(pluginListQuery) ⇒ <code>Promise</code>
Return a list of plugins

**Returns**: <code>Promise</code> - list of plugins  

| Param | Type |
| --- | --- |
| pluginListQuery | <code>PluginListQuery</code> | 

<a name="PluginAPI+count"></a>

### pluginAPI.count(pluginCountQuery) ⇒ <code>Promise</code>
Returns count of plugins

**Returns**: <code>Promise</code> - count of plugins  

| Param | Type |
| --- | --- |
| pluginCountQuery | <code>PluginCountQuery</code> | 

<a name="PluginAPI+register"></a>

### pluginAPI.register(plugin, pluginRegisterQuery) ⇒ <code>Promise</code>
Registers a plugin

**Returns**: <code>Promise</code> - Plugin  

| Param | Type |
| --- | --- |
| plugin | <code>Plugin</code> | 
| pluginRegisterQuery | <code>PluginRegisterQuery</code> | 

<a name="PluginAPI+update"></a>

### pluginAPI.update(pluginUpdateQuery) ⇒ <code>Promise</code>
Updates a plugin

**Returns**: <code>Promise</code> - Plugin  

| Param | Type |
| --- | --- |
| pluginUpdateQuery | <code>PluginUpdateQuery</code> | 

<a name="PluginAPI+delete"></a>

### pluginAPI.delete(topicName) ⇒ <code>Promise</code>
Deletes an existing plugin

**Returns**: <code>Promise</code> - Plugin  

| Param | Type |
| --- | --- |
| topicName | <code>string</code> | 

<a name="InfoAPI"></a>

## InfoAPI
Get server info


* [InfoAPI](#InfoAPI)
    * [.getServerInfo()](#InfoAPI+getServerInfo) ⇒ <code>Promise</code>
    * [.getCacheInfo()](#InfoAPI+getCacheInfo) ⇒ <code>Promise</code>
    * [.getClusterInfo()](#InfoAPI+getClusterInfo) ⇒ <code>Promise</code>

<a name="InfoAPI+getServerInfo"></a>

### infoAPI.getServerInfo() ⇒ <code>Promise</code>
Get server info

<a name="InfoAPI+getCacheInfo"></a>

### infoAPI.getCacheInfo() ⇒ <code>Promise</code>
Get cache info

<a name="InfoAPI+getClusterInfo"></a>

### infoAPI.getClusterInfo() ⇒ <code>Promise</code>
Get cluster info

<a name="TokenAPI"></a>

## TokenAPI
Authenticate using login and password


* [TokenAPI](#TokenAPI)
    * [.login(login, password)](#TokenAPI+login)
    * [.authPlugin(token)](#TokenAPI+authPlugin)
    * [.createUserToken(userToken)](#TokenAPI+createUserToken)
    * [.createPluginToken(pluginToken)](#TokenAPI+createPluginToken)
    * [.refresh(refreshToken)](#TokenAPI+refresh)

<a name="TokenAPI+login"></a>

### tokenAPI.login(login, password)
Creates TokenAPI


| Param | Type |
| --- | --- |
| login | <code>string</code> | 
| password | <code>string</code> | 

<a name="TokenAPI+authPlugin"></a>

### tokenAPI.authPlugin(token)
Create user token


| Param | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | Plugin token |

<a name="TokenAPI+createUserToken"></a>

### tokenAPI.createUserToken(userToken)
Create user token


| Param | Type |
| --- | --- |
| userToken | <code>UserToken</code> | 

<a name="TokenAPI+createPluginToken"></a>

### tokenAPI.createPluginToken(pluginToken)
Create plugin token


| Param | Type |
| --- | --- |
| pluginToken | <code>PluginToken</code> | 

<a name="TokenAPI+refresh"></a>

### tokenAPI.refresh(refreshToken)
Refresh token


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

**Returns**: <code>Promise</code> - list of users  

| Param | Type |
| --- | --- |
| userListQuery | <code>UserListQuery</code> | 

<a name="UserAPI+count"></a>

### userAPI.count(userCountQuery) ⇒ <code>Promise</code>
Returns count of users

**Returns**: <code>Promise</code> - count of users  

| Param | Type |
| --- | --- |
| userCountQuery | <code>UserCountQuery</code> | 

<a name="UserAPI+get"></a>

### userAPI.get(userId) ⇒ <code>Promise</code>
Returns information about the current user

**Returns**: <code>Promise</code> - selected user  

| Param | Type |
| --- | --- |
| userId | <code>number</code> | 

<a name="UserAPI+insert"></a>

### userAPI.insert(user) ⇒ <code>Promise</code>
Registers a user

**Returns**: <code>Promise</code> - count of users  

| Param | Type | Description |
| --- | --- | --- |
| user | <code>User</code> | data |

<a name="UserAPI+update"></a>

### userAPI.update(user) ⇒ <code>Promise</code>
Updates a user (only for administrators)

**Returns**: <code>Promise</code> - count of users  

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

**Returns**: <code>Promise</code> - selected user  
<a name="UserAPI+updateCurrent"></a>

### userAPI.updateCurrent(user) ⇒ <code>Promise</code>
Updates a user (only for administrators)

**Returns**: <code>Promise</code> - count of users  

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


## Models

<dl>
<dt><a href="#Configuration">Configuration</a></dt>
<dd><p>Configuration model</p>
</dd>
<dt><a href="#Device">Device</a></dt>
<dd><p>Device model</p>
</dd>
<dt><a href="#DeviceCommand">DeviceCommand</a></dt>
<dd><p>DeviceCommand model</p>
</dd>
<dt><a href="#DeviceNotification">DeviceNotification</a></dt>
<dd><p>DeviceNotification model</p>
</dd>
<dt><a href="#DeviceType">DeviceType</a></dt>
<dd><p>DeviceType model</p>
</dd>
<dt><a href="#Network">Network</a></dt>
<dd><p>Network model</p>
</dd>
<dt><a href="#Plugin">Plugin</a></dt>
<dd><p>Plugin model</p>
</dd>
<dt><a href="#PluginToken">PluginToken</a></dt>
<dd><p>PluginToken model</p>
</dd>
<dt><a href="#User">User</a></dt>
<dd><p>User model</p>
</dd>
<dt><a href="#UserToken">UserToken</a></dt>
<dd><p>UserToken model</p>
</dd>
</dl>


## Configuration
Configuration model


* [Configuration](#Configuration)
    * [new Configuration(options)](#new_Configuration_new)
    * [.toObject()](#Configuration+toObject) ⇒ <code>Object</code>

<a name="new_Configuration_new"></a>

### new Configuration(options)
Creates new Configuration model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | model options object |
| options.name | <code>string</code> | Configuration parameter name. |
| options.value | <code>string</code> | Configuration parameter value. |
| options.entityVersion | <code>number</code> | Specifies the version field or property of an entity class. |

<a name="Configuration+toObject"></a>

### configuration.toObject() ⇒ <code>Object</code>
Returns instance as a plain JS object

<a name="Device"></a>

## Device
Device model


* [Device](#Device)
    * [new Device(options)](#new_Device_new)
    * [.toObject()](#Device+toObject) ⇒ <code>Object</code>

<a name="new_Device_new"></a>

### new Device(options)
Creates new Device model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | model options object |
| options.id | <code>string</code> | Device unique identifier |
| options.name | <code>string</code> | Device display name |
| options.data | <code>object</code> | Device data, a JSON object with an arbitrary structure |
| options.networkId | <code>number</code> | Associated network id |
| options.deviceTypeId | <code>number</code> | Associated deviceType id |
| options.blocked | <code>boolean</code> | Indicates whether device is blocked |

<a name="Device+toObject"></a>

### device.toObject() ⇒ <code>Object</code>
Returns instance as a plain JS object

<a name="DeviceCommand"></a>

## DeviceCommand
DeviceCommand model


* [DeviceCommand](#DeviceCommand)
    * [new DeviceCommand(options)](#new_DeviceCommand_new)
    * [.toObject()](#DeviceCommand+toObject) ⇒ <code>Object</code>

<a name="new_DeviceCommand_new"></a>

### new DeviceCommand(options)
Creates new DeviceCommand model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | model options object |
| options.id | <code>number</code> | Command identifier |
| options.command | <code>string</code> | Command name |
| options.timestamp | <code>string</code> | Command UTC datetime (yyyy-MM-dd'T'HH:mm:ss.SSS ISO 8601) |
| options.lastUpdated | <code>string</code> | Last command update UTC datetime (yyyy-MM-dd'T'HH:mm:ss.SSS ISO 8601) |
| options.userId | <code>number</code> | Associated user identifier |
| options.deviceId | <code>string</code> | Device unique identifier |
| options.networkId | <code>number</code> | Network unique identifier |
| options.deviceTypeId | <code>number</code> | DeviceType unique identifier |
| options.parameters | <code>object</code> | Command parameters, a JSON object with an arbitrary structure |
| options.lifetime | <code>number</code> | Command lifetime, a number of seconds until this command expires |
| options.status | <code>string</code> | Command status, as reported by device or related infrastructure |
| options.result | <code>object</code> | Command execution result, an optional value that could be provided by device |

<a name="DeviceCommand+toObject"></a>

### deviceCommand.toObject() ⇒ <code>Object</code>
Returns instance as a plain JS object

<a name="DeviceNotification"></a>

## DeviceNotification
DeviceNotification model


* [DeviceNotification](#DeviceNotification)
    * [new DeviceNotification(options)](#new_DeviceNotification_new)
    * [.toObject()](#DeviceNotification+toObject) ⇒ <code>Object</code>

<a name="new_DeviceNotification_new"></a>

### new DeviceNotification(options)
Creates new DeviceNotification model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | model options object |
| options.id | <code>number</code> | Notification identifier |
| options.deviceId | <code>string</code> | Device unique identifier |
| options.networkId | <code>number</code> | Network unique identifier |
| options.deviceTypeId | <code>number</code> | Device type unique identifier |
| options.notification | <code>string</code> | Notification name |
| options.timestamp | <code>string</code> | Notification UTC datetime (yyyy-MM-dd'T'HH:mm:ss.SSS ISO 8601) |
| options.parameters | <code>object</code> | Notification parameters, a JSON object with an arbitrary structure |

<a name="DeviceNotification+toObject"></a>

### deviceNotification.toObject() ⇒ <code>Object</code>
Returns instance as a plain JS object

<a name="DeviceType"></a>

## DeviceType
DeviceType model


* [DeviceType](#DeviceType)
    * [new DeviceType(options)](#new_DeviceType_new)
    * [.toObject()](#DeviceType+toObject) ⇒ <code>Object</code>

<a name="new_DeviceType_new"></a>

### new DeviceType(options)
Creates new DeviceType model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | model options object |
| options.id | <code>number</code> | Device type identifier |
| options.name | <code>string</code> | Device type name |
| options.description | <code>string</code> | Device type description |

<a name="DeviceType+toObject"></a>

### deviceType.toObject() ⇒ <code>Object</code>
Returns instance as a plain JS object

<a name="Network"></a>

## Network
Network model


* [Network](#Network)
    * [new Network(options)](#new_Network_new)
    * [.toObject()](#Network+toObject) ⇒ <code>Object</code>

<a name="new_Network_new"></a>

### new Network(options)
Creates new Network model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | model options object |
| options.id | <code>number</code> | Network identifier |
| options.name | <code>string</code> | Network name |
| options.description | <code>string</code> | Network description |

<a name="Network+toObject"></a>

### network.toObject() ⇒ <code>Object</code>
Returns instance as a plain JS object

<a name="Plugin"></a>

## Plugin
Plugin model


* [Plugin](#Plugin)
    * [new Plugin(options)](#new_Plugin_new)
    * [.toObject()](#Plugin+toObject) ⇒ <code>Object</code>

<a name="new_Plugin_new"></a>

### new Plugin(options)
Creates new Plugin model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | model options object |
| options.id | <code>id</code> | Plgin unique idnetifier |
| options.name | <code>string</code> | Plugin name |
| options.description | <code>string</code> | Plugin description |
| options.topicName | <code>string</code> | Plugin topic name |
| options.filter | <code>string</code> | Plugin filter |
| options.status | <code>string</code> | Plugin status |
| options.subscriptionId | <code>string</code> | Plugin subscribtion id |
| options.userId | <code>number</code> | Plugin user id |
| options.parameters | <code>object</code> | Json object with parameters |

<a name="Plugin+toObject"></a>

### plugin.toObject() ⇒ <code>Object</code>
Returns instance as a plain JS object

<a name="PluginToken"></a>

## PluginToken
PluginToken model


* [PluginToken](#PluginToken)
    * [new PluginToken(options)](#new_PluginToken_new)
    * [.toObject()](#PluginToken+toObject) ⇒ <code>Object</code>

<a name="new_PluginToken_new"></a>

### new PluginToken(options)
Creates new PluginToken model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | model options object |
| options.actions | <code>Array</code> | Plugin Token actions |
| options.expiration | <code>string</code> | Plugin expiration |
| options.type | <code>number</code> | Plugin type |
| options.topicName | <code>string</code> | Plugin topic name |

<a name="PluginToken+toObject"></a>

### pluginToken.toObject() ⇒ <code>Object</code>
Returns instance as a plain JS object

<a name="User"></a>

## User
User model


* [User](#User)
    * [new User(options)](#new_User_new)
    * [.toObject()](#User+toObject) ⇒ <code>Object</code>

<a name="new_User_new"></a>

### new User(options)
Creates new User model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | model options object |
| options.id | <code>numebr</code> | User identifier |
| options.login | <code>string</code> | User login using during authentication |
| options.role | <code>number</code> | User role. Available values: 0: Administrator role, 1: Client role. |
| options.status | <code>number</code> | User status. Available values: 0: The user is active, 1: The user has been locked out due to invalid login attempts, 2: The user has been disabled |
| options.lastLogin | <code>string</code> | User last login timestamp (UTC) |
| options.data | <code>object</code> | User data, a JSON object with an arbitrary structure |
| options.password | <code>string</code> | User Password |
| options.introReviewed | <code>boolean</code> | Indicates if user reviewed an intro |
| options.allDeviceTypesAvailable | <code>boolean</code> | Is all device types awailable |

<a name="User+toObject"></a>

### user.toObject() ⇒ <code>Object</code>
Returns instance as a plain JS object

<a name="UserToken"></a>

## UserToken
UserToken model


* [UserToken](#UserToken)
    * [new UserToken(options)](#new_UserToken_new)
    * [.toObject()](#UserToken+toObject) ⇒ <code>Object</code>

<a name="new_UserToken_new"></a>

### new UserToken(options)
Creates new UserToken model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | model options object |
| options.userId | <code>number</code> | User id |
| options.actions | <code>Array</code> | User Actions |
| options.networkIds | <code>Array</code> | Network id's |
| options.deviceTypeIds | <code>Array</code> | Devicetype id's |
| options.expiration | <code>string</code> | Token expiration datetme |

<a name="UserToken+toObject"></a>

### userToken.toObject() ⇒ <code>Object</code>
Returns instance as a plain JS object


## Query models

<dl>
<dt><a href="#CommandListQuery">CommandListQuery</a></dt>
<dd><p>CommandListQuery class</p>
</dd>
<dt><a href="#CommandPollManyQuery">CommandPollManyQuery</a></dt>
<dd><p>CommandPollManyQuery class</p>
</dd>
<dt><a href="#CommandPollQuery">CommandPollQuery</a></dt>
<dd><p>CommandPollQuery class</p>
</dd>
<dt><a href="#CommandWaitQuery">CommandWaitQuery</a></dt>
<dd><p>CommandWaitQuery class</p>
</dd>
<dt><a href="#DeviceCountQuery">DeviceCountQuery</a></dt>
<dd><p>DeviceCountQuery class</p>
</dd>
<dt><a href="#DeviceListQuery">DeviceListQuery</a></dt>
<dd><p>DeviceListQuery class</p>
</dd>
<dt><a href="#DeviceTypeCountQuery">DeviceTypeCountQuery</a></dt>
<dd><p>DeviceTypeCountQuery class</p>
</dd>
<dt><a href="#DeviceTypeListQuery">DeviceTypeListQuery</a></dt>
<dd><p>DeviceTypeListQuery class</p>
</dd>
<dt><a href="#NetworkCountQuery">NetworkCountQuery</a></dt>
<dd><p>NetworkCountQuery class</p>
</dd>
<dt><a href="#NetworkListQuery">NetworkListQuery</a></dt>
<dd><p>NetworkListQuery class</p>
</dd>
<dt><a href="#NotificationListQuery">NotificationListQuery</a></dt>
<dd><p>NotificationListQuery class</p>
</dd>
<dt><a href="#NotificationPollManyQuery">NotificationPollManyQuery</a></dt>
<dd><p>NotificationPollManyQuery class</p>
</dd>
<dt><a href="#NotificationPollQuery">NotificationPollQuery</a></dt>
<dd><p>NotificationPollQuery class</p>
</dd>
<dt><a href="#PluginCountQuery">PluginCountQuery</a></dt>
<dd><p>PluginCountQuery class</p>
</dd>
<dt><a href="#PluginListQuery">PluginListQuery</a></dt>
<dd><p>PluginListQuery class</p>
</dd>
<dt><a href="#PluginRegisterQuery">PluginRegisterQuery</a></dt>
<dd><p>PluginRegisterQuery class</p>
</dd>
<dt><a href="#PluginUpdateQuery">PluginUpdateQuery</a></dt>
<dd><p>PluginUpdateQuery class</p>
</dd>
<dt><a href="#UserCountQuery">UserCountQuery</a></dt>
<dd><p>UserCountQuery class</p>
</dd>
<dt><a href="#UserListQuery">UserListQuery</a></dt>
<dd><p>UserListQuery class</p>
</dd>
</dl>

<a name="CommandListQuery"></a>

## CommandListQuery
CommandListQuery class


* [CommandListQuery](#CommandListQuery)
    * [new CommandListQuery(options)](#new_CommandListQuery_new)
    * [.toObject()](#CommandListQuery+toObject) ⇒ <code>Object</code>

<a name="new_CommandListQuery_new"></a>

### new CommandListQuery(options)
Creates new CommandListQuery model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | model options object |
| options.deviceId | <code>string</code> | Device ID |
| options.start | <code>string</code> | Start timestamp |
| options.end | <code>string</code> | End timestamp |
| options.command | <code>string</code> | Command name |
| options.status | <code>string</code> | Command status |
| options.sortField | <code>string</code> | Sort field |
| options.sortOrder | <code>string</code> | Sort order |
| options.take | <code>number</code> | Limit param |
| options.skip | <code>number</code> | Skip param |

<a name="CommandListQuery+toObject"></a>

### commandListQuery.toObject() ⇒ <code>Object</code>
Returns instance as a plain JS object

<a name="CommandPollManyQuery"></a>

## CommandPollManyQuery
CommandPollManyQuery class


* [CommandPollManyQuery](#CommandPollManyQuery)
    * [new CommandPollManyQuery(options)](#new_CommandPollManyQuery_new)
    * [.toObject()](#CommandPollManyQuery+toObject) ⇒ <code>Object</code>

<a name="new_CommandPollManyQuery_new"></a>

### new CommandPollManyQuery(options)
Creates new CommandPollManyQuery model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | model options object |
| options.deviceIds | <code>string</code> | List of device IDs |
| options.networkIds | <code>string</code> | List of network IDs |
| options.deviceTypeIds | <code>string</code> | List of devicetype IDs |
| options.names | <code>string</code> | Command names |
| options.timestamp | <code>string</code> | Timestamp to start from |
| options.waitTimeout | <code>number</code> | Wait timeout in seconds |
| options.limit | <code>number</code> | Limit number of commands |

<a name="CommandPollManyQuery+toObject"></a>

### commandPollManyQuery.toObject() ⇒ <code>Object</code>
Returns instance as a plain JS object

<a name="CommandPollQuery"></a>

## CommandPollQuery
CommandPollQuery class


* [CommandPollQuery](#CommandPollQuery)
    * [new CommandPollQuery(options)](#new_CommandPollQuery_new)
    * [.toObject()](#CommandPollQuery+toObject) ⇒ <code>Object</code>

<a name="new_CommandPollQuery_new"></a>

### new CommandPollQuery(options)
Creates new CommandPollQuery model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | model options object |
| options.deviceId | <code>string</code> | Device ID |
| options.names | <code>string</code> | Command names |
| options.timestamp | <code>number</code> | Timestamp to start from |
| options.returnUpdatedCommands | <code>boolean</code> | Checks if updated commands should be returned |
| options.waitTimeout | <code>number</code> | Wait timeout in seconds |
| options.limit | <code>number</code> | Limit number of commands |

<a name="CommandPollQuery+toObject"></a>

### commandPollQuery.toObject() ⇒ <code>Object</code>
Returns instance as a plain JS object

<a name="CommandWaitQuery"></a>

## CommandWaitQuery
CommandWaitQuery class


* [CommandWaitQuery](#CommandWaitQuery)
    * [new CommandWaitQuery(options)](#new_CommandWaitQuery_new)
    * [.toObject()](#CommandWaitQuery+toObject) ⇒ <code>Object</code>

<a name="new_CommandWaitQuery_new"></a>

### new CommandWaitQuery(options)
Creates new CommandWaitQuery model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | model options object |
| options.waitTimeout | <code>Number</code> | wait timeout (sec) |

<a name="CommandWaitQuery+toObject"></a>

### commandWaitQuery.toObject() ⇒ <code>Object</code>
Returns instance as a plain JS object

<a name="DeviceCountQuery"></a>

## DeviceCountQuery
DeviceCountQuery class


* [DeviceCountQuery](#DeviceCountQuery)
    * [new DeviceCountQuery(options)](#new_DeviceCountQuery_new)
    * [.toObject()](#DeviceCountQuery+toObject) ⇒ <code>Object</code>

<a name="new_DeviceCountQuery_new"></a>

### new DeviceCountQuery(options)
Creates new DeviceCountQuery model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | model options object |
| options.name | <code>string</code> | Filter by device name |
| options.namePattern | <code>string</code> | Filter by device name pattern. In pattern wildcards '%' and '_' can be used |
| options.networkId | <code>number</code> | Filter by associated network identifier |
| options.networkName | <code>string</code> | Filter by associated network name |

<a name="DeviceCountQuery+toObject"></a>

### deviceCountQuery.toObject() ⇒ <code>Object</code>
Returns instance as a plain JS object

<a name="DeviceListQuery"></a>

## DeviceListQuery
DeviceListQuery class


* [DeviceListQuery](#DeviceListQuery)
    * [new DeviceListQuery(options)](#new_DeviceListQuery_new)
    * [.toObject()](#DeviceListQuery+toObject) ⇒ <code>Object</code>

<a name="new_DeviceListQuery_new"></a>

### new DeviceListQuery(options)
Creates new DeviceListQuery model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | model options object |
| options.name | <code>string</code> | Filter by device name |
| options.namePattern | <code>string</code> | Filter by device name pattern. In pattern wildcards '%' and '_' can be used |
| options.networkId | <code>number</code> | Filter by associated network identifier |
| options.networkName | <code>string</code> | Filter by associated network name |
| options.sortField | <code>string</code> | Result list sort field |
| options.sortOrder | <code>string</code> | Result list sort order. The sortField should be specified |
| options.take | <code>number</code> | Number of records to take from the result list |
| options.skip | <code>number</code> | Number of records to skip from the result list |

<a name="DeviceListQuery+toObject"></a>

### deviceListQuery.toObject() ⇒ <code>Object</code>
Returns instance as a plain JS object

<a name="DeviceTypeCountQuery"></a>

## DeviceTypeCountQuery
DeviceTypeCountQuery class


* [DeviceTypeCountQuery](#DeviceTypeCountQuery)
    * [new DeviceTypeCountQuery(options)](#new_DeviceTypeCountQuery_new)
    * [.toObject()](#DeviceTypeCountQuery+toObject) ⇒ <code>Object</code>

<a name="new_DeviceTypeCountQuery_new"></a>

### new DeviceTypeCountQuery(options)
Creates new DeviceTypeCountQuery model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | model options object |
| options.name | <code>string</code> | Filter by device type name |
| options.namePattern | <code>string</code> | Filter by device type name pattern. In pattern wildcards '%' and '_' can be used |

<a name="DeviceTypeCountQuery+toObject"></a>

### deviceTypeCountQuery.toObject() ⇒ <code>Object</code>
Returns instance as a plain JS object

<a name="DeviceTypeListQuery"></a>

## DeviceTypeListQuery
DeviceTypeListQuery class


* [DeviceTypeListQuery](#DeviceTypeListQuery)
    * [new DeviceTypeListQuery(options)](#new_DeviceTypeListQuery_new)
    * [.toObject()](#DeviceTypeListQuery+toObject) ⇒ <code>Object</code>

<a name="new_DeviceTypeListQuery_new"></a>

### new DeviceTypeListQuery(options)
Creates new DeviceTypeListQuery model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | model options object |
| options.name | <code>string</code> | Filter by device type name |
| options.namePattern | <code>string</code> | Filter by device type name pattern. In pattern wildcards '%' and '_' can be used |
| options.sortField | <code>string</code> | Result list sort field |
| options.sortOrder | <code>string</code> | Result list sort order. The sortField should be specified |
| options.take | <code>number</code> | Number of records to take from the result list |
| options.skip | <code>number</code> | Number of records to skip from the result list |

<a name="DeviceTypeListQuery+toObject"></a>

### deviceTypeListQuery.toObject() ⇒ <code>Object</code>
Returns instance as a plain JS object

<a name="NetworkCountQuery"></a>

## NetworkCountQuery
NetworkCountQuery class


* [NetworkCountQuery](#NetworkCountQuery)
    * [new NetworkCountQuery(options)](#new_NetworkCountQuery_new)
    * [.toObject()](#NetworkCountQuery+toObject) ⇒ <code>Object</code>

<a name="new_NetworkCountQuery_new"></a>

### new NetworkCountQuery(options)
Creates new NetworkCountQuery model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | model options object |
| options.name | <code>string</code> | Filter by device type name |
| options.namePattern | <code>string</code> | Filter by device type name pattern. In pattern wildcards '%' and '_' can be used |

<a name="NetworkCountQuery+toObject"></a>

### networkCountQuery.toObject() ⇒ <code>Object</code>
Returns instance as a plain JS object

<a name="NetworkListQuery"></a>

## NetworkListQuery
NetworkListQuery class


* [NetworkListQuery](#NetworkListQuery)
    * [new NetworkListQuery(options)](#new_NetworkListQuery_new)
    * [.toObject()](#NetworkListQuery+toObject) ⇒ <code>Object</code>

<a name="new_NetworkListQuery_new"></a>

### new NetworkListQuery(options)
Creates new NetworkListQuery model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | model options object |
| options.name | <code>string</code> | Filter by device type name |
| options.namePattern | <code>string</code> | Filter by device type name pattern. In pattern wildcards '%' and '_' can be used |
| options.sortField | <code>string</code> | Result list sort field |
| options.sortOrder | <code>string</code> | Result list sort order. The sortField should be specified |
| options.take | <code>number</code> | Number of records to take from the result list |
| options.skip | <code>number</code> | Number of records to skip from the result list |

<a name="NetworkListQuery+toObject"></a>

### networkListQuery.toObject() ⇒ <code>Object</code>
Returns instance as a plain JS object

<a name="NotificationListQuery"></a>

## NotificationListQuery
NotificationListQuery class


* [NotificationListQuery](#NotificationListQuery)
    * [new NotificationListQuery(options)](#new_NotificationListQuery_new)
    * [.toObject()](#NotificationListQuery+toObject) ⇒ <code>Object</code>

<a name="new_NotificationListQuery_new"></a>

### new NotificationListQuery(options)
Creates new NotificationListQuery model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | model options object |
| options.deviceId | <code>string</code> | Device ID |
| options.start | <code>string</code> | Start timestamp |
| options.end | <code>string</code> | End timestamp |
| options.notification | <code>string</code> | Notification name |
| options.status | <code>string</code> | Command status |
| options.sortField | <code>string</code> | Sort field |
| options.sortOrder | <code>string</code> | Sort order |
| options.take | <code>number</code> | Limit param |
| options.skip | <code>number</code> | Skip param |

<a name="NotificationListQuery+toObject"></a>

### notificationListQuery.toObject() ⇒ <code>Object</code>
Returns instance as a plain JS object

<a name="NotificationPollManyQuery"></a>

## NotificationPollManyQuery
NotificationPollManyQuery class


* [NotificationPollManyQuery](#NotificationPollManyQuery)
    * [new NotificationPollManyQuery(options)](#new_NotificationPollManyQuery_new)
    * [.toObject()](#NotificationPollManyQuery+toObject) ⇒ <code>Object</code>

<a name="new_NotificationPollManyQuery_new"></a>

### new NotificationPollManyQuery(options)
Creates new NotificationPollManyQuery model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | model options object |
| options.deviceIds | <code>string</code> | List of device IDs |
| options.networkIds | <code>string</code> | List of network IDs |
| options.deviceTypeIds | <code>string</code> | List of devicetype IDs |
| options.names | <code>string</code> | Notification names |
| options.timestamp | <code>string</code> | Timestamp to start from |
| options.waitTimeout | <code>number</code> | Wait timeout in seconds |

<a name="NotificationPollManyQuery+toObject"></a>

### notificationPollManyQuery.toObject() ⇒ <code>Object</code>
<a name="NotificationPollQuery"></a>

## NotificationPollQuery
NotificationPollQuery class


* [NotificationPollQuery](#NotificationPollQuery)
    * [new NotificationPollQuery(options)](#new_NotificationPollQuery_new)
    * [.toObject()](#NotificationPollQuery+toObject) ⇒ <code>Object</code>

<a name="new_NotificationPollQuery_new"></a>

### new NotificationPollQuery(options)
Creates new NotificationPollQuery model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | model options object |
| options.deviceId | <code>string</code> | Device ID |
| options.names | <code>string</code> | Notification names |
| options.timestamp | <code>number</code> | Timestamp to start from |
| options.waitTimeout | <code>number</code> | Wait timeout in seconds |

<a name="NotificationPollQuery+toObject"></a>

### notificationPollQuery.toObject() ⇒ <code>Object</code>
Returns instance as a plain JS object

<a name="PluginCountQuery"></a>

## PluginCountQuery
PluginCountQuery class


* [PluginCountQuery](#PluginCountQuery)
    * [new PluginCountQuery(options)](#new_PluginCountQuery_new)
    * [.toObject()](#PluginCountQuery+toObject) ⇒ <code>Object</code>

<a name="new_PluginCountQuery_new"></a>

### new PluginCountQuery(options)
Creates new PluginCountQuery model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | model options object |
| options.name | <code>string</code> | Filter by plugin name |
| options.namePattern | <code>string</code> | Filter by plugin name pattern. In pattern wildcards '%' and '_' can be used |
| options.topicName | <code>string</code> | Filter by plugin topic name |
| options.status | <code>number</code> | Filter by plugin status |
| options.userId | <code>number</code> | Filter by associated user identifier. Only admin can see other users' plugins |

<a name="PluginCountQuery+toObject"></a>

### pluginCountQuery.toObject() ⇒ <code>Object</code>
Returns instance as a plain JS object

<a name="PluginListQuery"></a>

## PluginListQuery
PluginListQuery class


* [PluginListQuery](#PluginListQuery)
    * [new PluginListQuery(options)](#new_PluginListQuery_new)
    * [.toObject()](#PluginListQuery+toObject) ⇒ <code>Object</code>

<a name="new_PluginListQuery_new"></a>

### new PluginListQuery(options)
Creates new PluginListQuery model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | model options object |
| options.name | <code>string</code> | Filter by plugin name |
| options.namePattern | <code>string</code> | Filter by plugin name pattern. In pattern wildcards '%' and '_' can be used |
| options.topicName | <code>string</code> | Filter by plugin topic nathis. |
| options.status | <code>string</code> | Filter by plugin status. |
| options.userId | <code>number</code> | Filter by associated user identifier. Only admin can see other users' plugins |
| options.sortField | <code>string</code> | Result list sort field |
| options.sortOrder | <code>string</code> | Result list sort order. The sortField should be specified |
| options.take | <code>number</code> | Number of records to take from the result list |
| options.skip | <code>number</code> | Number of records to skip from the result list |

<a name="PluginListQuery+toObject"></a>

### pluginListQuery.toObject() ⇒ <code>Object</code>
Returns instance as a plain JS object

<a name="PluginRegisterQuery"></a>

## PluginRegisterQuery
PluginRegisterQuery class


* [PluginRegisterQuery](#PluginRegisterQuery)
    * [new PluginRegisterQuery(options)](#new_PluginRegisterQuery_new)
    * [.toObject()](#PluginRegisterQuery+toObject) ⇒ <code>Object</code>

<a name="new_PluginRegisterQuery_new"></a>

### new PluginRegisterQuery(options)
Creates new PluginRegisterQuery model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | model options object |
| [options.deviceId] | <code>string</code> | Device device_id |
| [options.networkIds] | <code>string</code> | Network ids |
| [options.deviceTypeIds] | <code>string</code> | Device type ids |
| [options.names] | <code>string</code> | Command/Notification names |
| [options.returnCommands] | <code>boolean</code> | Checks if commands should be returned |
| [options.returnUpdatedCommands] | <code>boolean</code> | Checks if updated commands should be returned |
| [options.returnNotifications] | <code>boolean</code> | Checks if commands should be returned |

<a name="PluginRegisterQuery+toObject"></a>

### pluginRegisterQuery.toObject() ⇒ <code>Object</code>
Returns instance as a plain JS object

<a name="PluginUpdateQuery"></a>

## PluginUpdateQuery
PluginUpdateQuery class


* [PluginUpdateQuery](#PluginUpdateQuery)
    * [new PluginUpdateQuery(options)](#new_PluginUpdateQuery_new)
    * [.toObject()](#PluginUpdateQuery+toObject) ⇒ <code>Object</code>

<a name="new_PluginUpdateQuery_new"></a>

### new PluginUpdateQuery(options)
Creates Plugin Update Query model


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options for instance |
| options.topicName | <code>string</code> | Name of topic that was created for the plugin |
| [options.deviceId] | <code>string</code> | Device device_id |
| [options.networkIds] | <code>string</code> | Network ids |
| [options.deviceTypeIds] | <code>string</code> | Device type ids |
| [options.names] | <code>string</code> | Command/Notification names |
| [options.returnCommands] | <code>boolean</code> | Checks if commands should be returned |
| [options.returnUpdatedCommands] | <code>boolean</code> | Checks if updated commands should be returned |
| [options.returnNotifications] | <code>boolean</code> | Checks if commands should be returned |
| [options.status] | <code>string</code> | Plugin status - active or disabled (ACTIVE | DISABLED | CREATED) |
| [options.name] | <code>string</code> | Plugin name |
| [options.description] | <code>string</code> | Plugin description |
| [options.parameters] | <code>string</code> | Plugin parameters |

<a name="PluginUpdateQuery+toObject"></a>

### pluginUpdateQuery.toObject() ⇒ <code>Object</code>
<a name="UserCountQuery"></a>

## UserCountQuery
UserCountQuery class


* [UserCountQuery](#UserCountQuery)
    * [new UserCountQuery(options)](#new_UserCountQuery_new)
    * [.toObject()](#UserCountQuery+toObject) ⇒ <code>Object</code>

<a name="new_UserCountQuery_new"></a>

### new UserCountQuery(options)
Creates User Count Query


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options for instance |
| options.login | <code>string</code> | Filter by user login |
| options.loginPattern | <code>string</code> | Filter by user login pattern |
| options.role | <code>number</code> | Filter by user login patter |
| options.status | <code>number</code> | Filter by user status. 0 is Active, 1 is Locked Out, 2 is Disabled |

<a name="UserCountQuery+toObject"></a>

### userCountQuery.toObject() ⇒ <code>Object</code>
Returns instance as a plain JS object

<a name="UserListQuery"></a>

## UserListQuery
UserListQuery class


* [UserListQuery](#UserListQuery)
    * [new UserListQuery(options)](#new_UserListQuery_new)
    * [.toObject()](#UserListQuery+toObject) ⇒ <code>Object</code>

<a name="new_UserListQuery_new"></a>

### new UserListQuery(options)
Creates User List Query


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Options for instance |
| options.login | <code>string</code> | Filter by user login |
| options.loginPattern | <code>string</code> | Filter by user login pattern |
| options.role | <code>number</code> | Filter by user login patter |
| options.status | <code>number</code> | Filter by user status. 0 is Active, 1 is Locked Out, 2 is Disabled |
| options.sortField | <code>string</code> | Result list sort field |
| options.sortOrder | <code>string</code> | Result list sort order. The sortField should be specified |
| options.take | <code>number</code> | Number of records to take from the result list |
| options.skip | <code>number</code> | Number of records to skip from the result list |

<a name="UserListQuery+toObject"></a>

### userListQuery.toObject() ⇒ <code>Object</code>
Returns instance as a plain JS object



## License

[DeviceHive] is developed by [DataArt] Apps and distributed under Open Source
[Apache 2.0 license](https://en.wikipedia.org/wiki/Apache_License). 

© Copyright 2018 [DataArt] Apps © All Rights Reservedstrong text