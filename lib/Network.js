const api = require(`../src/api`);
const Device = require(`./Device`);

class Network {
  constructor({ id, name, description }){
    this.id = id;
    this.name = name;
    this.description = description;
    this.api = api.getAPI();
  }

  /**
   * Returns Network's id
   * 
   * @returns 
   * @memberof Network
   */
  getId(){
    return this.id;
  }

  /**
   * Returns Network's name
   * 
   * @returns 
   * @memberof Network
   */
  getName(){
    return this.name;
  }

  /**
   * Returns Network's description
   * 
   * @returns 
   * @memberof Network
   */
  getDescription(){
    return this.description;
  }

  /**
   * Sets Network's id
   * 
   * @param {Number} newId 
   * @memberof Network
   */
  setId(newId){
    this.id = newId;
  }

  /**
   * Sets Network's name.
   * 
   * @param {String} newName 
   * @memberof Network
   */
  setName(newName){
    this.name = newName;
  }

  /**
   * Sets Network's description.
   * 
   * @param {String} newDescription 
   * @memberof Network
   */
  setDescription(newDescription){
    this.description = newDescription;
  }

  /**
   * Save current Network state.
   * 
   * @returns 
   * @memberof Network
   */
  save(){
    return this.api.callAuthorized(this.api.updateNetwork, this.id, this);
  }

  /**
   * Get current Network Device list
   * 
   * @returns 
   * @memberof Network
   */
  listDevices(){
    return this.api.callAuthorized(this.api.getNetwork, this.id)
      .then(network => network.devices.map(device => {
        device.networkId = this.id;
        return new Device(device);
      }));
  }
  
}

module.exports = Network;