function isNode(){
  try {
    return typeof WebSocket === `undefined`;
  } catch (error){
    return false;
  }
}
let WS, apiURL, access, refresh, socket;

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
  return new Promise((resolve) => {
    socket.addEventListener(`open`, (event) => {
      resolve(this);
    })
  })
}

function getDevices({ name, namePattern, networkId, networkName, sortField, sortOrder, take, skip }){
  console.log(`devices`)
  return new Promise((resolve, reject) => {
    socket.send(JSON.stringify({
      action : `device/list`,
      name,
      namePattern,
      networkId,
      networkName,
      sortField,
      sortOrder,
      take,
      skip
    }))

    const devicesListListener = (event) => {
      const messageData = JSON.parse(event.data);
      if (messageData.action === `device/list`){
        if (messageData.status === `success`){
          socket.removeEventListener(`message`, devicesListListener);
          resolve(messageData.devices);
        } else {
          socket.removeEventListener(`message`, devicesListListener);
          reject(messageData);
        }
      }
    }

    socket.addEventListener(`message`, devicesListListener);
  })
}

function setTokens({ accessToken, refreshToken }){
  access = accessToken;
  refresh = refreshToken;
  return new Promise((resolve, reject) => {
    socket.send(JSON.stringify({
      action : `authenticate`,
      token : accessToken
    }))
    console.log(`test3`);
    const authenticateListener = (event) => {
      const messageData = JSON.parse(event.data);
      if (messageData.action === `authenticate`){
        if (messageData.status === `success`){
          console.log(`test4`);
          socket.removeEventListener(`message`, authenticateListener);
          resolve();
        } else {
          socket.removeEventListener(`message`, authenticateListener);
          reject(messageData);
        }
      }
    }

    socket.addEventListener(`message`, authenticateListener);
  })
}

function refreshToken(){}

function createTokenByLoginInfo(loginInfo){
  return new Promise((resolve, reject) => {
    socket.send(JSON.stringify({
      action : `token`,
      login : loginInfo.login,
      password : loginInfo.password
    }))

    const tokenLoginInfoListener = (event) => {
      const messageData = JSON.parse(event.data);
      console.log(messageData);
      if (messageData.action === `token`){
        if (messageData.status === `success`){
          socket.removeEventListener(`message`, tokenLoginInfoListener);
          resolve(messageData); 
        } else {
          socket.removeEventListener(`message`, tokenLoginInfoListener);
          reject(messageData);
        }
      }
    }

    socket.addEventListener(`message`, tokenLoginInfoListener);
  })
}

function callAuthorized(func, ...args){
  return func(...args);
}

module.exports = {
  init,
  getDevices,
  callAuthorized,
  createTokenByLoginInfo,
  setTokens,
  refreshToken
}