const request = require(`request-promise-native`);

/**
 * Send request with params to particular endpoint
 * 
 * @param {Object} {endpoint, query, body, method = `GET`} 
 * @returns {Promise}
 */
function sendRequest({ apiURL, access, endpoint, query, body, method = `GET`, authorize = true }){
  const fullURL = apiURL + endpoint;
  const options = {
    uri : fullURL,
    method,
    headers : {},
    json : true
  };

  if (query) {
    options.qs = query;
  }

  if (body) {
    options.body = body;
    options.headers = {
      Accept : `application/json`,
      'Content-Type' : `application/json`
    };
  }
  if (authorize) {
    options.headers.Authorization = `Bearer ${access}`;
  }
  return request(options);
}

module.exports = sendRequest;

