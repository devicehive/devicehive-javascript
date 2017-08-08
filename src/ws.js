let WS, apiURL, access, refresh, socket;
const commandsSubscribers = {};
const notificationsSubscribers = {};
let { sendWS } = require(`./utils.js`);

/**
 * Environment detection
 * 
 * @returns 
 */
function isNode(){
  try {
    return typeof WebSocket === `undefined`;
  } catch (error){
    return false;
  }
}

if (isNode()){
  try {
    WS = require(`ws`);
  } catch(error){
  }
} else {
  WS = WebSocket;
}

/**
 * Initialize WS API with serverURL
 * 
 * @param {String} serverURL 
 * @returns 
 */
function init(serverURL){
  apiURL = serverURL;
  socket = new WS(serverURL);
  sendWS = sendWS.bind(this, socket);
  return new Promise((resolve) => {
    socket.addEventListener(`open`, (event) => {
      resolve(this);
    })
  })
}

/**
 * Returns version of API, server timestamp and Rest base uri
 * 
 * @returns 
 */
function getInfo(){
  return sendWS({
    action : `server/info`
  })
  .then(messageData => messageData.info);
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
 * @returns 
 */
function getDevices(filter){
  return sendWS(Object.assign({
    action : `device/list`
  }, filter))
  .then(messageData => messageData.devices);
}

/**
 * Set tokens to current class
 * 
 */
function setTokens({ accessToken, refreshToken }){
  access = accessToken;
  refresh = refreshToken;
  return sendWS({
    action : `authenticate`,
    token : accessToken
  })
}

/**
 * Refresh JWT access token.
 * 
 * @param {String} refreshToken 
 * 
 */
function refreshToken(refreshToken){
  return sendWS({
    action : `token/refresh`,
    refreshToken
  })
}

/**
 * Authenticates a user and returns a session-level JWT token.
 * 
 * @typedef LoginInfo
 * @property {String} login
 * @property {String} password
 * 
 * @param {LoginInfo} loginInfo 
 * 
 */
function createTokenByLoginInfo(loginInfo){
  return sendWS({
    action : `token`,
    login : loginInfo.login,
    password : loginInfo.password
  })
}

/**
 * Returns information about cluster (Kafka, Zookeeper etc.)
 * 
 */
function getInfoConfigCluster(){
  return sendWS({
    action : `cluster/info`
  })
  .then(messageData => messageData.clusterInfo);
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
 * 
 */
function createTokenBySystemParams(systemParams){
  return sendWS({
    action : `token/create`,
    payload : systemParams
  })
}

/**
 * Returns requested property value
 * 
 * @param {String} name
 * 
 */
function getConfiguration(name){
  return sendWS({
    action : `configuration/get`,
    name
  })
  .then(messageData => messageData.configuration)
}

/**
 * Creates new or updates existing property
 * 
 * @param {String} name 
 * @param {String} propertyBody 
 * 
 */
function saveConfiguration(name, value){
  return sendWS({
    action : `configuration/put`,
    name,
    value
  })
  .then(messageData => messageData.configuration)
}

/**
 * Deletes property
 * 
 * @param {String} name 
 * 
 */
function deleteConfiguration(name){
  return sendWS({
    action : `configuration/delete`,
    name
  })
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
 * 
 */
function getNetworks(filter){
  return sendWS(Object.assign({
    action : `network/list`
  }, filter))
  .then(messageData => messageData.networks);
}

/**
 * Gets information about device network and its devices.
 * 
 * @param {String} networkId 
 * 
 */
function getNetwork(id){
  return sendWS({
    action : `network/get`,
    id
  })
  .then(messageData => messageData.network);
}

/**
 * Deletes an existing device network.
 * 
 * @param {String} networkId 
 * 
 */
function deleteNetwork(id){
  return sendWS({
    action : `network/delete`,
    id
  })
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
 * 
 */
function createNetwork(network){
  return sendWS({
    action : `network/insert`,
    network
  })
  .then(messageData => messageData.network);
}

/**
 * Deletes an existing device.
 * 
 * @param {String} id 
 * 
 */
function deleteDevice(deviceId){
  return sendWS({
    action : `device/delete`,
    deviceId
  })
}

/**
 * Gets information about device.
 * 
 * @param {String} id 
 * @returns {Promise}
 * 
 * @memberof rest
 */
function getDevice(deviceId){
  return sendWS({
    action : `device/get`,
    deviceId
  })
  .then(messageData => messageData.device);
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
 * 
 */
function saveDevice(id, device){
  return sendWS({
    action : `device/save`,
    device
  })
}

/**
 * Get information about the current user.
 * 
 */
function getCurrentUser(){
  return sendWS({
    action : `user/getCurrent`
  })
  .then(messageData => messageData.current);
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
 * 
 */
function getUsers(filter){
  return sendWS(Object.assign({
    action : `user/list`
  }, filter))
  .then(messageData => messageData.users);
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
 * 
 */
function createUser(user){
  return sendWS({
    action : `user/insert`,
    user
  })
  .then(messageData => messageData.user);
}

/**
 * Delete user.
 * 
 * @param {String} userId 
 * 
 */
function deleteUser(userId){
  return sendWS({
    action : `user/delete`,
    userId
  })
}

/**
 * Subscribes on commands by commandFilter
 * 
 * @param {Object} commandFilter 
 * @param {Function} subscriber 
 * @param {Class} Wrapper 
 * @returns 
 */
function commandsSubscribe(commandFilter, subscriber, Wrapper){
  return new Promise((resolve, reject) => {
    let subscriptionId;
    sendWS(Object.assign({
      action : `command/subscribe`,
      requestId : JSON.stringify(commandFilter)
    }, commandFilter))
    .then(messageData => messageData.subscriptionId)
    .then(id => {
      subscriptionId = id;

      const commandsSubscriber = (event) => {
        const messageData = JSON.parse(event.data);
        if (messageData.action === `command/insert` && messageData.subscriptionId === subscriptionId){
          subscriber(new Wrapper(messageData.command));
        }
      }

      commandsSubscribers[JSON.stringify(commandFilter)] = {
        handler : commandsSubscriber,
        subscriptionId
      };

      socket.addEventListener(`message`, commandsSubscriber);
      resolve();
    })
  })
}

/**
 * Unsubscribes from commands by commandFilter
 * 
 * @param {Object} commandFilter 
 * @returns 
 */
function commandsUnsubscribe(commandFilter){
  const subscriptionId = commandsSubscribers[JSON.stringify(commandFilter)].subscriptionId;
  return sendWS({
    action : `command/unsubscribe`,
    subscriptionId,
    requestId : JSON.stringify(commandFilter)
  })
  .then((messageData) => {
    delete commandsSubscribers[JSON.stringify(commandFilter)];
    return messageData;
  })
}

/**
 * Subscribe on notifications by notificationFilter
 * 
 * @param {Object} notificationFilter 
 * @param {Function} subscriber 
 * @param {Class} Wrapper 
 * @returns 
 */
function notificationsSubscribe(notificationFilter, subscriber, Wrapper){
  return new Promise((resolve, reject) => {
    let subscriptionId;
    sendWS(Object.assign({
      action : `notification/subscribe`,
      requestId : JSON.stringify(notificationFilter)
    }, notificationFilter))
    .then(messageData => messageData.subscriptionId)
    .then(id => {
      subscriptionId = id;
      
      const notificationsSubscriber = (event) => {
        const messageData = JSON.parse(event.data);
        
        if (messageData.action === `notification/insert` && messageData.subscriptionId === subscriptionId){
          subscriber(new Wrapper(messageData.notification));
        }
      }

      notificationsSubscribers[JSON.stringify(notificationFilter)] = {
        handler : notificationsSubscriber,
        subscriptionId
      };

      socket.addEventListener(`message`, notificationsSubscriber);
      resolve();
    })
  })
}

/**
 * Unsubscribe from notifications by notificationFilter
 * 
 * @param {Object} notificationFilter 
 * @returns 
 */
function notificationsUnsubscribe(notificationFilter){
  const subscriptionId = notificationsSubscribers[JSON.stringify(notificationFilter)].subscriptionId;
  return sendWS({
    action : `notification/unsubscribe`,
    subscriptionId,
    requestId : JSON.stringify(notificationFilter)
  })
  .then((messageData) => {
    delete notificationsSubscribers[JSON.stringify(notificationFilter)];
    return messageData;
  })
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
 * 
 */
function getDeviceCommands(deviceId, filter){
  return sendWS(Object.assign({
    action : `command/list`,
    deviceId
  }, filter))
  .then(messageData => messageData.commands);
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
 * 
 */
function getDeviceNotifications(deviceId, filter){
  return sendWS(Object.assign({
    action : `notification/list`,
    deviceId
  }, filter))
  .then(messageData => messageData.notifications)
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
 * 
 */
function createDeviceCommand(deviceId, command){
  return sendWS({
    action : `command/insert`,
    deviceId,
    command
  })
  .then(messageData => messageData.command);
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
 * ы
 */
function createDeviceNotification(deviceId, notification){
  return sendWS({
    action : `notification/insert`,
    deviceId,
    notification
  })
  .then(messageData => messageData.notification);
}

/**
 * Gets command by device ID and command id
 * 
 * @param {String} deviceId 
 * @param {String} commandId 
 * 
 */
function getCommand(deviceId, commandId){
  return sendWS({
    action : `command/get`,
    deviceId,
    commandId
  })
  .then(messageData => messageData.command);
}

/**
 * Updates an existing device command.
 * 
 * @param {String} deviceId 
 * @param {String} commandId 
 * @param {CommandParams} commandParams
 * 
 */
function updateCommand(deviceId, commandId, command){
  return sendWS({
    action : `command/update`,
    deviceId,
    commandId,
    command
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
 * 
 */
function updateNetwork(networkId, network){
  network.id = networkId;
  console.log(network);
  return sendWS({
    action : `network/update`,
    network
  })
}

/**
 * Updates current user.
 * 
 * @param {UserParams} userParams 
 * 
 */
function updateCurrentUser(user){
  return sendWS({
    action : `user/updateCurrent`,
    user
  })
}

/**
 * Associates network with the user.
 * 
 * @param {String} userId 
 * @param {String} networkId 
 * 
 */
function addUsersNetwork(userId, networkId){
  console.log(userId, networkId);
  return sendWS({
    action : `user/assignNetwork`,
    userId,
    networkId
  })
}

/**
 * Removes association between network and user.
 * 
 * @param {String} userId 
 * @param {String} networkId 
 * 
 */
function deleteUsersNetwork(userId, networkId){
  console.log(userId, networkId);
  return sendWS({
    action : `user/unassignNetwork`,
    userId,
    networkId
  })
}

/**
 * Gets information about user and its assigned networks. 
 * Only administrators are allowed to get information about any user. 
 * User-level accounts can only retrieve information about themselves.
 * 
 * @param {String} userId 
 * 
 */
function getUser(userId){
  return sendWS({
    action : `user/get`,
    userId
  })
  .then(messageData => messageData.user);
}
/**
 * Mock to check authorization.
 * 
 * @param {Function} func 
 * @param {Array} args 
 * @returns 
 */
function callAuthorized(func, ...args){
  return func(...args);
}

module.exports = {
  init,
  callAuthorized,
  createTokenByLoginInfo,
  setTokens,
  refreshToken,
  getInfo,
  getInfoConfigCluster,
  createTokenBySystemParams,
  getConfiguration,
  saveConfiguration,
  deleteConfiguration,
  getNetworks,
  getNetwork,
  deleteNetwork,
  createNetwork,
  getDevices,
  deleteDevice,
  getDevice,
  saveDevice,
  getCurrentUser,
  getUsers,
  createUser,
  deleteUser,
  commandsSubscribe,
  commandsUnsubscribe,
  notificationsSubscribe,
  notificationsUnsubscribe,
  getDeviceCommands,
  getDeviceNotifications,
  createDeviceCommand,
  createDeviceNotification,
  getCommand,
  updateCommand,
  updateNetwork,
  updateCurrentUser,
  addUsersNetwork,
  deleteUsersNetwork,
  getUser
}