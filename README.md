# devicehive-node

## Synopsis

DeviceHive Node Library

## Installation

NPM >= 5.0.0

`npm i devicehive-node`

NPM < 5.0.0

`npm i -S devicehive-node`

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


    <!--* [.channelStates](#DHClient+channelStates) : <code>enum</code>
    * [.getNetworks(filter, cb)](#DHClient+getNetworks) ⇒ <code>[Http](#module_Core..Http)</code>
    * [.getNetwork(networkId, cb)](#DHClient+getNetwork) ⇒ <code>[Http](#module_Core..Http)</code>
    * [.getDevices(filter, cb)](#DHClient+getDevices) ⇒ <code>[Http](#module_Core..Http)</code>
    * [.getDevice(deviceId, cb)](#DHClient+getDevice) ⇒ <code>[Http](#module_Core..Http)</code>
    * [.getDeviceClass(deviceClassId, cb)](#DHClient+getDeviceClass) ⇒ <code>[Http](#module_Core..Http)</code>
    * [.getEquipmentState(deviceId, cb)](#DHClient+getEquipmentState) ⇒ <code>[Http](#module_Core..Http)</code>
    * [.getNotifications(deviceId, filter, cb)](#DHClient+getNotifications) ⇒ <code>[Http](#module_Core..Http)</code>
    * [.getNotification(deviceId, notificationId, cb)](#DHClient+getNotification) ⇒ <code>[Http](#module_Core..Http)</code>
    * [.getCommands(deviceId, filter, cb)](#DHClient+getCommands) ⇒ <code>[Http](#module_Core..Http)</code>
    * [.getCommand(deviceId, commandId, cb)](#DHClient+getCommand) ⇒ <code>[Http](#module_Core..Http)</code>
    * [.getCurrentUser(cb)](#DHClient+getCurrentUser) ⇒ <code>[Http](#module_Core..Http)</code>
    * [.updateCurrentUser(user, cb)](#DHClient+updateCurrentUser) ⇒ <code>[Http](#module_Core..Http)</code>
    * [.sendCommand(deviceId, command, parameters, cb)](#DHClient+sendCommand) ⇒ <code>[SendCommandResult](#DHClient..SendCommandResult)</code>
    * [.openChannel(cb, [channels])](#DHClient+openChannel)
    * [.closeChannel(cb)](#DHClient+closeChannel)
    * [.channelStateChanged(cb)](#DHClient+channelStateChanged)
    * [.subscribe(cb, [params])](#DHClient+subscribe) ⇒ <code>[Subscription](#module_Core..Subscription)</code>
    * [.unsubscribe(subscriptionOrId, cb)](#DHClient+unsubscribe) ⇒ <code>[Subscription](#module_Core..Subscription)</code>-->
  * _inner_
    * [~DeviceFilter](#DHNode..DeviceFilter) : `Object`

    <!--* [~NetworksFilter](#DHClient..NetworksFilter) : <code>Object</code>
    * [~getNetworksCb](#DHClient..getNetworksCb) : <code>function</code>
    * [~getNetworkCb](#DHClient..getNetworkCb) : <code>function</code>
    * [~DevicesFilter](#DHClient..DevicesFilter) : <code>Object</code>
    * [~getDevicesCb](#DHClient..getDevicesCb) : <code>function</code>
    * [~getDeviceCb](#DHClient..getDeviceCb) : <code>function</code>
    * [~getDeviceClassCb](#DHClient..getDeviceClassCb) : <code>function</code>
    * [~getEquipmentStateCb](#DHClient..getEquipmentStateCb) : <code>function</code>
    * [~NotificationsFilter](#DHClient..NotificationsFilter) : <code>Object</code>
    * [~getNotificationsCb](#DHClient..getNotificationsCb) : <code>function</code>
    * [~getNotificationCb](#DHClient..getNotificationCb) : <code>function</code>
    * [~CommandsFilter](#DHClient..CommandsFilter) : <code>Object</code>
    * [~getCommandsCb](#DHClient..getCommandsCb) : <code>function</code>
    * [~getCommandCb](#DHClient..getCommandCb) : <code>function</code>
    * [~getCurrentUserCb](#DHClient..getCurrentUserCb) : <code>function</code>
    * [~SendCommandResult](#DHClient..SendCommandResult) : <code>Object</code>
    * [~commandResult](#DHClient..commandResult) : <code>function</code>
    * [~commandResultCallback](#DHClient..commandResultCallback) : <code>function</code>
    * [~sendCommandCb](#DHClient..sendCommandCb) : <code>function</code>-->


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
Deletes property

| Param | Type | Description |
| --- | --- | --- |
| filter | `[DeviceFilter](#DHNode..DeviceFilter)` | Property name |









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