const rest = require(`../src/rest`);

class DeviceNotification{
  constructor({ id, notification, deviceId, timestamp, parameters = null }){
    this.id = id;
    this.notification = notification;
    this.deviceId = deviceId;
    this.timestamp = timestamp;
    this.parameters = parameters;
  }
}

module.exports = DeviceNotification;