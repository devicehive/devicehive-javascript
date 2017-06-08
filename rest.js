let sendRequest = require(`./utils.js`);

class rest {
  constructor(serverURL, jwtToken) {
    this.apiURL = serverURL;
    this.token = jwtToken;
    sendRequest = sendRequest.bind(this);
  }

  /**
   * Returns version of API, server timestamp and WebSocket base uri
   * 
   * @returns {Promise}
   * 
   * @memberof rest
   */
  getInfo() {
    return sendRequest({
      endpoint : `/info`
    });
  }

  /**
   * Returns information about cluster (Kafka, Zookeeper etc.)
   * 
   * @returns {Promise}
   * 
   * @memberof rest
   */
  getInfoConfigCluster() {
    return sendRequest({
      endpoint : `/info/config/cluster`
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
  getConfiguration(name) {
    return sendRequest({
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
  deleteConfiguration(name) {
    return sendRequest({
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
  saveConfiguration(name, propertyBody) {
    return sendRequest({
      endpoint : `/configuration/${name}`,
      method : `PUT`,
      body : propertyBody
    });
  }

  /**
   * Gets list of devices.
   * 
   * @param {Object} filter 
   * @returns {Promise}
   * 
   * @memberof rest
   */
  getDevices(filter) {
    return sendRequest({
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
  getDevice(id) {
    return sendRequest({
      endpoint : `/device/${id}`
    });
  }

  /**
   * Registers or updates a device. For initial device registration, only 'name' property is required.
   * 
   * @param {String} id 
   * @param {Object} deviceParams 
   * @returns {Promise}
   * 
   * @memberof rest
   */
  saveDevice(id, deviceParams) {
    return sendRequest({
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
  deleteDevice(id) {
    return sendRequest({
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
   * @param {Object} filter 
   * @returns 
   * 
   * @memberof rest
   */
  getDevicesCommandPoll(filter) {
    return sendRequest({
      endpoint : `/device/command/poll`,
      query : filter
    });
  }

  /**
   * Gets list of commands that has been received in specified time range.
   * 
   * @param {String} id 
   * @param {Object} filter 
   * @returns {Promise}
   * 
   * @memberof rest
   */
  getDeviceCommands(id, filter) {
    return sendRequest({
      endpoint : `/device/${id}/command`,
      query : filter
    });
  }

  /**
   * Creates new device command, stores and returns command with generated id.
   * 
   * @param {String} id 
   * @param {Object} commandParams 
   * @returns {Promise}
   * 
   * @memberof rest
   */
  createDeviceCommand(id, commandParams) {
    return sendRequest({
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
   * @param {String} id 
   * @param {Object} pollParams 
   * @returns {Promise}
   * 
   * @memberof rest
   */
  getDeviceCommandsPoll(id, pollParams) {
    return sendRequest({
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
  getCommand(deviceId, commandId) {
    return sendRequest({
      endpoint : `/device/${deviceId}/command/${commandId}`
    });
  }

  /**
   * Updates an existing device command.
   * 
   * @param {String} deviceId 
   * @param {String} commandId 
   * @param {String} commandParams
   * @returns {Promise}
   * 
   * @memberof rest
   */
  updateCommand(deviceId, commandId, commandParams) {
    return sendRequest({
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
   * @param {Object} pollParams 
   * @returns {Promise}
   * 
   * @memberof rest
   */
  getDeviceCommandPoll(deviceId, commandId, pollParams) {
    return sendRequest({
      endpoint : `/device/${deviceId}/command/${commandId}/poll`,
      query : pollParams
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
   * @param {Object} pollParams 
   * @returns {Promise}
   * 
   * @memberof rest
   */
  getDevicesNotificationsPoll(pollParams) {
    return sendRequest({
      endpoint : `/device/notification/poll`,
      query : pollParams
    });
  }

  /**
   * Returns notifications by provided parameters
   * 
   * @param {String} deviceId 
   * @param {Object} filter 
   * @returns {Promise}
   * 
   * @memberof rest
   */
  getDeviceNotifications(deviceId, filter) {
    return sendRequest({
      endpoint : `/device/${deviceId}/notification`,
      query : filter
    });
  }

  /**
   * Creates notification
   * 
   * @param {String} deviceId 
   * @param {Object} notification 
   * @returns {Promise}
   * 
   * @memberof rest
   */
  createDeviceNotification(deviceId, notification) {
    return sendRequest({
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
   * 
   * @param {String} deviceId 
   * @param {Object} filter 
   * @returns {Promise}
   * 
   * @memberof rest
   */
  getDeviceNotificationPoll(deviceId, filter) {
    return sendRequest({
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
  getDeviceNotification(deviceId, notificationId) {
    return sendRequest({
      endpoint : `/device/${deviceId}/notification/${notificationId}`
    });
  }

  /**
   * Authenticates a user and returns a session-level JWT token.
   * 
   * @param {Object} loginInfo 
   * @returns {Promise}
   * 
   * @memberof rest
   */
  createTokenByLoginInfo(loginInfo) {
    return sendRequest({
      endpoint : `/token`,
      method : `POST`,
      body : loginInfo
    });
  }

  /**
   * Authenticates by system params and returns a session-level JWT token.
   * 
   * @param {Object} systemParams 
   * @returns {Promise}
   * 
   * @memberof rest
   */
  createTokenBySystemParams(systemParams) {
    return sendRequest({
      endpoint : `/token/create`,
      method : `POST`,
      body : systemParams
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
  refreshToken(refreshToken) {
    return sendRequest({
      endpoint : `/token/refresh`,
      method : `POST`,
      body : {
        refreshToken
      }
    });
  }

  /**
   * Gets list of device networks the client has access to.
   * 
   * @param {Object} filter 
   * @returns {Promise}
   * 
   * @memberof rest
   */
  getNetworks(filter) {
    return sendRequest({
      endpoint : `/network`,
      query : filter
    });
  }

  /**
   * Creates new device network.
   * 
   * @param {Object} networkParams 
   * @returns {Promise}
   * 
   * @memberof rest
   */
  createNetwork(networkParams) {
    return sendRequest({
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
  getNetwork(networkId) {
    return sendRequest({
      endpoint : `/network/${networkId}`
    });
  }

  /**
   * Gets information about device network and its devices.
   * 
   * @param {String} networkId 
   * @param {Object} networkParams 
   * @returns {Promise}
   * 
   * @memberof rest
   */
  updateNetwork(networkId, networkParams) {
    return sendRequest({
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
  deleteNetwork(networkId) {
    return sendRequest({
      endpoint : `/network/${networkId}`,
      method : `DELETE`
    });
  }

  /**
   * Gets list of users.
   * 
   * @param {Object} filter 
   * @returns {Promise}
   * 
   * @memberof rest
   */
  getUsers(filter) {
    return sendRequest({
      endpoint : `/user`
    });
  }

  /**
   * Creates new user.
   * 
   * @param {Object} userParams 
   * @returns {Promise}
   * 
   * @memberof rest
   */
  createUser(userParams) {
    return sendRequest({
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
  getCurrentUser() {
    return sendRequest({
      endpoint : `/user/current`
    });
  }

  /**
   * Updates current user.
   * 
   * @param {Object} userParams 
   * @returns {Promise}
   * 
   * @memberof rest
   */
  updateCurrentUser(userParams) {
    return sendRequest({
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
  getUser(userId) {
    return sendRequest({
      endpoint : `/user/${userId}`
    });
  }

  /**
   * Update user.
   * 
   * @param {String} userId 
   * @param {Object} userParams 
   * @returns 
   * 
   * @memberof rest
   */
  updateUser(userId, userParams) {
    return sendRequest({
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
  deleteUser(userId) {
    return sendRequest({
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
  getUsersNetwork(userId, networkId) {
    return sendRequest({
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
  addUsersNetwork(userId, networkId) {
    return sendRequest({
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
  deleteUsersNetwork(userId, networkId){
    return sendRequest({
      endpoint : `/user/${userId}/network/${networkId}`,
      method : `DELETE`
    });
  }
}

module.exports = rest;