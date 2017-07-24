const rest = require(`../src/rest`);

class DeviceNotification{
  constructor({ id, notification, deviceId, timestamp, parameters = null }){
    this.id = id;
    this.notification = notification;
    this.deviceId = deviceId;
    this.timestamp = timestamp;
    this.parameters = parameters;
  }
  
  /**
   * Returns Notification's id
   * 
   * @returns 
   * @memberof DeviceNotification
   */
  getId(){
    return this.id;
  }

  /**
   * Returns Notification's name
   * 
   * @returns 
   * @memberof DeviceNotification
   */
  getNotification(){
    return this.notification;
  }

  /**
   * Returns Notification's Device id
   * 
   * @returns 
   * @memberof DeviceNotification
   */
  getDeviceId(){
    return this.deviceId;
  }

  /**
   * Returns Notification's timestamp
   * 
   * @returns 
   * @memberof DeviceNotification
   */
  getTimestamp(){
    return this.timestamp;
  }

  /**
   * Returns Notification's parameters
   * 
   * @returns 
   * @memberof DeviceNotification
   */
  getParameters(){
    return this.parameters;
  }
}

module.exports = DeviceNotification;