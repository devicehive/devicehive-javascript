const { sendRequest } = require(`./utils.js`);
let apiURL, access, refresh;

/**
 * Set tokens to current class
 * 
 * @memberof rest
 */
function setTokens({ accessToken, refreshToken }){
  access = accessToken;
  refresh = refreshToken;
  return Promise.resolve();
}

/**
 * Returns version of API, server timestamp and WebSocket base uri
 * 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function getInfo() {
  return sendRequest({
    apiURL,
    endpoint : `/info`,
    authorize : false
  });
}

/**
 * Returns information about cluster (Kafka, Zookeeper etc.)
 * 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function getInfoConfigCluster() {
  return sendRequest({
    apiURL,
    endpoint : `/info/config/cluster`,
    authorize : false
  });
}

/**
 * Returns requested property value
 * 
 * @param {String} name
 * @returns {Promise}
 * 
 * @memberof rest
 */
function getConfiguration(name) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/configuration/${name}`
  });
}

/**
 * Deletes property
 * 
 * @param {String} name 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function deleteConfiguration(name) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/configuration/${name}`,
    method : `DELETE`
  });
}

/**
 * Creates new or updates existing property
 * 
 * @param {String} name 
 * @param {String} propertyBody 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function saveConfiguration(name, propertyBody) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/configuration/${name}`,
    method : `PUT`,
    body : propertyBody
  });
}

/**
 * Gets list of devices.
 * 
 * @typedef DeviceFilter
 * @property {String} name - Filter by device name.
 * @property {String} namePattern - Filter by device name pattern.
 * @property {Number} networkId - Filter by associated network identifier.
 * @property {String} networkName - Filter by associated network name.
 * @property {String} sortField - Result list sort field.
 * @property {String} sortOrder - Result list sort order.
 * @property {Number} take - Number of records to take from the result list.
 * @property {Number} skip - Number of records to skip from the result list.
 * 
 * @param {DeviceFilter} filter 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function getDevices(filter) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/device`,
    query : filter
  });
}

/**
 * Gets information about device.
 * 
 * @param {String} id 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function getDevice(id) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/device/${id}`
  });
}

/**
 * Registers or updates a device. For initial device registration, only 'name' property is required.
 * 
 * @typedef DeviceParams
 * @property {String} id
 * @property {String} name
 * @property {String} data
 * @property {Number} networkId
 * @property {Boolean} blocked
 * 
 * @param {String} id 
 * @param {DeviceParams} deviceParams 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function saveDevice(id, deviceParams) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/device/${id}`,
    method : `PUT`,
    body : deviceParams
  });
}

/**
 * Deletes an existing device.
 * 
 * @param {String} id 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function deleteDevice(id) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/device/${id}`,
    method : `DELETE`
  });
}
/**
 * This method returns all device commands that were created after specified timestamp. 
 * In the case when no commands were found, the method blocks until new command is received. 
 * If no commands are received within the waitTimeout period, the server returns an empty response. 
 * In this case, to continue polling, the client should repeat the call with the same timestamp value.
 * 
 * @typedef DevicePollFilter
 * @property {String} deviceIds - List of device IDs
 * @property {String} names - Command names
 * @property {String} timestamp - Timestamp to start from
 * @property {Number} waitTimeout - Wait timeout in seconds
 * @property {Number} limit - Limit number of commands
 * 
 * @param {DevicePollFilter} filter 
 * @returns 
 * 
 * @memberof rest
 */
function getDevicesCommandPoll(filter) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/device/command/poll`,
    query : filter
  });
}

/**
 * Gets list of commands that has been received in specified time range.
 * 
 * @typedef DeviceCommandsFilter
 * @property {String} start - Start timestamp
 * @property {String} end - End timestamp
 * @property {String} command - Command name
 * @property {String} status - Command status
 * @property {String} sortField - Sort field
 * @property {String} sortOrder - Sort order
 * @property {Number} take - Limit param
 * @property {Number} skip - Skip param
 * 
 * @param {String} id 
 * @param {DeviceCommandsFilter} filter 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function getDeviceCommands(id, filter) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/device/${id}/command`,
    query : filter
  });
}

/**
 * Creates new device command, stores and returns command with generated id.
 * 
 * @typedef CommandParams
 * @property {String} command
 * @property {String} timestamp
 * @property {String} parameters
 * @property {Number} lifetime
 * @property {String} status
 * @property {String} result
 * 
 * @param {String} id 
 * @param {CommandParams} commandParams 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function createDeviceCommand(id, commandParams) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/device/${id}/command`,
    method : `POST`,
    body : commandParams
  });
}

/**
 * This method returns all device commands that were created after specified timestamp. 
 * In the case when no commands were found, the method blocks until new command is received. 
 * If no commands are received within the waitTimeout period, the server returns an empty response. 
 * In this case, to continue polling, the client should repeat the call with the same timestamp value.
 * 
 * @typedef PollParams
 * @property {String} names - Command names
 * @property {String} timestamp - Timestamp to start from
 * @property {Number} waitTimeout - Wait timeout in seconds
 * @property {Number} limit - Limit number of commands
 * 
 * @param {String} id 
 * @param {PollParams} pollParams 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function getDeviceCommandsPoll(id, pollParams) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/device/${id}/command/poll`,
    query : pollParams
  });
}

/**
 * Gets command by device ID and command id
 * 
 * @param {String} deviceId 
 * @param {String} commandId 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function getCommand(deviceId, commandId) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/device/${deviceId}/command/${commandId}`
  });
}

/**
 * Updates an existing device command.
 * 
 * @param {String} deviceId 
 * @param {String} commandId 
 * @param {CommandParams} commandParams
 * @returns {Promise}
 * 
 * @memberof rest
 */
function updateCommand(deviceId, commandId, commandParams) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/device/${deviceId}/command/${commandId}`,
    method : `PUT`,
    body : commandParams
  });
}

/**
 * Waits for a command to be processed.
 * 
 * This method returns a command only if it has been processed by a device.
 * 
 * In the case when command is not processed, the method blocks until device acknowledges command execution. 
 * If the command is not processed within the waitTimeout period, the server returns an empty response. 
 * In this case, to continue polling, the client should repeat the call.
 * 
 * @param {String} deviceId 
 * @param {String} commandId 
 * @param {Number} waitTimeout 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function getDeviceCommandPoll(deviceId, commandId, waitTimeout = 30) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/device/${deviceId}/command/${commandId}/poll`,
    query : { 
      waitTimeout 
    }
  });
}

/**
 * Polls new device notifications.
 * 
 * This method returns all device notifications that were created after specified timestamp.
 * 
 * In the case when no notifications were found, the method blocks until new notification is received. 
 * If no notifications are received within the waitTimeout period, the server returns an empty response. 
 * In this case, to continue polling, the client should repeat the call with the same timestamp value.
 * 
 * @typedef DevicesNotificationPollParams
 * @property {Number} waitTimeout - Wait timeout
 * @property {String} deviceIds - Device ids
 * @property {String} names - Notification names
 * @property {String} timestamp - Timestamp to start from
 * 
 * @param {DevicesNotificationPollParams} pollParams 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function getDevicesNotificationsPoll(pollParams) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/device/notification/poll`,
    query : pollParams
  });
}

/**
 * Returns notifications by provided parameters
 * 
 * @typedef DeviceNotificationsFilter
 * @property {String} start - Start timestamp
 * @property {String} end - End timestamp
 * @property {String} notification - Notification name
 * @property {String} sortField - Notification name
 * @property {String} sortOrder - Sort order
 * @property {Number} take - Limit param
 * @property {Number} skip - Skip param
 * 
 * @param {String} deviceId 
 * @param {DeviceNotificationsFilter} filter 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function getDeviceNotifications(deviceId, filter) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/device/${deviceId}/notification`,
    query : filter
  });
}

/**
 * Creates notification
 * 
 * @typedef DeviceNotification
 * @property {String} notification
 * @property {String} timestamp
 * @property {String} parameters
 * 
 * @param {String} deviceId 
 * @param {DeviceNotification} notification 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function createDeviceNotification(deviceId, notification) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/device/${deviceId}/notification`,
    method : `POST`,
    body : notification
  });
}

/**
 * Polls new device notifications for specified device id.
 * 
 * This method returns all device notifications that were created after specified timestamp.
 * 
 * In the case when no notifications were found, the method blocks until new notification is received. 
 * If no notifications are received within the waitTimeout period, the server returns an empty response. 
 * In this case, to continue polling, the client should repeat the call with the same timestamp value.
 * @typedef DeviceNotificationPollFilter
 * @property {Number} waitTimeout - Wait timeout
 * @property {String} names - Notification names
 * @property {String} timestamp - Timestamp to start from
 * 
 * @param {String} deviceId 
 * @param {DeviceNotificationPollFilter} filter 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function getDeviceNotificationPoll(deviceId, filter) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/device/${deviceId}/notification/poll`,
    query : filter
  });
}

/**
 * Returns notification by device deviceId and notification notificationId
 * 
 * @param {String} deviceId 
 * @param {String} notificationId 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function getDeviceNotification(deviceId, notificationId) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/device/${deviceId}/notification/${notificationId}`
  });
}

/**
 * Authenticates a user and returns a session-level JWT token.
 * 
 * @typedef LoginInfo
 * @property {String} login
 * @property {String} password
 * 
 * @param {LoginInfo} loginInfo 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function createTokenByLoginInfo(loginInfo) {
  return sendRequest({
    apiURL,
    endpoint : `/token`,
    method : `POST`,
    body : loginInfo,
    authorize : false
  })
  .then(({ accessToken, refreshToken }) => {
    access = accessToken;
    refresh = refreshToken;
    return {
      accessToken,
      refreshToken
    };
  });
}

/**
 * Authenticates by system params and returns a session-level JWT token.
 * 
 * @typedef SystemParams
 * @property {Number} userId
 * @property {String[]} actions
 * @property {String[]} networkIds
 * @property {String[]} deviceIds
 * @property {String} expiration
 * 
 * @param {SystemParams} systemParams 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function createTokenBySystemParams(systemParams) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/token/create`,
    method : `POST`,
    body : systemParams
  })
  .then(({ accessToken, refreshToken }) => {
    return {
      accessToken,
      refreshToken
    };
  });
}

/**
 * Refresh JWT access token.
 * 
 * @param {String} refreshToken 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function refreshToken(refreshToken) {
  if (refreshToken){
    return sendRequest({
      apiURL,
      endpoint : `/token/refresh`,
      method : `POST`,
      body : {
        refreshToken
      },
      authorize : false
    });
  } else {
    return sendRequest({
      apiURL,
      endpoint : `/token/refresh`,
      method : `POST`,
      body : {
        refreshToken : refresh
      },
      authorize : false
    })
    .then(({ accessToken }) => {
      access = accessToken;
      return {
        accessToken
      };
    });
  }
}

/**
 * Gets list of device networks the client has access to.
 * 
 * @typedef NetworkFilter
 * @property {String} name - Filter by network name.
 * @property {String} namePattern - Filter by network name pattern.
 * @property {String} sortField - Result list sort field.
 * @property {String} sortOrder - Result list sort order.
 * @property {Number} take - Number of records to take from the result list.
 * @property {Number} skip - Number of records to skip from the result list.
 * 
 * @param {NetworkFilter} filter 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function getNetworks(filter) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/network`,
    query : filter
  });
}

/**
 * Creates new device network.
 * 
 * @typedef NetworkParams
 * @property {Number} id
 * @property {String} name
 * @property {String} description
 * 
 * @param {NetworkParams} networkParams 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function createNetwork(networkParams) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/network`,
    method : `POST`,
    body : networkParams
  });
}

/**
 * Gets information about device network and its devices.
 * 
 * @param {String} networkId 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function getNetwork(networkId) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/network/${networkId}`
  });
}

/**
 * Updates an existing device network.
 * 
 * @typedef NetworkUpdateParams
 * @property {Number} id
 * @property {String} name
 * @property {String} description
 * 
 * @param {String} networkId 
 * @param {NetworkUpdateParams} networkParams 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function updateNetwork(networkId, networkParams) {
  console.log(networkId);
  console.log(networkParams);
  return sendRequest({
    apiURL,
    access,
    endpoint : `/network/${networkId}`,
    method : `PUT`,
    body : networkParams
  });
}

/**
 * Deletes an existing device network.
 * 
 * @param {String} networkId 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function deleteNetwork(networkId) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/network/${networkId}`,
    method : `DELETE`
  });
}

/**
 * Gets list of users.
 * 
 * @typedef UsersFilter
 * @property {String} login - Filter by user login.
 * @property {String} loginPattern - Filter by user login pattern.
 * @property {Number} role - Filter by user role. 0 is Administrator, 1 is Client.
 * @property {Number} status - Filter by user status. 0 is Active, 1 is Locked Out, 2 is Disabled.
 * @property {String} sortField - Result list sort field.
 * @property {String} sortOrder - Result list sort order. Available values are ASC and DESC.
 * @property {Number} take - Number of records to take from the result list.
 * @property {Number} skip - Number of records to skip from the result list.
 * 
 * @param {UsersFilter} filter 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function getUsers(filter) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/user`,
    query : filter
  });
}

/**
 * Creates new user.
 * 
 * @typedef UserParams
 * @property {String} login
 * @property {Number} role
 * @property {Number} status
 * @property {String} password
 * @property {String} oldPassword
 * @property {String} data
 * @property {Boolean} introReviewed
 * 
 * @param {UserParams} userParams 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function createUser(userParams) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/user`,
    method : `POST`,
    body : userParams
  });
}

/**
 * Get information about the current user.
 * 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function getCurrentUser() {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/user/current`
  });
}

/**
 * Updates current user.
 * 
 * @param {UserParams} userParams 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function updateCurrentUser(userParams) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/user/current`,
    method : `PUT`,
    body : userParams
  });
}

/**
 * Gets information about user and its assigned networks. 
 * Only administrators are allowed to get information about any user. 
 * User-level accounts can only retrieve information about themselves.
 * 
 * @param {String} userId 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function getUser(userId) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/user/${userId}`
  });
}

/**
 * Update user.
 * 
 * @param {String} userId 
 * @param {UserParams} userParams 
 * @returns 
 * 
 * @memberof rest
 */
function updateUser(userId, userParams) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/user/${userId}`,
    method : `PUT`,
    body : userParams
  });
}

/**
 * Delete user.
 * 
 * @param {String} userId 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function deleteUser(userId) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/user/${userId}`,
    method : `DELETE`
  });
}

/**
 * Gets information about user/network association.
 * 
 * @param {String} userId 
 * @param {String} networkId 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function getUsersNetwork(userId, networkId) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/user/${userId}/network/${networkId}`
  });
}

/**
 * Associates network with the user.
 * 
 * @param {String} userId 
 * @param {String} networkId 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function addUsersNetwork(userId, networkId) {
  return sendRequest({
    apiURL,
    access,
    endpoint : `/user/${userId}/network/${networkId}`,
    method : `PUT`
  });
}

/**
 * Removes association between network and user.
 * 
 * @param {String} userId 
 * @param {String} networkId 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function deleteUsersNetwork(userId, networkId){
  return sendRequest({
    apiURL,
    access,
    endpoint : `/user/${userId}/network/${networkId}`,
    method : `DELETE`
  });
}

/**
 * Function for serverURL initialization
 * 
 * @param {any} serverUrl 
 */
function init(serverUrl){
  apiURL = serverUrl;
  return Promise.resolve(this);
}

/**
 * Function to check authorization.
 * 
 * @param {Function} func 
 * @param {Array} args 
 * @returns 
 */
function callAuthorized(func, ...args){
  return func(...args)
    .catch(error => {
      if (error.status === 401){
        return refreshToken()
          .then(() => func(...args))
      } else {
        if (typeof error === `string`){
          throw new Error(error);
        } else {
          throw error;
        }
      }
    })
}

module.exports = {
  getInfo,
  getInfoConfigCluster,
  getConfiguration,
  saveConfiguration,
  deleteConfiguration,
  getDevices,
  getDevice,
  saveDevice,
  deleteDevice,
  getDevicesCommandPoll,
  getDeviceCommands,
  createDeviceCommand,
  getDeviceCommandsPoll,
  getCommand,
  updateCommand,
  getDeviceCommandPoll,
  getDevicesNotificationsPoll,
  getDeviceNotifications,
  createDeviceNotification,
  getDeviceNotificationPoll,
  getDeviceNotification,
  createTokenByLoginInfo,
  createTokenBySystemParams,
  refreshToken,
  getNetworks,
  createNetwork,
  getNetwork,
  updateNetwork,
  deleteNetwork,
  getUsers,
  createUser,
  getCurrentUser,
  updateCurrentUser,
  getUser,
  updateUser,
  deleteUser,
  getUsersNetwork,
  addUsersNetwork,
  deleteUsersNetwork,

  init,
  setTokens,
  callAuthorized
};