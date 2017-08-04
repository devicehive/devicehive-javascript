let WS, apiURL, access, refresh, socket;
const commandsSubscribers = {};
const notificationsSubscribers = {};
let { sendWS } = require(`./utils.js`);
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
  } catch(error){}
} else {
  WS = WebSocket;
}

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

function getInfo(){
  return sendWS({
    action : `server/info`
  })
  .then(messageData => messageData.info);
}

function getDevices(filter){
  return sendWS(Object.assign({
    action : `device/list`
  }, filter))
  .then(messageData => messageData.devices);
}

function setTokens({ accessToken, refreshToken }){
  access = accessToken;
  refresh = refreshToken;
  return sendWS({
    action : `authenticate`,
    token : accessToken
  })
}

function refreshToken(refreshToken){
  return sendWS({
    action : `token/refresh`,
    refreshToken
  })
}

function createTokenByLoginInfo(loginInfo){
  return sendWS({
    action : `token`,
    login : loginInfo.login,
    password : loginInfo.password
  })
}

function getInfoConfigCluster(){
  return sendWS({
    action : `cluster/info`
  })
  .then(messageData => messageData.clusterInfo);
}

function createTokenBySystemParams(systemParams){
  return sendWS({
    action : `token/create`,
    payload : systemParams
  })
}

function getConfiguration(name){
  return sendWS({
    action : `configuration/get`,
    name
  })
  .then(messageData => messageData.configuration)
}

function saveConfiguration(name, value){
  return sendWS({
    action : `configuration/put`,
    name,
    value
  })
  .then(messageData => messageData.configuration)
}

function deleteConfiguration(name){
  return sendWS({
    action : `configuration/delete`,
    name
  })
}

function getNetworks(filter){
  return sendWS(Object.assign({
    action : `network/list`
  }, filter))
  .then(messageData => messageData.networks);
}

function getNetwork(id){
  return sendWS({
    action : `network/get`,
    id
  })
  .then(messageData => messageData.network);
}

function deleteNetwork(id){
  return sendWS({
    action : `network/delete`,
    id
  })
}

function createNetwork(network){
  return sendWS({
    action : `network/insert`,
    network
  })
  .then(messageData => messageData.network);
}

function deleteDevice(deviceId){
  return sendWS({
    action : `device/delete`,
    deviceId
  })
}

function getDevice(deviceId){
  return sendWS({
    action : `device/get`,
    deviceId
  })
  .then(messageData => messageData.device);
}

function saveDevice(id, device){
  return sendWS({
    action : `device/save`,
    device
  })
}

function getCurrentUser(){
  return sendWS({
    action : `user/getCurrent`
  })
  .then(messageData => messageData.current);
}

function getUsers(filter){
  return sendWS(Object.assign({
    action : `user/list`
  }, filter))
  .then(messageData => messageData.users);
}

function createUser(user){
  return sendWS({
    action : `user/insert`,
    user
  })
  .then(messageData => messageData.user);
}

function deleteUser(userId){
  return sendWS({
    action : `user/delete`,
    userId
  })
}

function commandsSubscribe(commandFilter, subscriber){
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
          subscriber(messageData.command);
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

function notificationsSubscribe(notificationFilter, subscriber){
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
          subscriber(messageData.notification);
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
  notificationsUnsubscribe
}