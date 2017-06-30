const DeviceHive = require(`./index`);

//class DeviceHive getInfo
// new DeviceHive({
//   serverURL : `http://playground.dev.devicehive.com:80/api/rest`,
//   login : `dhadmin`,
//   password : `dhadmin_#911`
// })
// .then(deviceHive => deviceHive.getInfo())
// .then(console.log);

//class DeviceHive getClusterInfo
// new DeviceHive({
//   serverURL : `http://playground.dev.devicehive.com:80/api/rest`,
//   login : `dhadmin`,
//   password : `dhadmin_#911`
// })
// .then(deviceHive => deviceHive.getClusterInfo())
// .then(console.log);

new DeviceHive({
  serverURL : `http://playground.dev.devicehive.com:80/api/rest`,
  login : `dhadmin`,
  password : `dhadmin_#911`
})


















// .then((deviceHive) => {
//   deviceHive.getDevice(`1WmMjJk5B7zt0f1PpYr7xkfr9Esq5qJ63HVU`)
//   .then(device => {
    
//     device.subscribeCommands(function(commands){console.log(commands)})
//       .then(() => {
//         setInterval(function (){
//           console.log(`command`);
//           device.sendCommand(`test1`, {})
//         }, 5000);

//         setTimeout(function(){
//           device.unsubscribeCommands({});
//         }, 16000)
//       })
//   })
// })
// .catch(console.log.bind(null, `catch`));