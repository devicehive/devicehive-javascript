const rest = require(`../src/rest`);
const Device = require(`./Device`);

class Network {
  constructor({ id, name, description }){
    this.id = id;
    this.name = name;
    this.description = description;
  }

  setId(newId){
    this.id = newId;
  }

  setName(newName){
    this.name = newName;
  }

  setDescription(newDescription){
    this.description = newDescription;
  }

  save(){
    return rest.callAuthorized(rest.updateNetwork, this.id, this);
  }

  listDevices(){
    return rest.callAuthorized(rest.getNetwork, this.id)
      .then(network => network.devices.map(device => {
        device.networkId = this.id;
        return new Device(device);
      }));
  }
  
}

module.exports = Network;