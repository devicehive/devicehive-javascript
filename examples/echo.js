const DHNode = require('devicehive');


// This is a simple echo demo. After authorising on DeviceHive server, 
// this sample polls commands from server and echos them as notifications.

// settings for this example
// server api endpoint
var dhNode = new DHNode.rest('http://127.0.0.1/api/rest');
// JWT refresh token
const refreshToken = 'eyJhbGciOiJIUzI1NiJ9.eyJwYXlsb2FkIjp7InVzZXJJZCI6MSwiYWN0aW9ucyI6WyIqIl0sIm5ldHdvcmtJZHMiOlsiKiJdLCJkZXZpY2VJZHMiOlsiKiJdLCJleHBpcmF0aW9uIjoxNTI5NTg5NDgzNjA0LCJ0b2tlblR5cGUiOiJSRUZSRVNIIn19.4UGK-PDfYrUqb7E0Mk4mgyhA6Z1_n867fKbbtLQGAtY';
// unique deviceId
const deviceId = 'NodeEcho';

// example entry point, get server access token using refresh token
dhNode.refreshToken(refreshToken)
    .then(newToken => {
        dhNode.token = newToken['accessToken'];
        console.log('AccessToken received');
        saveDevice();
    })
    .catch(console.error);

// create or update(if alreade exists) device on server
function saveDevice() {
    dhNode.saveDevice(deviceId, {name : deviceId})
        .then(res => {
             console.log('Device saved');
             getInfo()
         })
        .catch(console.error);
}

// getting server timestamp to start polling with this time
function getInfo() {
    dhNode.getInfo()
        .then(info => {
            console.log('Info received, start polling...');
            timestamp = info['serverTimestamp'];
            poll(timestamp);
        })
        .catch(console.error);
}

// poll commands from server
function poll(timestamp) {
    dhNode.getDevicesCommandPoll({
        timestamp : timestamp,
        deviceIds: deviceId
    })
    .then(commands => {
        // check if received any commands
        if (commands.length > 0) {
            for (var i in commands) {
                // read command data
                command = commands[i]['command'];
                timestamp = commands[i]['timestamp'];
                id = commands[i]['id'];
                parameters = commands[i]['parameters'];
                console.log('Got command: ');
                console.log(commands[i]);
                // update command result
                dhNode.updateCommand(deviceId, id, { status : "OK" })
                    .catch(console.error);
                // echo the same data as command as notification
                dhNode.createDeviceNotification(deviceId, {
                        notification : command,
                        parameters: parameters })
                    .catch(console.error);
            }
        }
        // do it in infinite loop
        poll(timestamp);
     })
    .catch(console.error);
}

