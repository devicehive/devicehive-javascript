
# devicehive-node

## Installation Instructions

DeviceHive Node Library

In case yu want to use it in the browser:
1. Clone repo;
2. Inside repo folder run `npm i`;
3. Inside repo folder run `npm run build`;
4. Get `devicehive.js`/`devicehive.min.js` in `dist` folder. 

## Installation
Package is published in npm - https://www.npmjs.com/package/devicehive

NPM >= 5.0.0

`npm i devicehive`

NPM < 5.0.0

`npm i -S devicehive`

## Usage

During development you could use this library with Promises, Generators and Async/Await functions.

### Connecting to DeviceHive

#### Using HTTP
*Note: Using HTTP you need to pass 3 different service URL`s: **mainServiceURL**, **authServiceURL** and **pluginServiceURL**.*

``` js
const DeviceHive = require('devicehive');
const httpDeviceHive = new DeviceHive({
    login: 'login',
    password: 'password',
    mainServiceURL: 'http://<host>:<port>/<path>',
    authServiceURL: 'http://<host>:<port>/<path>',
    pluginServiceURL: 'http://<host>:<port>/<path>'
});
httpDeviceHive.connect();
```

#### Using WebSocket
*Note: Using WebSocketyou need to pass only one service URL: **mainServiceURL**.*
``` js
const DeviceHive = require('devicehive');
const wsDeviceHive= new DeviceHive({
    login: 'login',
    password: 'password',
    mainServiceURL: 'ws://<host>:<port>/<path>'
});
wsDeviceHive.connect();
```

## API Reference

  
<a name="DeviceHive"></a>

## DeviceHive
DeviceHive module

**Kind**: global class

* [DeviceHive](#DeviceHive)
    * [new DeviceHive(options)](#new_DeviceHive_new)
    * _instance_
        * [.connect()](#DeviceHive+connect)
    * _static_
        * [.models](#DeviceHive.models) : <code>Object</code>

<a name="new_DeviceHive_new"></a>

### new DeviceHive(options)
DeviceHive module


| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Initial settings |
| [options.accessToken] | <code>string</code> | Access token |
| [options.refreshToken] | <code>string</code> | Refresh token |
| [options.login] | <code>string</code> | Login |
| [options.password] | <code>string</code> | Paaword |
| options.mainServiceURL | <code>string</code> | Main Service URL |
| [options.authServiceURL] | <code>string</code> | Auth Service URL (required only for http) |
| [options.pluginServiceURL] | <code>string</code> | Alug inServi ceURL (required only for http) |

<a name="DeviceHive+connect"></a>

### deviceHive.connect()
Connect and authorize

<a name="DeviceHive.models"></a>

### DeviceHive.models : <code>Object</code>
- Returns DeviceHive models

## License

[DeviceHive] is developed by [DataArt] Apps and distributed under Open Source
[Apache 2.0 license](https://en.wikipedia.org/wiki/Apache_License). 

© Copyright 2018 [DataArt] Apps © All Rights Reserved