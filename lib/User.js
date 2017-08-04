const api = require(`../src/api`);
const Network = require(`./Network`);

class User {
  constructor({ id, login, role = 1, status = 0, lastLogin = null, data = null, password = null, oldPassword = null, introReviewed = false }){
    this.id = id;
    this.login = login;
    this.role = role;
    this.status = status;
    this.lastLogin = lastLogin;
    this.data = data;
    this.password = password;
    this.oldPassword = oldPassword;
    this.introReviewed = introReviewed;
    this.api = api.getAPI();
  }

  /**
   * Returns User's id.
   * 
   * @returns 
   * @memberof User
   */
  getId(){
    return this.id;
  }

  /**
   * Returns User's login
   * 
   * @returns 
   * @memberof User
   */
  getLogin(){
    return this.login;
  }

  /**
   * Returns User's role
   * 
   * @returns 
   * @memberof User
   */
  getRole(){
    return this.role;
  }

  /**
   * Returns User's status
   * 
   * @returns 
   * @memberof User
   */
  getStatus(){
    return this.status;
  }

  /**
   * Returns User's last login
   * 
   * @returns 
   * @memberof User
   */
  getLastLogin(){
    return this.lastLogin;
  }

  /**
   * Returns User's data
   * 
   * @returns 
   * @memberof User
   */
  getData(){
    return this.data;
  }

  /**
   * Returns User's password
   * 
   * @returns 
   * @memberof User
   */
  getPassword(){
    return this.password;
  }

  /**
   * Returns User's old password
   * 
   * @returns 
   * @memberof User
   */
  getOldPassword(){
    return this.oldPassword;
  }

  /**
   * Returns User's intro reviewed
   * 
   * @returns 
   * @memberof User
   */
  getIntroReviewed(){
    return this.introReviewed;
  }

  /**
   * Sets User's id
   * 
   * @param {String} newId 
   * @memberof User
   */
  setId(newId){
    this.id = newId;
  }

  /**
   * Sets User's login
   * 
   * @param {String} newLogin 
   * @memberof User
   */
  setLogin(newLogin){
    this.login = newLogin;
  }

  /**
   * Sets User's role 
   * 
   * @param {Number} newRole 
   * @memberof User
   */
  setRole(newRole){
    this.role = newRole;
  }

  /**
   * Sets User's status
   * 
   * @param {String} newStatus 
   * @memberof User
   */
  setStatus(newStatus){
    this.status = newStatus;
  }

  /**
   * Sets User's last login
   * 
   * @param {String} newLastLogin 
   * @memberof User
   */
  setLastLogin(newLastLogin){
    this.lastLogin = newLastLogin;
  }

  /**
   * Sets User's data
   * 
   * @param {String | Object} newData 
   * @memberof User
   */
  setData(newData){
    this.data = newData;
  }

  /**
   * Sets User's password
   * 
   * @param {String} newPassword 
   * @memberof User
   */
  setPassword(newPassword){
    this.password = newPassword;
  }

  /**
   * Sets User's old password
   * 
   * @param {String} oldPassword 
   * @memberof User
   */
  setOldPassword(oldPassword){
    this.oldPassword = oldPassword;
  }

  /**
   * Sets User's intro reviewed
   * 
   * @param {any} newIntroReviewed 
   * @memberof User
   */
  setIntroReviewed(newIntroReviewed){
    this.introReviewed = newIntroReviewed;
  }

  /**
   * Saves current User's state
   * 
   * @returns 
   * @memberof User
   */
  save(){
    return this.api.callAuthorized(this.api.updateCurrentUser, this);
  }

  /**
   * Returns User's networks
   * 
   * @returns 
   * @memberof User
   */
  getNetworks(){
    return this.api.callAuthorized(this.api.getCurrentUser)
      .then(user => user.networks.map(network => new Network(network)));
  }

  /**
   * Assign Network to User
   * 
   * @param {Number} networkId 
   * @returns 
   * @memberof User
   */
  assignNetwork(networkId){
    return this.api.callAuthorized(this.api.addUsersNetwork, this.id, networkId);
  }

  /**
   * Unassing Network from User
   * 
   * @param {Number} networkId 
   * @returns 
   * @memberof User
   */
  unassignNetwork(networkId){
    return this.api.callAuthorized(this.api.deleteUsersNetwork, this.id, networkId);
  }
}

module.exports = User;