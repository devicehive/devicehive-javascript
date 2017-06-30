const rest = require(`../src/rest`);
const Network = require(`./Network`);
const Device = require(`./Device`);
const DeviceCommand = require(`./DeviceCommand`);
const DeviceNotification = require(`./DeviceNotification`);

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

  createToken(userId, actions, networkIds, deviceIds, expiration){
    return this.rest.callAuthorized(this.rest.createTokenBySystemParams, { userId, actions, networkIds, deviceIds, expiration });
  }

  refreshToken(){
    return this.rest
      .refreshToken();
  }

  getConfigurationProperty(name){
    return this.rest.callAuthorized(this.rest.getConfiguration, name);
  }

  setConfigurationProperty(name, value){
    return this.rest.callAuthorized(this.rest.saveConfiguration, name, value);
  }

  removeConfigurationProperty(name){
    return this.rest.callAuthorized(this.rest.deleteConfiguration, name);
  }

  listNetworks(filter){
    return this.rest.callAuthorized(this.rest.getNetworks, filter)
      .then(networks => networks.map(network => new Network(network)));
  }

  removeNetwork(id){
    return this.rest.callAuthorized(this.rest.deleteNetwork, id);
  }

  createNetwork(name, description){
    return this.rest.callAuthorized(this.rest.createNetwork, { name, description })
      .then(network => new Network(network));
  }

  listDevices(filter){
    return this.rest.callAuthorized(this.rest.getDevices, filter)
      .then(devices => devices.map(device => new Device(device)));
  }

  removeDevice(id){
    return this.rest.callAuthorized(this.rest.deleteDevice, id);
  }

  getDevice(id){
    return this.rest.callAuthorized(this.rest.getDevice, id)
      .then(device => new Device(device));
  }

  putDevice(id, params = {}){
    params.id = id;
    return this.rest.callAuthorized(this.rest.saveDevice(id, new Device(params)));
  }

  subscribeCommands(deviceIds, subscriber, commandFilter){
    commandFilter.deviceIds = deviceIds;
    const filterKey = JSON.stringify(commandFilter);
    this._commandsSubscribers[filterKey] = subscriber;
    this._pollCommands(commandFilter);
    return Promise.resolve();
  }

  unsubscribeCommands(deviceIds, commandFilter){
    commandFilter.deviceIds = deviceIds;
    const filterKey = JSON.stringify(commandFilter);
    delete this._commandsSubscribers[filterKey];
    return Promise.resolve();
  }

  subscribeNotifications(deviceIds, subscriber, notificationFilter){
    notificationFilter.deviceIds = deviceIds;
    const filterKey = JSON.stringify(notificationFilter);
    this._notificationsSubscribers[filterKey] = subscriber;
    this._pollNotifications(notificationFilter);
    return Promise.resolve();
  }

  unsubscribeNotifications(deviceIds, notificationFilter){
    notificationFilter.deviceIds = deviceIds;
    const filterKey = JSON.stringify(notificationFilter);
    delete this._notificationsSubscribers[filterKey];
    return Promise.resolve();
  }
  
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