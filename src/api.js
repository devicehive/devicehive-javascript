const rest = require(`./rest`);
const ws = require(`./ws`);
let type;

function init(serverURL){
  type = serverURL.slice(0, 2);
  if (type === `ht`){
    return rest.init(serverURL);
  } else {
    return ws.init(serverURL);
  }
}

function getAPI(){
  if (type === `ht`){
    return rest;
  } else {
    return ws;
  }
}

module.exports = {
  init,
  getAPI,
  type
}