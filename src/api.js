const rest = require(`./rest`);
const ws = require(`./ws`);
let type;

/**
 * Initialize API based on protocol and URL
 * 
 * @param {String} serverURL 
 * @returns 
 */
function init(serverURL){
  type = serverURL.slice(0, 2);
  if (type === `ht`){
    return rest.init(serverURL);
  } else {
    return ws.init(serverURL);
  }
}

/**
 * Returns api type
 * @returns {*}
 */
function getType(){
  return type;
}

/**
 * Returns current API
 * 
 * @returns 
 */
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
  type,
  getType
}