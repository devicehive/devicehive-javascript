# devicehive-node

## Synopsis

DeviceHive Node Library

## Installation
Package is published in npm - https://www.npmjs.com/package/devicehive

NPM >= 5.0.0

`npm i devicehive`

NPM < 5.0.0

`npm i -S devicehive`

## Usage

During development you could use this library with Promises, Generators and Async/Await functions.

### Example with Promises

``` js
function authPromise(login, password){
  return new DeviceHive({
    serverURL : `http://<host>:<port>/<path>`,
    login,
    password
  });
}

function getInfoPromise(login, password){
  return authPromise(login, password)
    .then(deviceHive => deviceHive.getInfo());
}

getInfoPromise(`login`, `password`)
.then(...);
```

### Example with Generators
For using Generators you could add additional library `co`

```js
const co = require(`co`);
...
function* authGenerator(login, password){
  return yield new DeviceHive({
    serverURL : `http://<url>:<port>/<path>`,
    login,
    password
  });
}

function* getInfoGenerator(login, password){
  const deviceHive = yield * authGenerator(login, password);
  return yield deviceHive.getInfo()
}

co(getInfoGenerator(`login`, `password`))
.then(...);

```

### Example with Async/Await

```js
async function authAsyncAwait(login, password){
  return await new DeviceHive({
    serverURL : `http://<host>:<port>/<path>`,
    login,
    password
  });
}

async function getInfoAsyncAwait(login, password){
  const deviceHive = await authAsyncAwait(login, password);
  return await deviceHive.getInfo();
}

getInfoAsyncAwait(`login`, `password`)
.then(...);
```

## API Reference

  * [class DeviceHive](#DeviceHive)
    * [new DeviceHive({ serverURL, login, password })](#new_DeviceHive_login_password) ⇒ `Promise`
    * [new DeviceHive({ serverURL, accessToken, refreshToken })](#new_DeviceHive_access_refresh) ⇒ `Promise`
    * [new DeviceHive({ serverURL, refreshToken })](#new_DeviceHive_refresh_only) ⇒ `Promise`
    * _instance_
      * [.getInfo()](#DeviceHive+getInfo) ⇒ `Http` ⇒ `Promise`
      * [.getClusterInfo()](#DeviceHive+getClusterInfo) ⇒ `Http` ⇒ `Promise`
      * [.createToken(userId, actions, networkIds, deviceIds, expiration)](#DeviceHive+createToken) ⇒ `Http` ⇒ `Promise`
      * [.refreshToken()](#DeviceHive+refreshToken) ⇒ `Http` ⇒ `Promise`
      * [.getConfigurationProperty(name)](#DeviceHive+getConfiguration) ⇒ `Http` ⇒ `Promise`
      * [.setConfigurationProperty(name, value)](#DeviceHive+setConfigurationProperty) ⇒ `Http` ⇒ `Promise`
      * [.removeConfigurationProperty(name)](#DeviceHive+removeConfigurationProperty) ⇒ `Http` ⇒ `Promise`
      * [.listNetworks(filter)](#DeviceHive+listNetworks) ⇒ `Http` ⇒ `Promise`
      * [.getNetwork(networkId)](#DeviceHive+getNetwork) ⇒ `Http` ⇒ `Promise`
      * [.removeNetwork(networkId)](#DeviceHive+removeNetwork) ⇒ `Http` ⇒ `Promise`
      * [.createNetwork(name, description)](#DeviceHive+createNetwork) ⇒ `Http` ⇒ `Promise`
      * [.listDevices(filter)](#DeviceHive+getDevices) ⇒ `Http` ⇒ `Promise`
      * [.removeDevice(id)](#DeviceHive+removeDevice) ⇒ `Http` ⇒ `Promise`
      * [.getDevice(id)](#DeviceHive+getDevice) ⇒ `Http` ⇒ `Promise`
      * [.putDevice(id, deviceParams)](#DeviceHive+saveDevice) ⇒ `Http` ⇒ `Promise`
      * [.getCurrentUser()](#DeviceHive+getCurrentUser) ⇒ `Http` ⇒ `Promise`
      * [.getUsers(filter)](#DeviceHive+getUsers) ⇒ `Http` ⇒ `Promise`
      * [.createUser(userParams)](#DeviceHive+createUser) ⇒ `Http` ⇒ `Promise`
      * [.removeUser(userId)](#DeviceHive+removeUser) ⇒ `Http` ⇒ `Promise`
      * [.subscribeCommands(deviceIds, subscriber, commandFilter)](#DeviceHive+subscribeCommands) ⇒ `Promise`
      * [.unsubscribeCommands(deviceIds, commandFilter)](#DeviceHive+unsubscribeCommands) ⇒ `Promise`
      * [.subscribeNotifications(deviceIds, subscriber, notificationFilter)](#DeviceHive+subscribeNotifications) ⇒ `Promise`
      * [.unsubscribeNotifications(deviceIds, notificationFilter)](#DeviceHive+unsubscribeNotifications) ⇒ `Promise`
    * _inner_
      * [~NetworkFilter](#DeviceHive..NetworkFilter) : `Object`
      * [~DeviceFilter](#DeviceHive..DeviceFilter) : `Object`
      * [~DeviceParams](#DeviceHive..DeviceParams) : `Object`
      * [~UsersFilter](#DeviceHive..UsersFilter) : `Object`
      * [~DeviceCommandPollFilter](#DeviceHive~DeviceCommandPollFilter) : `Object`
      * [~DevicesNotificationPollFilter](#DeviceHive~DevicesNotificationPollFilter) : `Object`
  * [class Device](#Device)
    * [new Device({ id, name = id, data = null, networkId = null, isBlocked = false })](#new_Device)
    * _instance_
      * [.getId()](#Device+getId) ⇒ `String`
      * [.getName()](#Device+getName) ⇒ `String`
      * [.getData()](#Device+getData) ⇒ `Object`
      * [.getNetworkId()](#Device+getNetworkId) ⇒ `Number`
      * [.getBlocked()](#Device+getBlocked) ⇒ `Boolean`
      * [.setId(newId)](#Device+setId)
      * [.setName(newName)](#Device+setName)
      * [.setData(newData)](#Device+setData)
      * [.setNetworkId(newNetworkId)](#Device+setNetworkId)
      * [.setBlocked(newBlocked)](#Device+setBlocked)
      * [.save()](#Device+save) ⇒ `Http` ⇒ `Promise`
      * [.getCommands(filter)](#Device+getCommands) ⇒ `Http` ⇒ `Promise`
      * [.getNotifications(filter)](#Device+getNotifications) ⇒ `Http` ⇒ `Promise`
      * [.sendCommand(command, parameters, updateSubscriber)](#Device+sendCommand) ⇒ `Http` ⇒ `Promise`
      * [.sendNotification(notification, parameters)](#Device+sendNotification) ⇒ `Http` ⇒ `Promise`
      * [.subscribeCommands(subscriber, commandFilter)](#Device+subscribeCommands) ⇒ `Promise`
      * [.unsubscribeCommands(commandFilter)](#Device+unsubscribeCommands) ⇒ `Promise`
      * [.subscribeNotifications(subscriber, notificationFilter)](#Device+subscribeNotifications) ⇒ `Promise`
      * [.unsubscribeNotifications(notificationFilter)](#Device+unsubscribeNotifications) ⇒ `Promise`
    * _inner_
      * [~DeviceCommandsFilter](#Device..DeviceCommandsFilter) : `Object`
      * [~DeviceNotificationsFilter](#Device..DeviceNotificationsFilter) : `Object`
      * [~CommandParams](#Device~CommandParams) : `Object`
      * [~NotificationParams](#Device~NotificationParams) : `Object`
      * [~CommandPollParams](#Device~CommandPollParams) : `Object`
      * [~NotificationPollParams](#Device~NotificationPollParams) : `Object`
  * [class DeviceCommand](#DeviceCommand)
    * [new DeviceCommand({ id, command, timestamp, userId, deviceId, parameters = null, lifetime = 0, status = null, result = null })](#new_DeviceCommand)
    * _instance_
      * [.getId()](#DeviceCommand+getId) ⇒ `String`
      * [.getCommand()](#DeviceCommand+getCommand) ⇒ `String`
      * [.getTimestamp()](#DeviceCommand+getTimestamp) ⇒ `String`
      * [.getUserId()](#DeviceCommand+getUserId) ⇒ `String`
      * [.getDeviceId()](#DeviceCommand+getDeviceId) ⇒ `String`
      * [.getParameters()](#DeviceCommand+getParameters) ⇒ `Object`
      * [.getLifetime()](#DeviceCommand+getLifetime) ⇒ `Number`
      * [.getStatus()](#DeviceCommand+getStatus) ⇒ `String`
      * [.getResult()](#DeviceCommand+getResult) ⇒ `String`
      * [.setId(newid)](#DeviceCommand+setId)
      * [.setCommand(newCommand)](#DeviceCommand+setCommand)
      * [.setTimestamp(newTimestamp)](#DeviceCommand+setTimestamp)
      * [.setUserId(newUserId)](#DeviceCommand+setUserId)
      * [.setDeviceId(newDeviceId)](#DeviceCommand+setDeviceId)
      * [.setParameters(newParameters)](#DeviceCommand+setParameters)
      * [.setLifetime(newLifetime)](#DeviceCommand+setLifetime)
      * [.setStatus(newStatus)](#DeviceCommand+setStatus)
      * [.setResult(newResult)](#DeviceCommand+setResult)
      * [.fetchCommandStatus()](#DeviceCommand+fetchCommandStatus) ⇒ `Http` ⇒ `Promise`
      * [.fetchCommandResult()](#DeviceCommand+fetchCommandResult) ⇒ `Http` ⇒ `Promise`
      * [.updateCommand()](#DeviceCommand+updateCommand) ⇒ `Http` ⇒ `Promise`
      * [.save()](#DeviceCommand+save) ⇒ `Http` ⇒ `Promise`
      * [.subscribeUpdates(subscriber)](#DeviceCommand+subscribeUpdates) ⇒ `Http` ⇒ `Promise`
  * [class DeviceNotification](#DeviceNotification)
    * [new DeviceNotification({ id, notification, deviceId, timestamp, parameters = null })](#new_DeviceNotification)
    * _instance_
      * [.getId()](#DeviceNotification+getId) ⇒ `String`
      * [.getNotification()](#DeviceNotification+getNotification) ⇒ `String`
      * [.getTimestamp()](#DeviceNotification+getTimestamp) ⇒ `String`
      * [.getDeviceId()](#DeviceNotification+getDeviceId) ⇒ `String`
      * [.getParameters()](#DeviceNotification+getParameters) ⇒ `Object`
  * [class Network](#Network)
    * [new Network({ id, name, description })](#new_Network)
    * _instance_
      * [.getId()](#Network+getId) ⇒ `Number`
      * [.getName()](#Network+getName) ⇒ `String`
      * [.getDescription()](#Network+getDescription) ⇒ `String`
      * [.setId(newId)](#Network+setId)
      * [.setName(newName)](#Network+setName)
      * [.setDescription(newDescription)](#Network+setDescription)
      * [.save()](#Network+save) ⇒ `Http` ⇒ `Promise`
      * [.listDevices()](#Network+listDevices) ⇒ `Http` ⇒ `Promise`
  * [class User](#User)
    * [new User({ id, login, role = 1, status = 0, lastLogin = null, data = null, password = null, oldPassword = null, introReviewed = false })](#new_User)
    * _instance_
      * [.getId()](#User+getId) ⇒ `String`
      * [.getLogin()](#User+getLogin) ⇒ `String`
      * [.getRole()](#User+getRole) ⇒ `Number`
      * [.getStatus()](#User+getStatus) ⇒ `Number`
      * [.getLastLogin()](#User+getLastLogin) ⇒ `String`
      * [.getData()](#User+getData) ⇒ `Object`
      * [.getPassword()](#User+getPassword) ⇒ `String`
      * [.getOldPassword()](#User+getOldPassword) ⇒ `String`
      * [.getIntroReviewed()](#User+getIntroReviewed) ⇒ `Boolean`
      * [.setId(newId)](#User+setId)
      * [.setLogin(newLogin)](#User+setLogin)
      * [.setRole(newRole)](#User+setRole)
      * [.setStatus(newStatus)](#User+setStatus)
      * [.setLastLogin(newLastLogin)](#User+setLastLogin)
      * [.setData(newData)](#User+setData)
      * [.setPassword(newPassword)](#User+setPassword)
      * [.setOldPassword(newOldPassword)](#User+setOldPassword)
      * [.setIntroReviewed(newIntroReviewed)](#User+setIntroReviewed)
      * [.save()](#User+save)
      * [.getNetworks()](#User+getNetworks) ⇒ `Http` ⇒ `Promise`
      * [.assignNetwork(networkId)](#User+assignNetwork) ⇒ `Http` ⇒ `Promise`
      * [.unassignNetwork(networkId)](#User+unassignNetwork) ⇒ `Http` ⇒ `Promise`

<a name="DeviceHive"></a>

## class DeviceHive

Public class accessable by default.

<a name="new_DeviceHive_login_password"></a>
### new DeviceHive({ serverURL, login, password}) ⇒ `Promise`
DeviceHive object constructor.
Here you need to specify server url, user login and password.

| Param | Type | Description |
| --- | --- | --- |
| serverURL | `String` | DeviceHive cloud API url |
| login | `String` | User's login |
| password | `String` | User's password |

Example:

```js
new DeviceHive({
   serverURL : `http://<host>:<port>/<path>`,
   login : `login`,
   password : `password`
})
```

<a name="new_DeviceHive_access_refresh"></a>
### new DeviceHive({ serverURL, accessToken, refreshToken}) ⇒ `Promise`
DeviceHive object constructor.
Here you need to specify server url, user access and refresh tokens.

| Param | Type | Description |
| --- | --- | --- |
| serverURL | `String` | DeviceHive cloud API url |
| accessToken | `String` | User's access token |
| refreshToken | `String` | User's refresh token |

Example:

```js
new DeviceHive({
   serverURL : `http://<host>:<port>/<path>`,
   accessToken : `accessToken`,
   refreshToken : `refreshToken`
})
```

<a name="new_DeviceHive_refresh_only"></a>
### new DeviceHive({ serverURL, refreshToken}) ⇒ `Promise`
DeviceHive object constructor.
Here you need to specify server url, user refresh token.
User access token will be requested by default.

| Param | Type | Description |
| --- | --- | --- |
| serverURL | `String` | DeviceHive cloud API url |
| refreshToken | `String` | User's refresh token |

Example:

```js
new DeviceHive({
   serverURL : `http://<host>:<port>/<path>`,
   accessToken : `accessToken`,
   refreshToken : `refreshToken`
})
```

<a name="DeviceHive+getInfo"></a>
### deviceHive.getInfo() ⇒ `Http` ⇒ `Promise`
Returns version of API, server timestamp and WebSocket base uri.

Example:

```js
new DeviceHive({
   serverURL : `http://<host>:<port>/<path>`,
   accessToken : `accessToken`,
   refreshToken : `refreshToken`
})
 .then(deviceHive => deviceHive.getInfo())
 .then(info => ...);
```

<a name="DeviceHive+getClusterInfo"></a>
### deviceHive.getClusterInfo() ⇒ `Http` ⇒ `Promise`
Returns information about cluster (Kafka, Zookeeper etc.)

Example:

```js
new DeviceHive({
   serverURL : `http://<host>:<port>/<path>`,
   accessToken : `accessToken`,
   refreshToken : `refreshToken`
})
.then(deviceHive => deviceHive.getClusterInfo())
.then(clusterInfo => ...)
```

<a name="DeviceHive+createToken"></a>
### deviceHive.createToken(userId, actions, networkIds, deviceIds, expiration) ⇒ `Http` ⇒ `Promise`
Authenticates by system params and returns a session-level JWT token.

| Param | Type | Description |
| --- | --- | --- |
| userId | `Number` | User id |
| actions | `[Strings]` | allowed actions |
| networkIds | `[Strings]` | accessable networks |
| deviceIds | `[Strings]` | accessable devices |
| expiration | `String` | expiration date |

Example:

```js
new DeviceHive({
   serverURL : `http://<host>:<port>/<path>`,
   accessToken : `accessToken`,
   refreshToken : `refreshToken`
})
.then(deviceHive => deviceHive.createToken(`userId`, [`actions`], [`networkIds`], [`deviceIds`], `expiration`))
.then(({ accessToken, refreshToken }) => ...)
```

<a name="DeviceHive+refreshToken"></a>
### deviceHive.refreshToken() ⇒ `Http` ⇒ `Promise`
Refresh JWT access token.

Example:

```js
new DeviceHive({
   serverURL : `http://<host>:<port>/<path>`,
   accessToken : `accessToken`,
   refreshToken : `refreshToken`
})
.then(deviceHive => deviceHive.refreshToken())
.then(({ accessToken }) => ...)
```

<a name="DeviceHive+getConfigurationProperty"></a>
### deviceHive.getConfigurationProperty(name) ⇒ `Http` ⇒ `Promise`
Returns requested property value

| Param | Type | Description |
| --- | --- | --- |
| name | `String` | Property name |

Example:

```js
new DeviceHive({
   serverURL : `http://<host>:<port>/<path>`,
   accessToken : `accessToken`,
   refreshToken : `refreshToken`
})
.then(deviceHive => deviceHive.getConfigurationProperty(`testName`))
.then(property => ...)
```

<a name="DeviceHive+setConfigurationProperty"></a>
### deviceHive.setConfigurationProperty(name, value) ⇒ `Http` ⇒ `Promise`
Creates new or updates existing property

| Param | Type | Description |
| --- | --- | --- |
| name | `String` | Property name |
| value | `String` | Property value |

Example:

```js
new DeviceHive({
   serverURL : `http://<host>:<port>/<path>`,
   accessToken : `accessToken`,
   refreshToken : `refreshToken`
})
.then(deviceHive => deviceHive.setConfigurationProperty(`testName`, `testValue`))
.then(() => ...)
```

<a name="DeviceHive+removeConfigurationProperty"></a>
### deviceHive.removeConfigurationProperty(name) ⇒ `Http` ⇒ `Promise`
Deletes property

| Param | Type | Description |
| --- | --- | --- |
| name | `String` | Property name |

Example:

```js
new DeviceHive({
   serverURL : `http://<host>:<port>/<path>`,
   accessToken : `accessToken`,
   refreshToken : `refreshToken`
})
.then(deviceHive => deviceHive.removeConfigurationProperty(`testName`))
.then(() => ...)
```
<a name="DeviceHive+listNetworks"></a>
### deviceHive.listNetworks(filter) ⇒ `Http` ⇒ `Promise`
Gets list of device networks the client has access to.

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>[NetworkFilter](#DeviceHive..NetworkFilter)</code> | network filter |

Example:

```js
new DeviceHive({
   serverURL : `http://<host>:<port>/<path>`,
   accessToken : `accessToken`,
   refreshToken : `refreshToken`
})
.then(deviceHive => deviceHive.listNetworks({/*params*/}))
.then(networks => ...)
```

<a name="DeviceHive+getNetwork"></a>
### deviceHive.getNetwork(networkId) ⇒ `Http` ⇒ `Promise`
Gets information about device network.

| Param | Type | Description |
| --- | --- | --- |
| networkId | `String` | network id |

Example:

```js
new DeviceHive({
   serverURL : `http://<host>:<port>/<path>`,
   accessToken : `accessToken`,
   refreshToken : `refreshToken`
})
.then(deviceHive => deviceHive.getNetwork(`testId`))
.then(network => ...)
```

<a name="DeviceHive+removeNetwork"></a>
### deviceHive.removeNetwork(networkId) ⇒ `Http` ⇒ `Promise`
Deletes an existing device network.

| Param | Type | Description |
| --- | --- | --- |
| networkId | `String` | network id |

Example:

```js
new DeviceHive({
   serverURL : `http://<host>:<port>/<path>`,
   accessToken : `accessToken`,
   refreshToken : `refreshToken`
})
.then(deviceHive => deviceHive.removeNetwork(`testId`))
.then(() => ...)
```

<a name="DeviceHive+createNetwork"></a>
### deviceHive.createNetwork(name, description) ⇒ `Http` ⇒ `Promise`
Creates new device network.

| Param | Type | Description |
| --- | --- | --- |
| name | `String` | network name |
| description | `Strings` | network description |

Example:

```js
new DeviceHive({
   serverURL : `http://<host>:<port>/<path>`,
   accessToken : `accessToken`,
   refreshToken : `refreshToken`
})
.then(deviceHive => deviceHive.createNetwork(`testName`, `testDescription`))
.then(createdNetwork => ...)
```

<a name="DeviceHive+listDevices"></a>
### deviceHive.listDevices(filter) ⇒ `Http` ⇒ `Promise`
Gets list of devices.

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>[DeviceFilter](#DeviceHive..DeviceFilter)</code> | search filter |

Example:

```js
new DeviceHive({
   serverURL : `http://<host>:<port>/<path>`,
   accessToken : `accessToken`,
   refreshToken : `refreshToken`
})
.then(deviceHive => deviceHive.listDevices())
.then(devices => ...)
```

<a name="DeviceHive+removeDevice"></a>
### deviceHive.removeDevice(id) ⇒ `Http` ⇒ `Promise`
Deletes an existing device.

| Param | Type | Description |
| --- | --- | --- |
| id | `String` | device unique identifier |

Example:

```js
new DeviceHive({
   serverURL : `http://<host>:<port>/<path>`,
   accessToken : `accessToken`,
   refreshToken : `refreshToken`
})
.then(deviceHive => deviceHive.removeDevice(`testId`))
.then(() => ...)
```

<a name="DeviceHive+getDevice"></a>
### deviceHive.getDevice(id) ⇒ `Http` ⇒ `Promise`
Gets information about device.

| Param | Type | Description |
| --- | --- | --- |
| id | `String` | device unique identifier |

Example:

```js
new DeviceHive({
   serverURL : `http://<host>:<port>/<path>`,
   accessToken : `accessToken`,
   refreshToken : `refreshToken`
})
.then(deviceHive => deviceHive.getDevice(`testId`))
.then(device => ...)
```

<a name="DeviceHive+putDevice"></a>
### deviceHive.putDevice(id, deviceParams) ⇒ `Http` ⇒ `Promise`
Registers or updates a device. For initial device registration, only 'name' property is required.

| Param | Type | Description |
| --- | --- | --- |
| id | `String` | device unique identifier |
| deviceParams | <code>[DeviceParams](#DeviceHive..DeviceParams)</code> | device params |

Example:

```js
new DeviceHive({
   serverURL : `http://<host>:<port>/<path>`,
   accessToken : `accessToken`,
   refreshToken : `refreshToken`
})
.then(deviceHive => deviceHive.putDevice(`testId`, {/*params*/}))
.then(() => ...)
```

<a name="DeviceHive+getCurrentUser"></a>
### deviceHive.getCurrentUser() ⇒ `Http` ⇒ `Promise`
Get information about the current user.

Example:

```js
new DeviceHive({
   serverURL : `http://<host>:<port>/<path>`,
   accessToken : `accessToken`,
   refreshToken : `refreshToken`
})
.then(deviceHive => deviceHive.getCurrentUser())
.then(user => ...)
```

<a name="DeviceHive+getUsers"></a>
### deviceHive.getUsers(filter) ⇒ `Http` ⇒ `Promise`
Gets list of users.

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>[UsersFilter](#DeviceHive..UsersFilter)</code> | users filter |

Example:

```js
new DeviceHive({
   serverURL : `http://<host>:<port>/<path>`,
   accessToken : `accessToken`,
   refreshToken : `refreshToken`
})
.then(deviceHive => deviceHive.getUsers({/*params*/}))
.then(users => ...)
```

<a name="DeviceHive+createUser"></a>
### deviceHive.createUser(userParams) ⇒ `Http` ⇒ `Promise`
Creates new user.

| Param | Type | Description |
| --- | --- | --- |
| userParams | <code>[UserParams](#DeviceHive..UserParams)</code> | user params |

Example:

```js
new DeviceHive({
   serverURL : `http://<host>:<port>/<path>`,
   accessToken : `accessToken`,
   refreshToken : `refreshToken`
})
.then(deviceHive => deviceHive.createUser({/*params*/}))
.then(createdUser => ...)
```

<a name="DeviceHive+removeUser"></a>
### deviceHive.removeUser(userId) ⇒ `Http` ⇒ `Promise`
Delete user.

| Param | Type | Description |
| --- | --- | --- |
| userId | `String` | user id |

Example:

```js
new DeviceHive({
   serverURL : `http://<host>:<port>/<path>`,
   accessToken : `accessToken`,
   refreshToken : `refreshToken`
})
.then(deviceHive => deviceHive.removeUser(`testId`))
.then(() => ...)
```

<a name="DeviceHive+subscribeCommands"></a>
### deviceHive.subscribeCommands(deviceIds, subscriber, commandFilter) ⇒ `Promise`
Allows subscribe for Commands to particular Devices with filter

| Param | Type | Description |
| --- | --- | --- |
| deviceIds | `[String]` | device ids |
| subscriber | `Function` | subscriber function |
| commandFilter | <code>[DeviceCommandPollFilter](#DeviceHive..DeviceCommandPollFilter)</code> | command filter |

Example:

```js
new DeviceHive({
   serverURL : `http://<host>:<port>/<path>`,
   accessToken : `accessToken`,
   refreshToken : `refreshToken`
})
.then(deviceHive => deviceHive.subscribeCommands([`testId1`, `testId2`], /*function (){}*/, /*filter*/))
```

<a name="DeviceHive+unsubscribeCommands"></a>
### deviceHive.unsubscribeCommands(deviceIds, commandFilter) ⇒ `Promise`
Allows unsubscribe from Commands to particular Devices with filter

| Param | Type | Description |
| --- | --- | --- |
| deviceIds | `[String]` | device ids |
| commandFilter | <code>[DeviceCommandPollFilter](#DeviceHive..DeviceCommandPollFilter)</code> | command filter |

Example:

```js
new DeviceHive({
   serverURL : `http://<host>:<port>/<path>`,
   accessToken : `accessToken`,
   refreshToken : `refreshToken`
})
.then(deviceHive => deviceHive.unsubscribeCommands([`testId1`, `testId2`], /*filter*/))
```

<a name="DeviceHive+subscribeNotifications"></a>
### deviceHive.subscribeNotifications(deviceIds, subscriber, notificationFilter) ⇒ `Promise`
Allows subscribe for Notifications to particular Devices with filter

| Param | Type | Description |
| --- | --- | --- |
| deviceIds | `[String]` | device ids |
| subscriber | `Function` | subscriber function |
| notificationFilter | <code>[DevicesNotificationPollFilter](#DeviceHive..DevicesNotificationPollFilter)</code> | command filter |

Example:

```js
new DeviceHive({
   serverURL : `http://<host>:<port>/<path>`,
   accessToken : `accessToken`,
   refreshToken : `refreshToken`
})
.then(deviceHive => deviceHive.subscribeNotifications([`testId1`, `testId2`], /*function (){}*/, /*filter*/))
```

<a name="DeviceHive+unsubscribeNotifications"></a>
### deviceHive.unsubscribeNotifications(deviceIds, notificationFilter) ⇒ `Promise`
Allows unsubscribe from Notifications to particular Devices with filter

| Param | Type | Description |
| --- | --- | --- |
| deviceIds | `[String]` | device ids |
| notificationFilter | <code>[DevicesNotificationPollFilter](#DeviceHive..DevicesNotificationPollFilter)</code> | command filter |

Example:

```js
new DeviceHive({
   serverURL : `http://<host>:<port>/<path>`,
   accessToken : `accessToken`,
   refreshToken : `refreshToken`
})
.then(deviceHive => deviceHive.unsubscribeNotifications([`testId1`, `testId2`], /*filter*/))
```

<a name="DeviceHive..NetworkFilter"></a>
### DeviceHive~NetworkFilter : `Object`

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | `String` | Filter by network name. |
| namePattern | `Strings` | Filter by network name pattern. |
| sortField | `Strings` | Result list sort field. |
| sortOrder | `Strings` | Result list sort order. |
| take | `Number` | Number of records to take from the result list. |
| skip | `Number` | Number of records to skip from the result list. |

<a name="DeviceHive..DeviceFilter"></a>
### DeviceHive~DeviceFilter : `Object`

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | `String` | filter by network name |
| namePattern | `String` | filter by network name pattern |
| networkId | `Number` | filter by associated network identifier |
| networkName | `String` | filter by associated network name
| sortField | `String` | result list sort field |
| sortOrder | `String` | result list sort order | 
| take | `Number` | number of records to take from the result list |
| skip | `Number` | number of records to skip from the result list |

<a name="DeviceHive..DeviceParams"></a>
### DeviceHive~DeviceParams : `Object`

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | `String` | device name |
| data | `String` | device data |
| networkId | `Number` | device network id |
| blocked | `Boolean` | device blocked state |

<a name="DeviceHive..UsersFilter"></a>
### DeviceHive~UsersFilter : `Object`

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| login | `String` | Filter by user login. |
| loginPattern | `String` | Filter by user login pattern. |
| role | `Number` | Filter by user role. 0 is Administrator, 1 is Client. |
| status | `Number` | Filter by user status. 0 is Active, 1 is Locked Out, 2 is Disabled. |
| sortField | `String` | Result list sort field. |
| sortOrder | `String` | Result list sort order. Available values are ASC and DESC. |
| take | `Number` | Number of records to take from the result list. |
| skip | `Number` | Number of records to skip from the result list. |

<a name="DeviceHive..DeviceCommandPollFilter"></a>
### DeviceHive~DeviceCommandPollFilter : `Object`

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| names | `String` | Command names |
| timestamp | `String` | Timestamp to start from |
| waitTimeout | `Number` | Wait timeout in seconds |
| limit | `Number` | Limit number of commands |

<a name="DeviceHive..DevicesNotificationPollFilter"></a>
### DeviceHive~DevicesNotificationPollFilter : `Object`

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| waitTimeout | `Number` | Wait timeout in seconds |
| names | `String` | Notification names |
| timestamp | `String` | Timestamp to start from |

<a name="Device"></a>

## class Device

Private class, only DeviceHive instance have access to it.

<a name="new_Device"></a>
### new Device({ id, name = id, data = null, networkId = null, isBlocked = false })
ONLY FOR DEVELOPMENT.

Device object constructor.
Here you need to specify Device specific data.

| Param | Type | Description |
| --- | --- | --- |
| id | `String` | Device's id |
| name | `String` | Device's name. Equals to `id` by default |
| data | `String | Object` | Device's data. Equals to `null` by default |
| networkId | `Number` | Device's Network id. Equals to `null` by default |
| isBlocked | `Boolean` | Device's blocked status. Equals to `false` by default |

Example:

```js
new Device({
   id : `testId`,
   name : `testName`,
   data : {/*some data*/},
   networkId : 12345,
   isBlocked : false
})
```

<a name="Device+getId"></a>
### Device.getId() ⇒ `String`
Returns Device's id.

Example:

```js
deviceInstance.getId()
.then(/*testId*/ => ...)
```

<a name="Device+getName"></a>
### Device.getName() ⇒ `String`
Returns Device's name.

Example:

```js
deviceInstance.getName()
.then(/*testName*/ => ...)
```

<a name="Device+getData"></a>
### Device.getData() ⇒ `Object`
Returns Device's data.

Example:

```js
deviceInstance.getData()
.then(/*{some data}*/ => ...)
```

<a name="Device+getNetworkId"></a>
### Device.getNetworkId() ⇒ `Number`
Returns Device's Network id.

Example:

```js
deviceInstance.getNetworkId()
.then(/*12345*/ => ...)
```

<a name="Device+getBlocked"></a>
### Device.getBlocked() ⇒ `String`
Returns Device's blocked state.

Example:

```js
deviceInstance.getBlocked()
.then(/*false*/ => ...)
```

<a name="Device+setId"></a>
### Device.setId(newId)
Sets Device's id.

| Param | Type | Description |
| --- | --- | --- |
| newId | `String` | Device's new id |

Example:

```js
deviceInstance.setId(`newId`);
deviceInstance...
```

<a name="Device+setName"></a>
### Device.setName(newName)
Sets Device's name.

| Param | Type | Description |
| --- | --- | --- |
| newName | `String` | Device's new name |

Example:

```js
deviceInstance.setName(`newName`);
deviceInstance...
```

<a name="Device+setData"></a>
### Device.setData(newData)
Sets Device's data.

| Param | Type | Description |
| --- | --- | --- |
| newData | `Object` | Device's new data |

Example:

```js
deviceInstance.setData({/*newData*/});
deviceInstance...
```

<a name="Device+setNetworkId"></a>
### Device.setNetworkId(newNetworkId)
Sets Device's Network id.

| Param | Type | Description |
| --- | --- | --- |
| newNetworkId | `Number` | Device's new Network id |

Example:

```js
deviceInstance.setNetworkId(67890);
deviceInstance...
```

<a name="Device+setBlocked"></a>
### Device.setBlocked(newBlocked)
Sets Device's blocked status.

| Param | Type | Description |
| --- | --- | --- |
| newBlocked | `Boolean` | Device's new blocked status |

Example:

```js
deviceInstance.seBlocked(true);
deviceInstance...
```

<a name="Device+save"></a>
### Device.save()
Saves Device's state

Example:

```js
deviceInstance.save()
.then(() => ...)
```

<a name="Device+getCommands"></a>
### Device.getCommands(filter)
Gets list of Commands that has been received in specified time range.

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>[DeviceCommandsFilter](#Device..DeviceCommandsFilter)</code> | Device's Command filter |

Example:

```js
deviceInstance.getCommands({/*filter*/})
.then(commands => ...)
```

<a name="Device+getNotifications"></a>
### Device.getNotifications(filter)
Returns Notifications by provided parameters

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>[DeviceNotificationsFilter](#Device..DeviceNotificationsFilter)</code> | Device's Notification filter |

Example:

```js
deviceInstance.getNotifications({/*filter*/})
.then(notifications => ...)
```

<a name="Device+sendCommand"></a>
### Device.sendCommand(command, parameters, updateSubscriber)
Creates new Device's Command, stores and returns Command with generated id.

Also allows to pass callback for subscription on Command's updates.

| Param | Type | Description |
| --- | --- | --- |
| command | `String` | Command's name |
| parameters | <code>[CommandParams](#Device..CommandParams)</code> | Device's Command parameters |
| updateSubscriber | `Function` | Command's on update subscriber |

Example:

```js
deviceInstance.sendCommand(`testName`, {/*test command parameters*/}, /*function(){}*/)
```

<a name="Device+sendNotification"></a>
### Device.sendNotification(notification, parameters)
Creates Notification.

| Param | Type | Description |
| --- | --- | --- |
| notification | `String` | Notification's name |
| parameters | <code>[NotificationParams](#Device..NotificationParams)</code> | Device's Notification parameters |

Example:

```js
deviceInstance.sendNotification(`testName`, {/*test notification parameters*/})
```

<a name="Device+subscribeCommands"></a>
### Device.subscribeCommands(subscriber, commandFilter)
Subscribes to all Commands for this Device by particular filter.

| Param | Type | Description |
| --- | --- | --- |
| subscriber | `Function` | Command's subscriber |
| commandFilter | <code>[CommandPollParams](#Device..CommandPollParams)</code> | Device's Command filter |

Example:

```js
deviceInstance.subscribeCommands(/*function(){}*/, {/*test command parameters*/})
.then(() => ...)
```

<a name="Device+unsubscribeCommands"></a>
### Device.unsubscribeCommands(commandFilter)
Unsubscribe from this Device's Commands by particular filter

| Param | Type | Description |
| --- | --- | --- |
| commandFilter | <code>[CommandPollParams](#Device..CommandPollParams)</code> | Device's Command filter |

Example:

```js
deviceInstance.unsubscribeCommands({/*test command parameters*/})
.then(() => ...)
```

<a name="Device+subscribeNotifications"></a>
### Device.subscribeCommands(subscriber, notificationFilter)
Subscribes to all Notifications for this Device by particular filter.

| Param | Type | Description |
| --- | --- | --- |
| subscriber | `Function` | Command's subscriber |
| notificationFilter | <code>[NotificationPollParams](#Device..NotificationPollParams)</code> | Device's Notification filter |

Example:

```js
deviceInstance.subscribeNotifications(/*function(){}*/, {/*test notification parameters*/})
.then(() => ...)
```

<a name="Device+unsubscribeNotifications"></a>
### Device.unsubscribeNotifications(notificationFilter)
Unsubscribe from this Device's Notifications by particular filter

| Param | Type | Description |
| --- | --- | --- |
| notificationFilter | <code>[NotificationPollParams](#Device..NotificationPollParams)</code> | Device's Notification filter |

Example:

```js
deviceInstance.unsubscribeNotifications({/*test notification parameters*/})
.then(() => ...)
```

<a name="Device..DeviceCommandsFilter"></a>
### Device~DeviceCommandsFilter : `Object`

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| start | `String` | Start timestamp |
| end | `String` | End timestamp |
| command | `String` | Command name |
| status | `String` | Command status |
| sortField | `String` | Sort field |
| sortOrder | `String` | Sort order |
| take | `Number` | Limit param |
| skip | `Number` | Skip param |

<a name="Device..DeviceNotificationsFilter"></a>
### Device~DeviceNotificationsFilter : `Object`

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| start | `String` | Start timestamp |
| end | `String` | End timestamp |
| notification | `String` | Notification name |
| sortField | `String` | Sort field |
| sortOrder | `String` | Sort order |
| take | `Number` | Limit param |
| skip | `Number` | Skip param |

<a name="Device..CommandParams"></a>
### Device~CommandParams : `Object`

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| command | `String` | command name |
| timestamp | `String` | command timestamp |
| parameters | `String` | command parameters |
| lifetime | `Number` | command lifetime |
| status | `String` | command status |
| result | `String` | command result |

<a name="Device..NotificationParams"></a>
### Device~NotificationParams : `Object`

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| timestamp | `String` | notification timestamp |
| parameters | `String` | notification parameters |

<a name="Device..CommandPollParams"></a>
### Device~CommandPollParams : `Object`

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| names | `String` | Command names |
| timestamp | `String` | Timestamp to start from |
| waitTimeout | `Number` | Wait timeout in seconds |
| limit | `Number` | Limit number of commands |

<a name="Device..NotificationPollParams"></a>
### Device~NotificationPollParams : `Object`

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| waitTimeout | `Number` | Wait timeout |
| timestamp | `String` | Timestamp to start from |
| names | `String` | Notification names |

<a name="DeviceCommand"></a>
## class DeviceCommand

Private class, only DeviceHive instance have access to it.

<a name="new_DeviceCommand"></a>
### new DeviceCommand({ id, command, timestamp, userId, deviceId, parameters = null, lifetime = 0, status = null, result = null })
ONLY FOR DEVELOPMENT.

Device Command object constructor.
Here you need to specify Command specific data.

| Param | Type | Description |
| --- | --- | --- |
| id | `String` | Command's id |
| command | `String` | Command's name |
| timestamp | `String` | Command's timestamp |
| userId | `String` | Command's User id |
| deviceId | `String` | Command's Device id |
| parameters | `String | Object` | Command's parameters. Equals `null` by default |
| lifetime | `Number` | Command's lifetime. Equals `0` by default |
| status | `String` | Command's status. Equals `null` by default |
| result | `String` | Command's result. Equals `null` by default |

Example:

```js
new DeviceCommand({
   id : `testId`,
   command : `testName`,
   timestamp : `123456789`,
   userId : `qwerty`,
   deviceId : `deadbeef`,
   parameters : {/*test parameters*/},
   lifetime : 12345,
   status : `testStatus`,
   result : `testResult`
})
```

<a name="DeviceCommand+getId"></a>
### DeviceCommand.getId() ⇒ `String`
Returns Command's id.

Example:

```js
deviceCommandInstance.getId()
.then(/*testId*/ => ...)
```

<a name="DeviceCommand+getCommand"></a>
### DeviceCommand.getCommand() ⇒ `String`
Returns Command's name.

Example:

```js
deviceCommandInstance.getCommand()
.then(/*testName*/ => ...)
```

<a name="DeviceCommand+getTimestamp"></a>
### DeviceCommand.getTimestamp() ⇒ `String`
Returns Command's timestamp.

Example:

```js
deviceCommandInstance.getTimestamp()
.then(/*123456789*/ => ...)
```

<a name="DeviceCommand+getUserId"></a>
### DeviceCommand.getUserId() ⇒ `String`
Returns Command's User id.

Example:

```js
deviceCommandInstance.getUserId()
.then(/*qwerty*/ => ...)
```

<a name="DeviceCommand+getDeviceId"></a>
### DeviceCommand.getDeviceId() ⇒ `String`
Returns Command's Device id.

Example:

```js
deviceCommandInstance.getDeviceId()
.then(/*deadbeef*/ => ...)
```

<a name="DeviceCommand+getParameters"></a>
### DeviceCommand.getParameters() ⇒ `Object`
Returns Command's parameters.

Example:

```js
deviceCommandInstance.getParameters()
.then(/*{test parameters}*/ => ...)
```

<a name="DeviceCommand+getLifetime"></a>
### DeviceCommand.getLifetime() ⇒ `Number`
Returns Command's lifetime.

Example:

```js
deviceCommandInstance.getLifetime()
.then(/*12345*/ => ...)
```

<a name="DeviceCommand+getStatus"></a>
### DeviceCommand.getStatus() ⇒ `String`
Returns Command's status.

Example:

```js
deviceCommandInstance.getStatus()
.then(/*testStatus*/ => ...)
```

<a name="DeviceCommand+getResult"></a>
### DeviceCommand.getResult() ⇒ `String`
Returns Command's result.

Example:

```js
deviceCommandInstance.getResult()
.then(/*testResult*/ => ...)
```

<a name="DeviceCommand+setId"></a>
### DeviceCommand.setId(newId)
Sets Command's id.

| Param | Type | Description |
| --- | --- | --- |
| newId | `String` | Command's new id |

Example:

```js
deviceCommandInstance.setId(`newId`);
deviceCommandInstance...
```

<a name="DeviceCommand+setCommand"></a>
### DeviceCommand.setCommand(newCommand)
Sets Command's name.

| Param | Type | Description |
| --- | --- | --- |
| newCommand | `String` | Command's new name |

Example:

```js
deviceCommandInstance.setCommand(`newCommand`);
deviceCommandInstance...
```

<a name="DeviceCommand+setTimestamp"></a>
### DeviceCommand.setTimestamp(newTimestamp)
Sets Command's timestamp.

| Param | Type | Description |
| --- | --- | --- |
| newTimestamp | `String` | Command's new timestamp |

Example:

```js
deviceCommandInstance.setTimestamp(`newTimestamp`);
deviceCommandInstance...
```

<a name="DeviceCommand+setUserId"></a>
### DeviceCommand.setUserId(newUserId)
Sets Command's User id.

| Param | Type | Description |
| --- | --- | --- |
| newUserId | `String` | Command's new User id |

Example:

```js
deviceCommandInstance.setUserId(`newUserId`);
deviceCommandInstance...
```

<a name="DeviceCommand+setDeviceId"></a>
### DeviceCommand.setDeviceId(newDeviceId)
Sets Command's Device id.

| Param | Type | Description |
| --- | --- | --- |
| newDeviceId | `String` | Command's new Device id |

Example:

```js
deviceCommandInstance.setDeviceId(`newDeviceId`);
deviceCommandInstance...
```

<a name="DeviceCommand+setParameters"></a>
### DeviceCommand.setParameters(newParameters)
Sets Command's parameters.

| Param | Type | Description |
| --- | --- | --- |
| newParameters | `Object` | Command's new parameters |

Example:

```js
deviceCommandInstance.setParameters({/*new parameters*/});
deviceCommandInstance...
```

<a name="DeviceCommand+setLifetime"></a>
### DeviceCommand.setLifetime(newLifetime)
Sets Command's lifetime.

| Param | Type | Description |
| --- | --- | --- |
| newLifetime | `Number` | Command's new lifetime |

Example:

```js
deviceCommandInstance.setLifetime(67890);
deviceCommandInstance...
```

<a name="DeviceCommand+setStatus"></a>
### DeviceCommand.setStatus(newStatus)
Sets Command's status.

| Param | Type | Description |
| --- | --- | --- |
| newStatus | `String` | Command's new status |

Example:

```js
deviceCommandInstance.setStatus(`newStatus`);
deviceCommandInstance...
```

<a name="DeviceCommand+setResult"></a>
### DeviceCommand.setResult(newResult)
Sets Command's result.

| Param | Type | Description |
| --- | --- | --- |
| newResult | `String` | Command's new result |

Example:

```js
deviceCommandInstance.setResult(`newResult`);
deviceCommandInstance...
```

<a name="DeviceCommand+fetchCommandStatus"></a>
### DeviceCommand.fetchCommandStatus()
Returns Command's status. 

If status was updated updates current command on the fly.

Example:

```js
deviceCommandInstance.fetchCommandStatus()
.then(newStatus => ...)
```

<a name="DeviceCommand+fetchCommandResult"></a>
### DeviceCommand.fetchCommandResult()
Returns Command's result. 

If status was updated updates current command on the fly.

Example:

```js
deviceCommandInstance.fetchCommandResult()
.then(newResult => ...)
```

<a name="DeviceCommand+updateCommand"></a>
### DeviceCommand.updateCommand()
Requests current Command update

Example:

```js
deviceCommandInstance.updateCommand()
.then(updatedCommand => ...)
```

<a name="DeviceCommand+save"></a>
### DeviceCommand.save()
Save current Command's state.

Example:

```js
deviceCommandInstance.save()
.then(() => ...)
```

<a name="DeviceCommand+subscribeUpdates"></a>
### DeviceCommand.subscribeUpdates(subscriber)
Allow subscription for result updates from server

| Param | Type | Description |
| --- | --- | --- |
| subscriber | `Function` | Command's updates subscriber |

Example:

```js
deviceCommandInstance.subscribeUpdates(/*function(){}*/)
```

<a name="DeviceNotification"></a>
## class DeviceNotification

Private class, only DeviceHive instance have access to it.

<a name="new_DeviceNotification"></a>
### new DeviceNotification({ id, notification, deviceId, timestamp, parameters = null })
ONLY FOR DEVELOPMENT.

Device Notification object constructor.
Here you need to specify Notification specific data.

| Param | Type | Description |
| --- | --- | --- |
| id | `String` | Notification's id |
| notification | `String` | Notification's name |
| timestamp | `String` | Notification's timestamp |
| deviceId | `String` | Notification's Device id |
| parameters | `String | Object` | Command's parameters. Equals `null` by default |

Example:

```js
new DeviceNotification({
   id : `testId`,
   notification : `testName`,
   timestamp : `123456789`,
   deviceId : `deadbeef`,
   parameters : {/*test parameters*/}
})
```

<a name="DeviceNotification+getId"></a>
### DeviceNotification.getId() ⇒ `String`
Returns Notification's id.

Example:

```js
deviceNotificationInstance.getId()
.then(/*testId*/ => ...)
```

<a name="DeviceNotification+getNotification"></a>
### DeviceNotification.getNotification() ⇒ `String`
Returns Notification's name.

Example:

```js
deviceNotificationInstance.getNotification()
.then(/*testName*/ => ...)
```

<a name="DeviceNotification+getTimestamp"></a>
### DevieNotification.getTimestamp() ⇒ `String`
Returns Notification's timestamp.

Example:

```js
deviceNotificationInstance.getTimestamp()
.then(/*123456789*/ => ...)
```

<a name="DeviceNotification+getDeviceId"></a>
### DeviceNotification.getDeviceId() ⇒ `String`
Returns Notification's Device id.

Example:

```js
deviceNotificationInstance.getDeviceId()
.then(/*deadbeef*/ => ...)
```

<a name="DeviceNotification+getParameters"></a>
### DeviceNotification.getParameters() ⇒ `Object`
Returns Notification's parameters.

Example:

```js
deviceNotificationInstance.getParameters()
.then(/*{test parameters}*/ => ...)
```

<a name="Network"></a>
## class Network

Private class, only DeviceHive instance have access to it.

<a name="new_Network"></a>
### new Network({ id, name, description })
ONLY FOR DEVELOPMENT.

Network object constructor.
Here you need to specify Network specific data.

| Param | Type | Description |
| --- | --- | --- |
| id | `Number` | Network's id |
| name | `String` | Network's name |
| description | `String` | Network's description |

Example:

```js
new Network({
   id : 12345,
   name : `testName`,
   description : `testDescription`
})
```

<a name="Network+getId"></a>
### Network.getId() ⇒ `Number`
Returns Network's id.

Example:

```js
networkInstance.getId()
.then(/*12345*/ => ...)
```

<a name="Network+getName"></a>
### Network.getName() ⇒ `String`
Returns Network's name.

Example:

```js
networkInstance.getName()
.then(/*testName*/ => ...)
```

<a name="Network+getDescription"></a>
### Network.getDescription() ⇒ `String`
Returns Network's description.

Example:

```js
networkInstance.getDescription()
.then(/*testDescription*/ => ...)
```

<a name="Network+setId"></a>
### Network.setId(newId)
Sets Network's id.

| Param | Type | Description |
| --- | --- | --- |
| newId | `Number` | Network's new id |

Example:

```js
networkInstance.setId(67890);
networkInstance...
```

<a name="Network+setName"></a>
### Network.setId(newName)
Sets Network's name.

| Param | Type | Description |
| --- | --- | --- |
| newName | `String` | Network's new name |

Example:

```js
networkInstance.setName(`newName`);
networkInstance...
```

<a name="Network+setDescription"></a>
### Network.setDescription(newDescription)
Sets Network's description.

| Param | Type | Description |
| --- | --- | --- |
| newDescription | `String` | Network's new description |

Example:

```js
networkInstance.setDescription(`newDescription`);
networkInstance...
```

<a name="Network+save"></a>
### Network.save()
Save current Network state.

Example:

```js
networkInstance.save()
.then(() => ...)
```

<a name="Network+listDevices"></a>
### Network.listDevices()
Get current Network Device list

Example:

```js
networkInstance.listDevices()
.then(devices => ...)
```

<a name="User"></a>
## class User

Private class, only DeviceHive instance have access to it.

<a name="new_User"></a>
### new User({ id, login, role = 1, status = 0, lastLogin = null, data = null, password = null, oldPassword = null, introReviewed = false })
ONLY FOR DEVELOPMENT.

User object constructor.
Here you need to specify User specific data.

| Param | Type | Description |
| --- | --- | --- |
| id | `String` | User's id |
| login | `String` | User's login |
| role | `Number` | User's role. Equals `1` by default. |
| status | `Number` | User's status. Equals `0` by default. |
| lastLogin | `String` | User's last login. Equals `null` by default |
| data | `Object` | User's data. Equals `null` by default |
| password | `String` | User's password. Equals `null` by default |
| oldPassword | `String` | User's old password. Equals `null` by default |
| introReviewed | `Boolean` | User's intro reviewed state. Equals `false` by default 

Example:

```js
new User({
   id : `testId`,
   login : `testLogin`,
   role : 12345,
   status : 6789,
   lastLogin : `testLastLogin`,
   data : {/*test data*/},
   password : `testPassword`,
   oldPassword : `testOldPassword`,
   introReviewed : false
})
```

<a name="User+getId"></a>
### User.getId() ⇒ `String`
Returns User's id.

Example:

```js
userInstance.getId()
.then(/*testId*/ => ...)
```

<a name="User+getLogin"></a>
### User.getLogin() ⇒ `String`
Returns User's login.

Example:

```js
userInstance.getLogin()
.then(/*testLogin*/ => ...)
```

<a name="User+getRole"></a>
### User.getRole() ⇒ `Number`
Returns User's role.

Example:

```js
userInstance.getRole()
.then(/*12345*/ => ...)
```

<a name="User+getStatus"></a>
### User.getStatus() ⇒ `Number`
Returns User's status.

Example:

```js
userInstance.getStatus()
.then(/*6789*/ => ...)
```

<a name="User+getLastLogin"></a>
### User.getLastLogin() ⇒ `String`
Returns User's last login.

Example:

```js
userInstance.getLastLogin()
.then(/*testLastLogin*/ => ...)
```

<a name="User+getData"></a>
### User.getData() ⇒ `Object`
Returns User's data.

Example:

```js
userInstance.getData()
.then(({/*test data*/}) => ...)
```

<a name="User+getPassword"></a>
### User.getPassword() ⇒ `String`
Returns User's password.

Example:

```js
userInstance.getPassword()
.then(/*testPassword*/ => ...)
```

<a name="User+getOldPassword"></a>
### User.getOldPassword() ⇒ `String`
Returns User's old password.

Example:

```js
userInstance.getOldPassword()
.then(/*testPassword*/ => ...)
```

<a name="User+getIntroReviewed"></a>
### User.getIntroReviewed() ⇒ `Boolean`
Returns User's intro reviewed.

Example:

```js
userInstance.getIntroReviewed()
.then(/*false*/ => ...)
```

<a name="User+setId"></a>
### User.setId(newId)
Sets User's id.

| Param | Type | Description |
| --- | --- | --- |
| newId | `String` | User's new id |

Example:

```js
userInstance.setId(`newId`)
userInstance...
```

<a name="User+setLogin"></a>
### User.setLogin(newLogin)
Sets User's login.

| Param | Type | Description |
| --- | --- | --- |
| newLogin | `String` | User's new login |

Example:

```js
userInstance.setLogin(`newLogin`)
userInstance...
```

<a name="User+setRole"></a>
### User.setRole(newRole)
Sets User's role.

| Param | Type | Description |
| --- | --- | --- |
| newRole | `Number` | User's new role |

Example:

```js
userInstance.setRole(6789)
```

<a name="User+setStatus"></a>
### User.setStatus(newStatus)
Sets User's status.

| Param | Type | Description |
| --- | --- | --- |
| newStatus | `Number` | User's new status |

Example:

```js
userInstance.setStatus(12345)
userInstance...
```

<a name="User+setLastLogin"></a>
### User.setLastLogin(newLastLogin)
Sets User's last login.

| Param | Type | Description |
| --- | --- | --- |
| newLastLogin | `String` | User's new last login |

Example:

```js
userInstance.setLastLogin(`newLastLogin`)
userInstance...
```

<a name="User+setData"></a>
### User.setData(newData)
Sets User's data.

| Param | Type | Description |
| --- | --- | --- |
| newData | `Object` | User's new data |

Example:

```js
userInstance.setData({/*new data*/})
userInstance...
```

<a name="User+setPassword"></a>
### User.setPassword(newPassword)
Sets User's password.

| Param | Type | Description |
| --- | --- | --- |
| newPassword | `String` | User's new password |

Example:

```js
userInstance.setPassword(`newPassword`)
userInstance...
```

<a name="User+setOldPassword"></a>
### User.setOldPassword(newOldPassword)
Sets User's old password.

| Param | Type | Description |
| --- | --- | --- |
| newOldPassword | `String` | User's new old password |

Example:

```js
userInstance.setOldPassword(`newOldPassword`)
userInstance...
```

<a name="User+setIntroReviewed"></a>
### User.setIntroReviewed(newIntroReviewed)
Sets User's intro reviewed.

| Param | Type | Description |
| --- | --- | --- |
| newIntroReviewed | `Boolean` | User's new intro reviewed |

Example:

```js
userInstance.setIntroReviewed(true)
userInstance...
```

<a name="User+save"></a>
### User.save()
Saves current User's state

Example:

```js
userInstance.save()
.then(() => ...)
```

<a name="User+getNetworks"></a>
### User.getNetworks()
Returns User's networks

Example:

```js
userInstance.getNetworks()
.then(networks => ...)
```

<a name="User+assignNetwork"></a>
### User.assignNetwork(networkId)
Assign Network to User

| Param | Type | Description |
| --- | --- | --- |
| networkId | `Number` | Network's id to assign |

Example:

```js
userInstance.assignNetwork(12345)
.then(() => ...)
```

<a name="User+unassignNetwork"></a>
### User.unassignNetwork(networkId)
Unassing Network from User

| Param | Type | Description |
| --- | --- | --- |
| networkId | `Number` | Network's id to unassign |

Example:

```js
userInstance.unassignNetwork(12345)
.then(() => ...)
```

## Development

It's quite easy to add more functionality to Rest library. Check `utils.js` file for info about sending request to API with proper params.

## License

[DeviceHive] is developed by [DataArt] Apps and distributed under Open Source
[Apache 2.0 license](https://en.wikipedia.org/wiki/Apache_License). 

## Creators

* [Nikita Liashenko](https://github.com/NikitaLiashenko)
* [Nikolay Khabarov](https://github.com/Nikolay-Kha)

© Copyright 2017 [DataArt] Apps © All Rights Reserved
