const rest = require(`../src/rest`);
const Network = require(`./Network`);
const DeviceCommand = require(`./DeviceCommand`);
const DeviceNotification = require(`./DeviceNotification`);
const User = require(`./User`);

class Device {
  constructor({ id, name = id, data = null, networkId = null, isBlocked = false }){
    this.id = id;
    this.name = name;
    this.data = data;
    this.networkId = networkId;
    this.isBlocked = isBlocked;

    this._commandsSubscribers = {};
    this._notificationsSubscribers = {};
  }

  setName(newName){
    this.name = newName;
  }

  setData(newData){
    this.data = newData;
  }

  setBlocked(newBlocked){
    this.isBlocked = newBlocked;
  }

  save(){
    return rest.callAuthorized(rest.saveDevice, this.id, this);
  }
  
  getNetwork(){
    return rest.callAuthorized(rest.getNetwork, this.networkId)
      .then(network => new Network(network));
  }

  getCommands(filter){
    return rest.callAuthorized(rest.getDeviceCommands, this.id, filter)
      .then(commands => commands.map(command => new DeviceCommand(command)));
  }

  getNotifications(filter){
    return rest.callAuthorized(rest.getDeviceNotifications, this.id, filter)
      .then(notifications => notifications.map(notification => new DeviceNotification(notification)));
  }

  sendCommand(command, parameters, updateSubscriber){
    return rest.callAuthorized(rest.createDeviceCommand, this.id, { command, parameters })
      .then(createdCommand => {
        const newCommand = new DeviceCommand(createdCommand);
        if (updateSubscriber){
          newCommand.subscribeUpdates(updateSubscriber);
        }
        return newCommand;
      });
  }

  sendNotification(notification, parameters){
    return rest.callAuthorized(rest.createDeviceNotification, this.id, { notification, parameters })
      .then(createdNotification => new DeviceNotification(createdNotification));
  }

  getCurrentUser(){
    return rest.callAuthorized(rest.getCurrentUser)
      .then(currentUser => new User(currentUser));
  }

  getUsers(filter){
    return rest.callAuthorized(rest.getUsers, filter)
      .then(users => users.map(user => new User(user)));
  }

  createUser(params){
    return rest.callAuthorized(rest.createUser, params)
      .then(newUser => new User(newUser));
  }

  removeUser(id){
    return rest.callAuthorized(rest.deleteUser, id);
  }

  subscribeCommands(subscriber, commandFilter = {}){
    const filterKey = JSON.stringify(commandFilter);
    this._commandsSubscribers[filterKey] = subscriber;
    this._pollCommands(commandFilter);
    return Promise.resolve();
  }

  unsubscribeCommands(commandFilter){
    const filterKey = JSON.stringify(commandFilter);
    delete this._commandsSubscribers[filterKey];
    return Promise.resolve();
  }

  subscribeNotifications(subscriber, notificationFilter = {}){
    const filterKey = JSON.stringify(notificationFilter);
    this._notificationsSubscribers[filterKey] = subscriber;
    this._pollNotifications(notificationFilter);
    return Promise.resolve();
  }

  unsubscribeNotifications(notificationFilter){
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
    .then(updatedFilter => rest.callAuthorized(rest.getDeviceCommandsPoll, this.id, updatedFilter))
    .then(commands => {
      const subscriber = this._commandsSubscribers[JSON.stringify(commandFilter)];
      if (subscriber){
        subscriber(commands.map(command => new DeviceCommand(command)));
        this._pollCommands(commandFilter);
      }
    });
  }

  _pollNotifications(notificationFilter){
    return rest.getInfo()
      .then(info => {
        const updatedFilter = Object.assing({}, notificationFilter);
        updatedFilter.timestamp = info.serverTimestamp;
        return updatedFilter;
      })
      .then(updatedFilter => rest.callAuthorized(rest.getDeviceNotificationPoll, this.id, updatedFilter))
      .then(notifications => {
        const subscriber = this._notificationsSubscribers[JSON.stringify(notificationFilter)];
        if (subscriber){
          subscriber(notifications.map(notification => new DeviceNotification(notification)));
          this._pollNotifications(notificationFilter);
        }
      })
  }
}

module.exports = Device;