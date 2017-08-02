const api = require(`../src/api`).getAPI();

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

  /**
   * Returns Command's id.
   * 
   * @returns 
   * @memberof DeviceCommand
   */
  getId(){
    return this.id;
  }

  /**
   * Returns Command's name
   * 
   * @returns 
   * @memberof DeviceCommand
   */
  getCommand(){
    return this.command;
  }

  /**
   * Returns Command's timestamp
   * 
   * @returns 
   * @memberof DeviceCommand
   */
  getTimestamp(){
    return this.timestamp;
  }

  /**
   * Returns Command's User id
   * 
   * @returns 
   * @memberof DeviceCommand
   */
  getUserId(){
    return this.userId;
  }

  /**
   * Returns Command's Device id
   * 
   * @returns 
   * @memberof DeviceCommand
   */
  getDeviceId(){
    return this.deviceId;
  }

  /**
   * Returns Command's parameters
   * 
   * @returns 
   * @memberof DeviceCommand
   */
  getParameters(){
    return this.parameters;
  }

  /**
   * Returns Command's lifetime
   * 
   * @returns 
   * @memberof DeviceCommand
   */
  getLifetime(){
    return this.lifetime;
  }

  /**
   * Returns Command's status
   * 
   * @returns 
   * @memberof DeviceCommand
   */
  getStatus(){
    return this.status;
  }

  /**
   * Returns Command's result.
   * 
   * @returns 
   * @memberof DeviceCommand
   */
  getResult(){
    return this.result;
  }

  /**
   * Sets Command's id
   * 
   * @param {String} newId 
   * @memberof DeviceCommand
   */
  setId(newId){
    this.id = newId;
  }

  /**
   * Sets Command's name
   * 
   * @param {String} newCommand 
   * @memberof DeviceCommand
   */
  setCommand(newCommand){
    this.command = newCommand;
  }

  /**
   * Sets Command's timestamp
   * 
   * @param {String} newTimestamp 
   * @memberof DeviceCommand
   */
  setTimestamp(newTimestamp){
    this.timestamp = newTimestamp;
  }

  /**
   * Sets Command's User id.
   * 
   * @param {String} newUserId 
   * @memberof DeviceCommand
   */
  setUserId(newUserId){
    this.userId = newUserId;
  }

  /**
   * Sets Command's Device id.
   * 
   * @param {String} newDeviceId 
   * @memberof DeviceCommand
   */
  setDeviceId(newDeviceId){
    this.deviceId = newDeviceId;
  }

  /**
   * Sets Command's parameters
   * 
   * @param {Object | String} newParameters 
   * @memberof DeviceCommand
   */
  setParameters(newParameters){
    this.parameters = newParameters;
  }

  /**
   * Sets Command's lifetime
   * 
   * @param {Number} newLifetime 
   * @memberof DeviceCommand
   */
  setLifetime(newLifetime){
    this.lifetime = newLifetime;
  }

  /**
   * Sets Command's status
   * 
   * @param {String} newStatus 
   * @memberof DeviceCommand
   */
  setStatus(newStatus){
    this.status = newStatus;
  }

  /**
   * Sets Command's result
   * 
   * @param {String} newResult 
   * @memberof DeviceCommand
   */
  setResult(newResult){
    this.result = newResult;
  }

  /**
   * Returns Command's status. 
   * If status was updated updates current command on the fly.
   * 
   * @returns 
   * @memberof DeviceCommand
   */
  fetchCommandStatus(){
    return api.callAuthorized(api.getCommand, this.deviceId, this.id)
      .then(command => {
        if (this.status !== command.status){
          this.setStatus(command.status);
        }
        return command.status;
      });
  }

  /**
   * Returns Command's result.
   * If result was updated updates current command on the fly.
   * 
   * @returns 
   * @memberof DeviceCommand
   */
  fetchCommandResult(){
    return api.callAuthorized(api.getCommand, this.deviceId, this.id)
      .then(command => {
        if (this.result !== command.result){
          this.setResult(command.result);
        }
        return command.result;
      });
  }

  /**
   * Requests current Command update
   * 
   * @returns 
   * @memberof DeviceCommand
   */
  updateCommand(){
    return api.callAuthorized(api.getCommand, this.deviceId, this.id)
      .then(command => new DeviceCommand(command));
  }

  /**
   * Save current Command's state.
   * 
   * @returns 
   * @memberof DeviceCommand
   */
  save(){
    return api.callAuthorized(api.updateCommand, this.deviceId, this.id, this);
  }

  /**
   * Allow subscription for result updates from server
   * 
   * @param {Function} subscriber 
   * @memberof DeviceCommand
   */
  subscribeUpdates(subscriber){
    this._updateSubscribers.push(subscriber);
    if (!this._isPollStarted){
      this._pollUpdates();
    }
    return Promise.resolve();
  }

  /**
   * Internal function for Command's result updates polling
   * 
   * @returns 
   * @memberof DeviceCommand
   */
  _pollUpdates(){
    if (!this._isPollStarted){
      this._isPollStarted = true;
    }
    return this.fetchCommandResult()
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