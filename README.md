# devicehive-node

## Synopsis

DeviceHive Node Library

#THIS LIBRARY IS STILL IN DEVELOPMENT.

## Installation
Package is published in npm - https://www.npmjs.com/package/devicehive

NPM >= 5.0.0

`npm i devicehive`

NPM < 5.0.0

`npm i -S devicehive`

## API Reference

### DHNode

* [DHNode](#DHNode)
  * [new DHNode.rest(serverURL, jwtToken)](#new_DHNode_rest)
  * _instance_
    * [.getInfo()](#DHNode+getInfo) ⇒ `Http` ⇒ `Promise`
    * [.getInfoConfigCluster()](#DHNode+getInfoConfigCluster) ⇒ `Http` ⇒ `Promise`
    * [.getConfiguration(name)](#DHNode+getConfiguration) ⇒ `Http` ⇒ `Promise`
    * [.saveConfiguration(name, propertyBody)](#DHNode+saveConfiguration) ⇒ `Http` ⇒ `Promise`
    * [.deleteConfiguration(name)](#DHNode+deleteConfiguration) ⇒ `Http` ⇒ `Promise`
    * [.getDevices(filter)](#DHNode+getDevices) ⇒ `Http` ⇒ `Promise`
    * [.getDevice(id)](#DHNode+getDevice) ⇒ `Http` ⇒ `Promise`
    * [.saveDevice(id, deviceParams)](#DHNode+saveDevice) ⇒ `Http` ⇒ `Promise`
    * [.deleteDevice(id)](#DHNode+deleteDevice) ⇒ `Http` ⇒ `Promise`
    * [.getDevicesCommandPoll(filter)](#DHNode+getDevicesCommandPoll) ⇒ `Http` ⇒ `Promise`
    * [.getDeviceCommands(id, filter)](#DHNode+getDeviceCommands) ⇒ `Http` ⇒ `Promise`
    * [.createDeviceCommand(id, commandParams)](#DHNode+createDeviceCommand) ⇒ `Http` ⇒ `Promise`
    * [.getDeviceCommandsPoll(id, pollParams)](#DHNode+getDeviceCommandsPoll) ⇒ `Http` ⇒ `Promise`
    * [.getCommand(deviceId, commandId)](#DHNode+getCommand) ⇒ `Http` ⇒ `Promise`
    * [.updateCommand(deviceId, commandId, commandParams)](#DHNode+updateCommand) ⇒ `Http` ⇒ `Promise`
    * [.getDeviceCommandPoll(deviceId, commandId, waitTimeout)](#DHNode+getDeviceCommandPoll) ⇒ `Http` ⇒ `Promise`
    * [.getDevicesNotificationsPoll(pollParams)](#DHNode+getDevicesNotificationsPoll) ⇒ `Http` ⇒ `Promise`
    * [.getDeviceNotifications(deviceId, filter)](#DHNode+getDeviceNotifications) ⇒ `Http` ⇒ `Promise`
    * [.createDeviceNotification(deviceId, notification)](#DHNode+createDeviceNotification) ⇒ `Http` ⇒ `Promise`
    * [.getDeviceNotificationPoll(deviceId, filter)](#DHNode+getDeviceNotificationPoll) ⇒ `Http` ⇒ `Promise`
    * [.getDeviceNotification(deviceId, notificationId)](#DHNode+getDeviceNotification) ⇒ `Http` ⇒ `Promise`
    * [.createTokenByLoginInfo(loginInfo)](#DHNode+createTokenByLoginInfo) ⇒ `Http` ⇒ `Promise`
    * [.createTokenBySystemParams(systemParams)](#DHNode+createTokenBySystemParams) ⇒ `Http` ⇒ `Promise`
    * [.refreshToken(refreshToken)](#DHNode+refreshToken) ⇒ `Http` ⇒ `Promise`
    * [.getNetworks(filter)](#DHNode+getNetworks) ⇒ `Http` ⇒ `Promise`
    * [.createNetwork(networkParams)](#DHNode+createNetwork) ⇒ `Http` ⇒ `Promise`
    * [.getNetwork(networkId)](#DHNode+getNetwork) ⇒ `Http` ⇒ `Promise`
    * [.updateNetwork(networkId, networkParams)](#DHNode+updateNetwork) ⇒ `Http` ⇒ `Promise`
    * [.deleteNetwork(networkId)](#DHNode+deleteNetwork) ⇒ `Http` ⇒ `Promise`
    * [.getUsers(filter)](#DHNode+getUsers) ⇒ `Http` ⇒ `Promise`
    * [.createUser(userParams)](#DHNode+createUser) ⇒ `Http` ⇒ `Promise`
    * [.getCurrentUser()](#DHNode+getCurrentUser) ⇒ `Http` ⇒ `Promise`
    * [.updateCurrentUser(userParams)](#DHNode+updateCurrentUser) ⇒ `Http` ⇒ `Promise`
    * [.getUser(userId)](#DHNode+getUser) ⇒ `Http` ⇒ `Promise`
    * [.updateUser(userId, userParams)](#DHNode+updateUser) ⇒ `Http` ⇒ `Promise`
    * [.deleteUser(userId)](#DHNode+deleteUser) ⇒ `Http` ⇒ `Promise`
    * [.getUsersNetwork(userId, networkId)](#DHNode+getUsersNetwork) ⇒ `Http` ⇒ `Promise`
    * [.addUsersNetwork(userId, networkId)](#DHNode+addUsersNetwork) ⇒ `Http` ⇒ `Promise`
    * [.deleteUsersNetwork(userId, networkId)](#DHNode+deleteUsersNetwork) ⇒ `Http` ⇒ `Promise`
  * _inner_
    * [~DeviceFilter](#DHNode..DeviceFilter) : `Object`
    * [~DeviceParams](#DHNode..DeviceParams) : `Object`
    * [~DevicePollFilter](#DHNode..DevicePollFilter) : `Object`
    * [~DeviceCommandsFilter](#DHNode..DeviceCommandsFilter) : `Object`
    * [~CommandParams](#DHNode..CommandParams) : `Object`
    * [~PollParams](#DHNode..PollParams) : `Object`
    * [~DevicesNotificationPollParams](#DHNode..DevicesNotificationPollParams) : `Object`
    * [~DeviceNotificationsFilter](#DHNode..DeviceNotificationsFilter) : `Object`
    * [~DeviceNotification](#DHNode..DeviceNotification) : `Object`
    * [~DeviceNotificationPollFilter](#DHNode..DeviceNotificationPollFilter) : `Object`
    * [~LoginInfo](#DHNode..LoginInfo) : `Object`
    * [~SystemParams](#DHNode..SystemParams) : `Object`
    * [~NetworkFilter](#DHNode..NetworkFilter) : `Object`
    * [~NetworkParams](#DHNode..NetworkParams) : `Object`
    * [~NetworkUpdateParams](#DHNode..NetworkUpdateParams) : `Object`
    * [~UsersFilter](#DHNode..UsersFilter) : `Object`
    * [~UserParams](#DHNode..UserParams) : `Object`

<a name="new_DHNode_rest"></a>
### new DHNode.rest(serverURL, jwtToken)
DHNode Rest object constructor
specify server URL and jwt token

| Param | Type | Description |
| --- | --- | --- |
| serverURL | `String` | DeviceHive cloud API url |
| jwtToken | `String` | User's jwt token |

<a name="DHNode+getInfo"></a>
### dhNode.getInfo() ⇒ `Http` ⇒ `Promise`
Returns version of API, server timestamp and WebSocket base uri

<a name="DHNode+getInfoConfigCluster"></a>
### dhNode.getInfoConfigCluster() ⇒ `Http` ⇒ `Promise`
Returns information about cluster (Kafka, Zookeeper etc.)

<a name="DHNode+getConfiguration"></a>
### dhNode.getConfiguration(name) ⇒ `Http` ⇒ `Promise`
Returns requested property value

| Param | Type | Description |
| --- | --- | --- |
| name | `String` | Property name |

<a name="DHNode+saveConfiguration"></a>
### dhNode.saveConfiguration(name, propertyBody) ⇒ `Http` ⇒ `Promise`
Creates new or updates existing property

| Param | Type | Description |
| --- | --- | --- |
| name | `String` | Property name |
| propertyBody | `String` | Property value |

<a name="DHNode+deleteConfiguration"></a>
### dhNode.deleteConfiguration(name) ⇒ `Http` ⇒ `Promise`
Deletes property

| Param | Type | Description |
| --- | --- | --- |
| name | `String` | Property name |

<a name="DHNode+getDevices"></a>
### dhNode.getDevices(filter) ⇒ `Http` ⇒ `Promise`
Gets list of devices.

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>[DeviceFilter](#DHNode..DeviceFilter)</code> | search filter |

<a name="DHNode+getDevice"></a>
### dhNode.getDevice(id) ⇒ `Http` ⇒ `Promise`
Gets information about device.

| Param | Type | Description |
| --- | --- | --- |
| id | `String` | device unique identifier |

<a name="DHNode+saveDevice"></a>
### dhNode.saveDevice(id, deviceParams) ⇒ `Http` ⇒ `Promise`
Registers or updates a device. For initial device registration, only 'name' property is required.

| Param | Type | Description |
| --- | --- | --- |
| id | `String` | device unique identifier |
| deviceParams | <code>[DeviceParams](#DHNode..DeviceParams)</code> | device params |

<a name="DHNode+deleteDevice"></a>
### dhNode.deleteDevice(id) ⇒ `Http` ⇒ `Promise`
Deletes an existing device.

| Param | Type | Description |
| --- | --- | --- |
| id | `String` | device unique identifier |

<a name="DHNode+getDevicesCommandPoll"></a>
### dhNode.getDevicesCommandPoll(filter) ⇒ `Http` ⇒ `Promise`
This method returns all device commands that were created after specified timestamp.  In the case when no commands were found, the method blocks until new command is received. 
If no commands are received within the waitTimeout period, the server returns an empty response. 
In this case, to continue polling, the client should repeat the call with the same timestamp value.

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>[DevicePollFilter](#DHNode..DevicePollFilter)</code> | device poll filter |

<a name="DHNode+getDeviceCommands"></a>
### dhNode.getDeviceCommands(id, filter) ⇒ `Http` ⇒ `Promise`
Gets list of commands that has been received in specified time range.

| Param | Type | Description |
| --- | --- | --- |
| id | `String` | Device ID |
| filter | <code>[DeviceCommandsFilter](#DHNode..DeviceCommandsFilter)</code> | device commands filter |

<a name="DHNode+createDeviceCommand"></a>
### dhNode.createDeviceCommand(id, commandParams) ⇒ `Http` ⇒ `Promise`
Creates new device command, stores and returns command with generated id.

| Param | Type | Description |
| --- | --- | --- |
| id | `String` | Device ID |
| commandParams | <code>[CommandParams](#DHNode..CommandParams)</code> | command params |

<a name="DHNode+getDeviceCommandsPoll"></a>
### dhNode.getDeviceCommandsPoll(id, pollParams) ⇒ `Http` ⇒ `Promise`
This method returns all device commands that were created after specified timestamp. 
In the case when no commands were found, the method blocks until new command is received. 
If no commands are received within the waitTimeout period, the server returns an empty response. 
In this case, to continue polling, the client should repeat the call with the same timestamp value.

| Param | Type | Description |
| --- | --- | --- |
| id | `String` | Device ID |
| pollParams | <code>[PollParams](#DHNode..PollParams)</code> | poll params |

<a name="DHNode+getCommand"></a>
### dhNode.getCommand(deviceId, commandId) ⇒ `Http` ⇒ `Promise`
Gets command by device ID and command id

| Param | Type | Description |
| --- | --- | --- |
| deviceId | `String` | Device ID |
| commandId | `String` | Command ID |


<a name="DHNode+updateCommand"></a>
### dhNode.updateCommand(deviceId, commandId, commandParams) ⇒ `Http` ⇒ `Promise`
Updates an existing device command.

| Param | Type | Description |
| --- | --- | --- |
| deviceId | `String` | Device ID |
| commandId | `String` | Command ID |
| commandParams | <code>[CommandParams](#DHNode..CommandParams)</code> | command params |

<a name="DHNode+getDeviceCommandPoll"></a>
### dhNode.getDeviceCommandPoll(deviceId, commandId, waitTimeout) ⇒ `Http` ⇒ `Promise`
Waits for a command to be processed.

This method returns a command only if it has been processed by a device.

In the case when command is not processed, the method blocks until device acknowledges command execution. 
If the command is not processed within the waitTimeout period, the server returns an empty response. 
In this case, to continue polling, the client should repeat the call.

| Param | Type | Description |
| --- | --- | --- |
| deviceId | `String` | Device ID |
| commandId | `String` | Command ID |
| waitTimeout | `Number` | Wait timeout in seconds |

<a name="DHNode+getDevicesNotificationsPoll"></a>
### dhNode.getDevicesNotificationsPoll(pollParams) ⇒ `Http` ⇒ `Promise`
Polls new device notifications.

This method returns all device notifications that were created after specified timestamp.

In the case when no notifications were found, the method blocks until new notification is received. 
If no notifications are received within the waitTimeout period, the server returns an empty response. 
In this case, to continue polling, the client should repeat the call with the same timestamp value.

| Param | Type | Description |
| --- | --- | --- |
| pollParams | <code>[DevicesNotificationPollParams](#DHNode..DevicesNotificationPollParams)</code> | device notification params |

<a name="DHNode+getDeviceNotifications"></a>
### dhNode.getDeviceNotifications(deviceId, filter) ⇒ `Http` ⇒ `Promise`
Returns notifications by provided parameters

| Param | Type | Description |
| --- | --- | --- |
| deviceId | `String` | Device ID |
| filter | <code>[DeviceNotificationsFilter](#DHNode..DeviceNotificationsFilter)</code> | command params |

<a name="DHNode+createDeviceNotification"></a>
### dhNode.createDeviceNotification(deviceId, notification) ⇒ `Http` ⇒ `Promise`
Creates notification

| Param | Type | Description |
| --- | --- | --- |
| deviceId | `String` | Device ID |
| notification | <code>[DeviceNotification](#DHNode..DeviceNotification)</code> | notification params |

<a name="DHNode+getDeviceNotificationPoll"></a>
### dhNode.getDeviceNotificationPoll(deviceId, filter) ⇒ `Http` ⇒ `Promise`
Polls new device notifications for specified device id.

This method returns all device notifications that were created after specified timestamp.

In the case when no notifications were found, the method blocks until new notification is received. 
If no notifications are received within the waitTimeout period, the server returns an empty response. 
In this case, to continue polling, the client should repeat the call with the same timestamp value.

| Param | Type | Description |
| --- | --- | --- |
| deviceId | `String` | Device ID |
| filter | <code>[DeviceNotificationPollFilter](#DHNode..DeviceNotificationPollFilter)</code> | notification poll filter |

<a name="DHNode+getDeviceNotification"></a>
### dhNode.getDeviceNotification(deviceId, notificationId) ⇒ `Http` ⇒ `Promise`
Returns notification by device deviceId and notification notificationId

| Param | Type | Description |
| --- | --- | --- |
| deviceId | `String` | Device ID |
| notificationId | `String` | Notification ID |

<a name="DHNode+createTokenByLoginInfo"></a>
### dhNode.createTokenByLoginInfo(loginInfo) ⇒ `Http` ⇒ `Promise`
Authenticates a user and returns a session-level JWT token.

| Param | Type | Description |
| --- | --- | --- |
| loginInfo | <code>[LoginInfo](#DHNode..LoginInfo)</code> | login info |

<a name="DHNode+createTokenBySystemParams"></a>
### dhNode.createTokenBySystemParams(systemParams) ⇒ `Http` ⇒ `Promise`
Authenticates by system params and returns a session-level JWT token.

| Param | Type | Description |
| --- | --- | --- |
| systemParams | <code>[SystemParams](#DHNode..SystemParams)</code> | system params |

<a name="DHNode+refreshToken"></a>
### dhNode.refreshToken(refreshToken) ⇒ `Http` ⇒ `Promise`
Refresh JWT access token.

| Param | Type | Description |
| --- | --- | --- |
| refreshToken | `String` | refresh token |

<a name="DHNode+getNetworks"></a>
### dhNode.getNetworks(filter) ⇒ `Http` ⇒ `Promise`
Gets list of device networks the client has access to.

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>[NetworkFilter](#DHNode..NetworkFilter)</code> | network filter |

<a name="DHNode+createNetwork"></a>
### dhNode.createNetwork(networkParams) ⇒ `Http` ⇒ `Promise`
Creates new device network.

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>[NetworkParams](#DHNode..NetworkParams)</code> | network params |

<a name="DHNode+getNetwork"></a>
### dhNode.getNetwork(networkId) ⇒ `Http` ⇒ `Promise`
Gets information about device network and its devices.

| Param | Type | Description |
| --- | --- | --- |
| networkId | `String` | network id |

<a name="DHNode+updateNetwork"></a>
### dhNode.updateNetwork(networkId, networkParams) ⇒ `Http` ⇒ `Promise`
Updates an existing device network.

| Param | Type | Description |
| --- | --- | --- |
| networkId | `String` | network id |
| networkParams | <code>[NetworkUpdateParams](#DHNode..NetworkUpdateParams)</code> | network params |

<a name="DHNode+deleteNetwork"></a>
### dhNode.deleteNetwork(networkId) ⇒ `Http` ⇒ `Promise`
Deletes an existing device network.

| Param | Type | Description |
| --- | --- | --- |
| networkId | `String` | network id |

<a name="DHNode+getUsers"></a>
### dhNode.getUsers(filter) ⇒ `Http` ⇒ `Promise`
Gets list of users.

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>[UsersFilter](#DHNode..UsersFilter)</code> | users filter |

<a name="DHNode+createUser"></a>
### dhNode.createUser(userParams) ⇒ `Http` ⇒ `Promise`
Creates new user.

| Param | Type | Description |
| --- | --- | --- |
| userParams | <code>[UserParams](#DHNode..UserParams)</code> | user params |

<a name="DHNode+getCurrentUser"></a>
### dhNode.getCurrentUser() ⇒ `Http` ⇒ `Promise`
Get information about the current user.

<a name="DHNode+updateCurrentUser"></a>
### dhNode.updateCurrentUser(userParams) ⇒ `Http` ⇒ `Promise`
Updates current user.

| Param | Type | Description |
| --- | --- | --- |
| userParams | <code>[UserParams](#DHNode..UserParams)</code> | user params |

<a name="DHNode+getUser"></a>
### dhNode.getUser(userId) ⇒ `Http` ⇒ `Promise`
Gets information about user and its assigned networks. 
Only administrators are allowed to get information about any user. 
User-level accounts can only retrieve information about themselves.

| Param | Type | Description |
| --- | --- | --- |
| userId | `String` | user id |

<a name="DHNode+updateUser"></a>
### dhNode.updateUser(userId, userParams) ⇒ `Http` ⇒ `Promise`
Update user.

| Param | Type | Description |
| --- | --- | --- |
| userId | `String` | user id |
| userParams | <code>[UserParams](#DHNode..UserParams)</code> | user params |

<a name="DHNode+deleteUser"></a>
### dhNode.deleteUser(userId) ⇒ `Http` ⇒ `Promise`
Delete user.

| Param | Type | Description |
| --- | --- | --- |
| userId | `String` | user id |

<a name="DHNode+getUsersNetwork"></a>
### dhNode.getUsersNetwork(userId, networkId) ⇒ `Http` ⇒ `Promise`
Gets information about user/network association.

| Param | Type | Description |
| --- | --- | --- |
| userId | `String` | user id |
| networkId | `String` | network id |

<a name="DHNode+addUsersNetwork"></a>
### dhNode.addUsersNetwork(userId, networkId) ⇒ `Http` ⇒ `Promise`
Associates network with the user.

| Param | Type | Description |
| --- | --- | --- |
| userId | `String` | user id |
| networkId | `String` | network id |

<a name="DHNode+deleteUsersNetwork"></a>
### dhNode.deleteUsersNetwork(userId, networkId) ⇒ `Http` ⇒ `Promise`
Removes association between network and user.

| Param | Type | Description |
| --- | --- | --- |
| userId | `String` | user id |
| networkId | `String` | network id |








<a name="DHNode..DeviceFilter"></a>
### DHNode~DeviceFilter : `Object`

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

<a name="DHNode..DeviceParams"></a>
### DHNode~DeviceParams : `Object`

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | `String` |
| name | `String` |
| data| `String` |
| networkId | `Number` |
| blocked | `Boolean` |

<a name="DHNode..DevicePollFilter"></a>
### DHNode~DevicePollFilter : `Object`

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| deviceIds | `String` | List of device IDs |
| names | `String` | Command names |
| timestamp | `String` | Timestamp to start from |
| waitTimeout | `Number` | Wait timeout in seconds |
| limit | `Number` | Limit number of commands |

<a name="DHNode..DeviceCommandsFilter"></a>
### DHNode~DeviceCommandsFilter : `Object`

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

<a name="DHNode..CommandParams"></a>
### DHNode~CommandParams : `Object`

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| command | `String` |
| timestamp | `String` |
| parameters | `String` |
| lifetime | `Number` | 
| status | `String` |
| result | `String` |

<a name="DHNode..PollParams"></a>
### DHNode~PollParams : `Object`

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| names | `String` | Command names |
| timestamp | `String` | Timestamp to start from |
| waitTimeout | `Number` | Wait timeout in seconds |
| limit | `Number` | Limit number of commands |

<a name="DHNode..DevicesNotificationPollParams"></a>
### DHNode~DevicesNotificationPollParams : `Object`

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| waitTimeout | `Number` | Wait timeout in seconds |
| deviceIds | `String` | List of device IDs |
| names | `String` | Notification names |
| timestamp | `String` | Timestamp to start from |

<a name="DHNode..DeviceNotificationsFilter"></a>
### DHNode~DeviceNotificationsFilter : `Object`

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

<a name="DHNode..DeviceNotification"></a>
### DHNode~DeviceNotification : `Object`

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| notification | `String` |
| timestamp | `String` |
| parameters | `String` |

<a name="DHNode..DeviceNotificationPollFilter"></a>
### DHNode~DeviceNotificationPollFilter : `Object`

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| waitTimeout | `Number` | Wait timeout |
| timestamp | `String` | Timestamp to start from |
| names | `String` | Notification names |

<a name="DHNode..LoginInfo"></a>
### DHNode~LoginInfo : `Object`

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| login | `String` |
| password | `String` |

<a name="DHNode..SystemParams"></a>
### DHNode~SystemParams : `Object`

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| userId | `Number` |
| actions | `[Strings]` |
| networkIds | `[Strings]` |
| deviceIds | `[Strings]` |
| expiration | `String` |

<a name="DHNode..NetworkFilter"></a>
### DHNode~NetworkFilter : `Object`

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | `String` | Filter by network name. |
| namePattern | `Strings` | Filter by network name pattern. |
| sortField | `Strings` | Result list sort field. |
| sortOrder | `Strings` | Result list sort order. |
| take | `Number` | Number of records to take from the result list. |
| skip | `Number` | Number of records to skip from the result list. |

<a name="DHNode..NetworkParams"></a>
### DHNode~NetworkParams : `Object`

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | `Number` |
| name | `String` |
| description | `Strings` |

<a name="DHNode..NetworkUpdateParams"></a>
### DHNode~NetworkUpdateParams : `Object`

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | `Number` |
| key | `String` |
| name | `String` |
| description | `Strings` |

<a name="DHNode..UsersFilter"></a>
### DHNode~UsersFilter : `Object`

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

<a name="DHNode..UserParams"></a>
### DHNode~UserParams : `Object`

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| login | `String` | 
| role | `Number` |
| status | `Number` |
| password | `String` |
| oldPassword | `String` |
| data | `String` |
| introReviewed | `Boolean` |

## Development

It's quite easy to add more functionality to Rest library. Check `utils.js` file for info about sending request to API with proper params.

## License

[DeviceHive] is developed by [DataArt] Apps and distributed under Open Source
[Apache 2.0 license](https://en.wikipedia.org/wiki/Apache_License). 

© Copyright 2017 [DataArt] Apps © All Rights Reserved
