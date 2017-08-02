const rest = require(`../src/rest`);
const Device = require(`./Device`);
const DeviceCommand = require(`./DeviceCommand`);
const DeviceNotification = require(`./DeviceNotification`);
const User = require(`./User`);
const Network = require(`./Network`);

class DeviceHive{
  constructor({ accessToken, refreshToken, login, password, serverURL }){
    this._commandsSubscribers = {};
    this._notificationsSubscribers = {};
    if (serverURL){
      rest.init(serverURL);
      this.rest = rest;
      return new Promise((resolve) => {
        if (accessToken && refreshToken){
          this.rest
          .setTokens({
            accessToken,
            refreshToken
          })
          .then(() => resolve(this));
        } else if (refreshToken){
          this.rest
          .refreshToken(refreshToken)
          .then(({ accessToken }) => this.rest.setTokens({ accessToken, refreshToken }))
          .then(() => resolve(this));
        } else if (login && password){
          this.rest
          .createTokenByLoginInfo({
            login,
            password
          })
          .then(({ accessToken, refreshToken }) => this.rest.setTokens({ accessToken, refreshToken }))
          .then(() => resolve(this));
        } else {
          throw new Error(`Authentication info not passed.`)
        }
      })
    } else {
      throw new Error(`serverURL not passed.`);
    }
  }

  /**
   * Returns version of API, server timestamp and WebSocket base uri
   * 
   * @returns 
   * @memberof DeviceHive
   */
  getInfo(){
    return this.rest
      .getInfo();
  }

  /**
   * Returns information about cluster (Kafka, Zookeeper etc.)
   * 
   * @returns 
   * @memberof DeviceHive
   */
  getClusterInfo(){
    return this.rest
      .getInfoConfigCluster();
  }

  /**
   * Create token by system params and returns a session-level JWT token.
   * 
   * @param {Number} userId 
   * @param {String[]} actions 
   * @param {String[]} networkIds 
   * @param {String[]} deviceIds 
   * @param {String} expiration 
   * @returns 
   * @memberof DeviceHive
   */
  createToken(userId, actions, networkIds, deviceIds, expiration){
    return this.rest.callAuthorized(this.rest.createTokenBySystemParams, { userId, actions, networkIds, deviceIds, expiration });
  }

  /**
   * Refresh JWT access token.
   * 
   * @returns 
   * @memberof DeviceHive
   */
  refreshToken(){
    return this.rest
      .refreshToken();
  }

  /**
   *  Returns requested property value
   * 
   * @param {String} name 
   * @returns 
   * @memberof DeviceHive
   */
  getConfigurationProperty(name){
    return this.rest.callAuthorized(this.rest.getConfiguration, name);
  }

  /**
   * Sets configuration property value
   * 
   * @param {String} name 
   * @param {String} value 
   * @returns 
   * @memberof DeviceHive
   */
  setConfigurationProperty(name, value){
    return this.rest.callAuthorized(this.rest.saveConfiguration, name, value);
  }

  /**
   * Deletes property
   * 
   * @param {String} name 
   * @returns 
   * @memberof DeviceHive
   */
  removeConfigurationProperty(name){
    return this.rest.callAuthorized(this.rest.deleteConfiguration, name);
  }

  /**
   * Gets list of Networks the client has access to.
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
   * @returns 
   * @memberof DeviceHive
   */
  listNetworks(filter){
    return this.rest.callAuthorized(this.rest.getNetworks, filter)
      .then(networks => networks.map(network => new Network(network)));
  }

  /**
   * Gets information about Network.
   * 
   * @param {String} networkId 
   * @returns 
   * @memberof DeviceHive
   */
  getNetwork(networkId){
    return this.rest.callAuthorized(this.rest.getNetwork, networkId)
      .then(network => new Network(network));
  }

  /**
   * Deletes an existing Network.
   * 
   * @param {String} id 
   * @returns 
   * @memberof DeviceHive
   */
  removeNetwork(id){
    return this.rest.callAuthorized(this.rest.deleteNetwork, id);
  }

  /**
   * Creates new Network.
   * 
   * @param {String} name 
   * @param {String} description 
   * @returns 
   * @memberof DeviceHive
   */
  createNetwork(name, description){
    return this.rest.callAuthorized(this.rest.createNetwork, { name, description })
      .then(network => new Network(network));
  }

  /**
   * Gets list of Devices.
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
   * @memberof DeviceHive
   */
  listDevices(filter){
    return this.rest.callAuthorized(this.rest.getDevices, filter)
      .then(devices => devices.map(device => new Device(device)));
  }

  /**
   * Deletes an existing Device.
   * 
   * @param {String} id 
   * @returns 
   * @memberof DeviceHive
   */
  removeDevice(id){
    return this.rest.callAuthorized(this.rest.deleteDevice, id);
  }

  /**
   * Gets information about Device.
   * 
   * @param {String} id 
   * @returns 
   * @memberof DeviceHive
   */
  getDevice(id){
    return this.rest.callAuthorized(this.rest.getDevice, id)
      .then(device => new Device(device));
  }

  /**
   * Registers or updates a Device. For initial Device registration, only 'name' property is required.
   * 
   * @typedef DeviceParams
   * @property {String} id
   * @property {String} name
   * @property {String} data
   * @property {Number} networkId
   * @property {Boolean} blocked
   * 
   * @param {String} id 
   * @param {DeviceParams} [params={}] 
   * @returns 
   * @memberof DeviceHive
   */
  putDevice(id, params = {}){
    params.id = id;
    return this.rest.callAuthorized(this.rest.saveDevice, id, new Device(params));
  }

  /**
   * Get information about the current User.
   * 
   * @returns 
   * @memberof DeviceHive
   */
  getCurrentUser(){
    return rest.callAuthorized(rest.getCurrentUser)
      .then(currentUser => new User(currentUser));
  }

  /**
 * Gets list of Users.
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
 * @memberof DeviceHive
 */
  getUsers(filter){
    return rest.callAuthorized(rest.getUsers, filter)
      .then(users => users.map(user => new User(user)));
  }

  /**
 * Creates new User.
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
 * @memberof DeviceHive
 */
  createUser(params){
    return rest.callAuthorized(rest.createUser, new User(params))
      .then(newUser => new User(newUser));
  }

  /**
   * Delete User.
   * 
   * @param {String} id 
   * @returns 
   * @memberof DeviceHive
   */
  removeUser(id){
    return rest.callAuthorized(rest.deleteUser, id);
  }


  /**
   * Allows subscribe for Commands to particular Devices with filter
   * @typedef DeviceCommandFilter
   * @property {String} names - Command names
   * @property {String} timestamp - Timestamp to start from
   * @property {Number} waitTimeout - Wait timeout in seconds
   * @property {Number} limit - Limit number of commands
   * 
   * @param {[String]} deviceIds 
   * @param {Function} subscriber 
   * @param {DeviceCommandFilter} commandFilter 
   * @returns 
   * @memberof DeviceHive
   */
  subscribeCommands(deviceIds, subscriber, commandFilter){
    commandFilter.deviceIds = deviceIds;
    const filterKey = JSON.stringify(commandFilter);
    this._commandsSubscribers[filterKey] = subscriber;
    this._pollCommands(commandFilter);
    return Promise.resolve();
  }

  /**
   * Allows unsubscribe from Commands to particular Devices with filter
   * 
   * @param {[String]} deviceIds 
   * @param {DeviceCommandFilter} commandFilter 
   * @returns 
   * @memberof DeviceHive
   */
  unsubscribeCommands(deviceIds, commandFilter){
    commandFilter.deviceIds = deviceIds;
    const filterKey = JSON.stringify(commandFilter);
    delete this._commandsSubscribers[filterKey];
    return Promise.resolve();
  }

  /**
   * Allows subscribe for Notifications to particular Devices with filter
   * @typedef DeviceNotificationFilter
   * @property {Number} waitTimeout - Wait timeout
   * @property {String} names - Notification names
   * @property {String} timestamp - Timestamp to start from
   * 
   * @param {[String]} deviceIds 
   * @param {Function} subscriber 
   * @param {DeviceNotificationFilter} notificationFilter 
   * @returns 
   * @memberof DeviceHive
   */
  subscribeNotifications(deviceIds, subscriber, notificationFilter){
    notificationFilter.deviceIds = deviceIds;
    const filterKey = JSON.stringify(notificationFilter);
    this._notificationsSubscribers[filterKey] = subscriber;
    this._pollNotifications(notificationFilter);
    return Promise.resolve();
  }

  /**
   * Allows unsubscribe from Notifications to particular Devices with filter
   * 
   * @param {[String]} deviceIds 
   * @param {DeviceNotificationFilter} notificationFilter 
   * @returns 
   * @memberof DeviceHive
   */
  unsubscribeNotifications(deviceIds, notificationFilter){
    notificationFilter.deviceIds = deviceIds;
    const filterKey = JSON.stringify(notificationFilter);
    delete this._notificationsSubscribers[filterKey];
    return Promise.resolve();
  }
  
  /**
   * Internal function for polling Commands with particular filter
   * 
   * @param {DeviceCommandFilter} commandFilter 
   * @returns 
   * @memberof DeviceHive
   */
  _pollCommands(commandFilter){
    return rest.getInfo()
      .then(info => {
        const updatedFilter = Object.assign({}, commandFilter);
        updatedFilter.timestamp = info.serverTimestamp;
        return updatedFilter;
      })
      .then(updatedFilter => rest.callAuthorized(rest.getDevicesCommandPoll, updatedFilter))
      .then(commands => {
        const subscriber = this._commandsSubscribers[JSON.stringify(commandFilter)];
        if (subscriber){
          subscriber(commands.map(command => new DeviceCommand(command)));
          this._pollCommands(commandFilter);
        }
      })
  }

  /**
   * Internal function for polling Notifications with particular filter
   * 
   * @param {DeviceNotificationFilter} notificationFilter 
   * @returns 
   * @memberof DeviceHive
   */
  _pollNotifications(notificationFilter){
    return rest.getInfo()
      .then(info => {
        const updatedFilter = Object.assing({}, notificationFilter);
        updatedFilter.timestamp = info.serverTimestamp;
        return updatedFilter;
      })
      .then(updatedFilter => rest.callAuthorized(rest.getDevicesNotificationsPoll, updatedFilter))
      .then(notifications => {
        const subscriber = this._notificationsSubscribers[JSON.stringify(notificationFilter)];
        if (subscriber){
          subscriber(notifications.map(notification => new DeviceNotification(notification)));
          this._pollNotifications(notificationFilter);
        }
      })
  }
}

module.exports = DeviceHive;