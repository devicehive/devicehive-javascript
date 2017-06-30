const rest = require(`../src/rest`);

class DeviceCommand {
  constructor({ id, command, timestamp, userId, deviceId, parameters = null, lifetime = 0, status = null, result = null }){
    this.id = id;
    this.command = command;
    this.timestamp = timestamp;
    this.userId = userId;
    this.deviceId = deviceId;
    this.parameters = parameters;
    this.lifetime = lifetime;
    this.status = status;
    this.result = result;

    this._updateSubscribers = [];
    this._isPollStarted = false;
  }

  getStatus(){
    return rest.callAuthorized(rest.getCommand, this.deviceId, this.id)
      .then(command => command.status);
  }

  getResult(){
    return rest.callAuthorized(rest.getCommand, this.deviceId, this.id)
      .then(command => command.result);
  }

  update(){
    return rest.callAuthorized(rest.getCommand, this.deviceId, this.id)
      .then(command => new DeviceCommand(command));
  }

  subscribeUpdates(subscriber){
    this._updateSubscribers.push(subscriber);
    if (!this._isPollStarted){
      this._pollUpdates();
    }
  }

  _pollUpdates(){
    if (!this._isPollStarted){
      this._isPollStarted = true;
    }
    return this.getResult()
      .then((result) => {
        if (this.result !== result){
          this.result = result;
          for (const subscriber of this._updateSubscribers){
            subscriber(this);
          }
          this._updateSubscribers = [];
        }
        if (this._updateSubscribers.length){
          this._pollUpdates();
        }
      })
  }
}

module.exports = DeviceCommand;