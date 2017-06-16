const DHNode = require(`./index`);

const dhNode = new DHNode.rest(`http://playground.dev.devicehive.com/api/rest`,
  `eyJhbGciOiJIUzI1NiJ9.eyJwYXlsb2FkIjp7InVzZXJJZCI6MSwiYWN0aW9ucyI6WyIqIl0sIm5ldHdvcmtJZHMiOlsiKiJdLCJkZXZpY2VJZHMiOlsiKiJdLCJleHBpcmF0aW9uIjoxNDk2OTM1NjU5ODc4LCJ0b2tlblR5cGUiOiJBQ0NFU1MifX0.s4OVpCiUS708wHDSNdFcTD2suV8yB4W3BchwPcG9cAk`);

// dhNode.getInfo()
//     .then(info => {
//         console.log(`getInfo`);
//         console.log(info);
//     })
//     .catch(console.error);

// dhNode.getInfoConfigCluster()
//     .then(infoConfigCluster => {
//         console.log(`getInfoConfigCluster`);
//         console.log(infoConfigCluster);
//     })
//     .catch(console.error);
dhNode.createTokenBySystemParams()
// dhNode.saveConfiguration(`testName`, {test : `test name`})
//     .then(res => {
//         console.log(`saveConfiguration`);
//     })
//     .then(dhNode.getConfiguration.bind(this, `testName`))
//     .then(configuration => {
//         console.log(`getConfiguration`);
//         console.log(configuration);
//     })
//     .then(dhNode.deleteConfiguration.bind(this, `testName`))
//     .then(res => {
//         console.log(`deleteConfiguration`);
//     })
//     .catch(console.error);

// dhNode.getDevices()
//     .then(devices => {
//         console.log(`getDevices`);
//         console.log(devices);
//     })
//     .catch(console.error);

// dhNode.saveDevice(`123`, {name : `this is test`})
//     .then(res => {
//         console.log(`saveDevice`);
//     })
//     .then(dhNode.getDevice.bind(this, `123`))
//     .then(device => {
//         console.log(`getDevice`);
//         console.log(device);
//     })
//     .then(dhNode.deleteDevice.bind(this, `123`))
//     .then(res => {
//         console.log(`deleteDevice`);
//     })
//     .catch(console.error);


// dhNode.getDevicesCommandsPoll()
//     .then(devicesCommandsPoll => {
//         console.log(`getDevicesCommandsPoll`);
//         console.log(devicesCommandsPoll);
//     })
//     .catch(console.error);

// start timestamp 1496898320
// device id mKv1dyx5iSq1mtcQA8v4otORfyFFSMwhBbyp

// dhNode.getDeviceCommands(`mKv1dyx5iSq1mtcQA8v4otORfyFFSMwhBbyp`, { start : `1496898320` })
//     .then(commands => {
//         console.log(`getDeviceCommand`);
//         console.log(commands);
//     })
//     .catch(console.error);

// dhNode.createDeviceCommand(`mKv1dyx5iSq1mtcQA8v4otORfyFFSMwhBbyp`, { command : 'test creation' })
//     .then(res => {
//         console.log(`createDeviceCommand`);
//         console.log(res);
//     })
//     .catch(console.error);

// command id 1864713416

// dhNode.getDeviceCommandsPoll(`mKv1dyx5iSq1mtcQA8v4otORfyFFSMwhBbyp`, { timestamp : `1496898320`})
//     .then(commands => {
//         console.log(`getDeviceCommandPoll`);
//         console.log(commands);
//     })
//     .catch(console.error);

// dhNode.getCommand(`mKv1dyx5iSq1mtcQA8v4otORfyFFSMwhBbyp`, `616022358`)
//     .then(command => {
//         console.log(`getCommand`);
//         console.log(command);
//     })
//     .catch(console.error);

// dhNode.updateCommand(`mKv1dyx5iSq1mtcQA8v4otORfyFFSMwhBbyp`, `616022358`, { lifetime : 100500 })
//     .then(res => {
//         console.log(`updateCommand`);
//         console.log(res);
//     })
//     .catch(console.error);

// dhNode.getDeviceCommandPoll(`mKv1dyx5iSq1mtcQA8v4otORfyFFSMwhBbyp`, `616022358`)
//     .then(poll => {
//         console.log(`getDeviceCommandPoll`);
//         console.log(poll);
//     })
//     .catch(console.error);

// dhNode.getDevicesNotificationsPoll()
//     .then(poll => {
//         console.log(`getDevicesNotificationsPoll`);
//         console.log(poll);
//     })
//     .catch(console.error);

// dhNode.createTokenByLoginInfo({ login : `dhadmin`, password : `dhadmin_#911`})
//     .then(tokens => {
//         console.log(`getTokenByLoginInfo`);
//         console.log(tokens);
//     })
//     .catch(console.error);

// dhNode.refreshToken(`eyJhbGciOiJIUzI1NiJ9.eyJwYXlsb2FkIjp7InVzZXJJZCI6MSwiYWN0aW9ucyI6WyIqIl0sIm5ldHdvcmtJZHMiOlsiKiJdLCJkZXZpY2VJZHMiOlsiKiJdLCJleHBpcmF0aW9uIjoxNTEyNjQzNDY0MjI3LCJ0b2tlblR5cGUiOiJSRUZSRVNIIn19.XjV6A94YzScq-XZ6I_ISVDjfgHsp3_la5FN92_tIhUw`)
//     .then(newToken => {
//         console.log(`refreshToken`);
//         console.log(newToken);
//     })
//     .catch(console.error);

// dhNode.getDevicesNotificationsPoll({ timestamp : `1496898320` })
//     .then(poll => {
//         console.log(`getDevicesNotificationsPoll`);
//         console.log(poll);
//     })
//     .catch(console.error);

// dhNode.getDeviceNotifications(`mKv1dyx5iSq1mtcQA8v4otORfyFFSMwhBbyp`, { start : `1496898320` })
//     .then(notifications => {
//         console.log(`getDeviceNotifications`);
//         console.log(notifications);
//     })
//     .catch(console.error);

// dhNode.createDeviceNotification(`mKv1dyx5iSq1mtcQA8v4otORfyFFSMwhBbyp`, { notification : `test notification` })
//     .then(res => {
//         console.log(`createDeviceNotification`);
//         console.log(res);
//     })
//     .catch(console.error);

//notification id 922627315

// dhNode.getDeviceNotificationPoll(`mKv1dyx5iSq1mtcQA8v4otORfyFFSMwhBbyp`, { timestamp : `1496898320` })
//     .then(poll => {
//         console.log(`getDeviceNotificationPoll`);
//         console.log(poll);
//     })
//     .catch(console.error);

// dhNode.getDeviceNotification(`mKv1dyx5iSq1mtcQA8v4otORfyFFSMwhBbyp`, `922627315`)
//     .then(notification => {
//         console.log(`getDeviceNotification`);
//         console.log(notification);
//     })
//     .catch(console.error);

// dhNode.getNetworks()
//     .then(networks => {
//         console.log(`getNetworks`);
//         console.log(networks);
//     })
//     .catch(console.error);

// dhNode.createNetwork({ name : `test network` })
//     .then(res => {
//         console.log(`createNetwork`);
//         console.log(res);
//     })
//     .catch(console.error);

// network id 57

// dhNode.getNetwork(`54`)
//     .then(network => {
//         console.log(`getNetwork`);
//         console.log(network);
//     })
//     .catch(console.error);

// dhNode.updateNetwork(`54`, { description : `yet another test` })
//     .then(network => {
//         console.log(`updateNetwork`);
//         console.log(network);
//     })
//     .catch(console.error);

// dhNode.deleteNetwork(`54`)
//     .then(res => {
//         console.log(`deleteNetwork`);
//         console.log(res);
//     })
//     .catch(console.error);

// dhNode.getUsers()
//     .then(users => {
//         console.log(`getUsers`);
//         console.log(users);
//     })
//     .catch(console.error);

// dhNode.createUser({ login : `test`, password : `testtest`, role : 0, status : 0})
//     .then(user => {
//         console.log(`createUser`);
//         console.log(user);
//     })
//     .catch(console.error);

// user id 67

// dhNode.getCurrentUser()
//     .then(user => {
//         console.log(`getCurrentUser`);
//         console.log(user);
//     })
//     .catch(console.error);

// dhNode.updateCurrentUser({ data : 'test' })
//     .then(user => {
//         console.log(`updateCurrentUser`);
//         console.log(user);
//     })
//     .catch(console.error);

// dhNode.getUser(`65`)
//     .then(user => {
//         console.log(`getUser`);
//         console.log(user);
//     })
//     .catch(console.error);

// dhNode.updateUser(`65`, { introReviewed : true })
//     .then(user => {
//         console.log(`updateUser`);
//         console.log(user);
//     })
//     .catch(console.error);

// dhNode.deleteUser(`65`)
//     .then(res => {
//         console.log(`deleteUser`);
//         console.log(res);
//     })
//     .catch(console.error);

// dhNode.addUsersNetwork(`67`, `57`)
//     .then(res => {
//         console.log(`addUsersNetwork`);
//         console.log(res);
//     })
//     .catch(console.error);

// dhNode.getUsersNetwork(`67`, `57`)
//   .then(network => {
//     console.log(`getUsersNetwork`);
//     console.log(network);
//   })
//   .catch(console.error);

// dhNode.deleteUsersNetwork(`67`, `57`)
//   .then(res => {
//     console.log(`deleteUsersNetwork`);
//     console.log(res);
//   })
//   .catch(console.error);