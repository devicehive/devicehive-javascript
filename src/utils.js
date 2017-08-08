require(`isomorphic-fetch`);
const randomstring = require(`randomstring`);

/**
 * Function to create url with query params
 * 
 * @param {String} urlString 
 * @param {Object} [query={}] 
 * @returns 
 */
function urlWithQuery(urlString, query = {}){
  let url = `${urlString}?`;
  Object.keys(query).forEach(key => {
    url += `${key}=${query[key]}&`;
  });
  return url.slice(0, -1);
}

/**
 * Send request with params to particular endpoint
 * 
 * @param {Object} {endpoint, query, body, method = `GET`} 
 * @returns {Promise}
 */
function sendRequest({ apiURL, access, endpoint, query, body, method = `GET`, authorize = true }){

  let fullURL = apiURL + endpoint;

  if (query){
    fullURL = urlWithQuery(fullURL, query);
  }
  const params = {
    method,
    headers : {}
  }

  if (body){
    params.body = JSON.stringify(body)
    params.headers[`Accept`] = `application/json`;
    params.headers[`Content-Type`] = `application/json`;
  }
  
  if (authorize){
    params.headers.Authorization = `Bearer ${access}`;
  }
  return fetch(fullURL, params)
    .then(response => response.text().then(text => ({ json : text ? JSON.parse(text) : {}, response })))
    .then(({ json, response }) => {
      if (!response.ok){
        return Promise.reject(json);
      }
      return json;
    })

}

function sendWS(socket, params){
  return new Promise((resolve, reject) => {
    if (!params.requestId){
      params.requestId = randomstring.generate();
    }
    socket.send(JSON.stringify(params));
    const listener = (event) => {
      const messageData = JSON.parse(event.data);
      if (messageData.action === params.action){
        if (messageData.requestId === params.requestId){
          socket.removeEventListener(`message`, listener);
          if (messageData.status === `success`){
            resolve(messageData);
          } else {
            reject(messageData);
          }
        }
      }
    }

    socket.addEventListener(`message`, listener);
  })
}

module.exports = {
  sendRequest,
  sendWS
};

