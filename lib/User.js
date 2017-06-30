const rest = require(`../src/rest`);
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
  }

  setId(newId){
    this.id = newId;
  }

  setLogin(newLogin){
    this.login = newLogin;
  }

  setRole(newRole){
    this.role = newRole;
  }

  setStatus(newStatus){
    this.status = newStatus;
  }

  setLastLogin(newLastLogin){
    this.lastLogin = newLastLogin;
  }

  setData(newData){
    this.data = newData;
  }

  setPassword(newPassword){
    this.password = newPassword;
  }

  setOldPassword(oldPassword){
    this.oldPassword = oldPassword;
  }

  setIntroReviewed(newIntroReviewed){
    this.introReviewed = newIntroReviewed;
  }

  save(){
    return rest.callAuthorized(rest.updateCurrentUser, this);
  }

  getNetworks(){
    return rest.callAuthorized(rest.getCurrentUser)
      .then(user => user.networks.map(network => new Network(network)));
  }

  assignNetwork(networkId){
    return rest.callAuthorized(rest.addUsersNetwork, this.id, networkId);
  }

  unassignNetwork(networkId){
    return rest.callAuthorized(rest.deleteUsersNetwork, this.id, networkId);
  }
}

module.exports = User;