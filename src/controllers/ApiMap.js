const API = require(`./API`);
const HttpApiReslover = require(`./HttpApiReslover`);
const WebSocketApiReslover = require(`./WebSocketApiReslover`);
const apiMap = new Map();


apiMap.set(API.login, { http: { method: 'POST', uri: '/token'}, ws: { action: 'token' } }); 
apiMap.set(API.createUserToken, { http: { method: 'POST', uri: '/token/create'}, ws: { action: 'token/create', bodyKey: 'payload' } }); 
apiMap.set(API.refreshToken, { http: { method: 'POST', uri: '/token/refresh'}, ws: { action: 'token/refresh' } }); 
apiMap.set(API.createPluginToken, { http: { method: 'POST', uri: '/token/plugin/create'}, ws: {} }); //TODO WS
apiMap.set(API.authenticatePlugin, { http: { method: 'POST', uri: '/token/plugin/authenticate'}, ws: {} }); //TODO WS

apiMap.set(API.getServerInfo, { http: { method: 'GET', uri: '/info' }, ws: { action: 'server/info' } }); 
apiMap.set(API.getClusterInfo, { http: { method: 'GET', uri: '/info/config/cluster' }, ws: { action: 'cluster/info' } }); 

apiMap.set(API.getConfiguration, { http: { method: 'GET', uri: '/configuration/{name}' }, ws: { action: 'configuration/get' } }); 
apiMap.set(API.putConfiguration, { http: { method: 'PUT', uri: '/configuration/{name}' }, ws: { action: 'configuration/put' } }); 
apiMap.set(API.deleteConfiguration, { http: { method: 'DELETE', uri: '/configuration/{name}' }, ws: { action: 'configuration/delete' } }); 

apiMap.set(API.listDevice, { http: { method: 'GET', uri: '/device'}, ws: { action: 'device/list' } }); 
apiMap.set(API.countDevice, { http: { method: 'GET', uri: '/device/count'}, ws: { action: 'device/count' } }); 
apiMap.set(API.getDevice, { http: { method: 'GET', uri: '/device/{id}'}, ws: { action: 'device/get' } }); 
apiMap.set(API.addDevice, { http: { method: 'PUT', uri: '/device/{id}'}, ws: { action: 'device/save', bodyKey: 'device' } }); 
apiMap.set(API.deleteDevice, { http: { method: 'DELETE', uri: '/device/{id}'}, ws: { action: 'device/delete' } }); 

apiMap.set(API.listDeviceType, { http: { method: 'GET', uri: '/devicetype'}, ws: { action: 'devicetype/list' } }); 
apiMap.set(API.countDeviceType, { http: { method: 'GET', uri: '/devicetype/count'}, ws: { action: 'devicetype/count' } }); 
apiMap.set(API.getDeviceType, { http: { method: 'GET', uri: '/devicetype/{id}'}, ws: { action: 'devicetype/get' } }); 
apiMap.set(API.addDeviceType, { http: { method: 'POST', uri: '/devicetype'}, ws: { action: 'devicetype/insert', bodyKey: 'deviceType' } }); 
apiMap.set(API.updateDeviceType, { http: { method: 'PUT', uri: '/devicetype/{id}'}, ws: { action: 'devicetype/update', bodyKey: 'deviceType' } }); 
apiMap.set(API.deleteDeviceType, { http: { method: 'DELETE', uri: '/devicetype/{id}'}, ws: { action: 'devicetype/delete' } }); 

apiMap.set(API.listCommand, { http: { method: 'GET ', uri: '/device/{deviceId}/command'}, ws: { action: 'command/list' } }); 
apiMap.set(API.getCommand, { http: { method: 'GET ', uri: '/device/{deviceId}/command/{commandId}'}, ws: { action: 'command/get' } }); 
apiMap.set(API.insertCommand, { http: { method: 'POST', uri: '/device/{deviceId}/command'}, ws: { action: 'command/insert', bodyKey: 'command' } }); 
apiMap.set(API.updateCommand, { http: { method: 'POST', uri: '/device/{deviceId}/command/{commandId}'}, ws: { action: 'command/update', bodyKey: 'command' } }); 
apiMap.set(API.pollCommand, { http: { method: 'GET', uri: '/device/{deviceId}/command/{commandId}/poll'} }); 
apiMap.set(API.pollManyCommand, { http: { method: 'GET', uri: '/device/command/poll'} }); 
apiMap.set(API.waitCommand, { http: { method: 'GET', uri: '/device/{deviceId}/command/{commandId}/poll'} }); 
apiMap.set(API.subscribeCommand, { ws: { action: 'command/subscribe' } }); 
apiMap.set(API.unsubscribeCommand, { ws: { action: 'command/unsubscribe' } }); 

apiMap.set(API.listNotification, { http: { method: 'GET ', uri: '/device/{deviceId}/notification'}, ws: { action: 'notification/list' } }); 
apiMap.set(API.getNotification, { http: { method: 'GET ', uri: '/device/{deviceId}/notification/{id}'}, ws: { action: 'notification/get' } }); 
apiMap.set(API.insertNotification, { http: { method: 'POST', uri: '/device/{deviceId}/notification'}, ws: { action: 'notification/insert', bodyKey: 'notification' } }); 
apiMap.set(API.pollNotification, { http: { method: 'GET', uri: '/device/{deviceId}/notification/poll'} }); 
apiMap.set(API.pollManyNotification, { http: { method: 'GET', uri: '/device/notification/poll'} }); 
apiMap.set(API.subscribeNotification, { ws: { action: 'notification/subscribe' } }); 
apiMap.set(API.unsubscribeNotification, { ws: { action: 'notification/unsubscribe' } }); 

apiMap.set(API.listNetwork, { http: { method: 'GET', uri: '/network'}, ws: { action: 'network/list' } }); 
apiMap.set(API.countNetwork, { http: { method: 'GET', uri: '/network/count'}, ws: { action: 'network/count' } }); 
apiMap.set(API.getNetwork, { http: { method: 'GET', uri: '/network/{id}'}, ws: { action: 'network/get' } }); 
apiMap.set(API.addNetwork, { http: { method: 'POST', uri: '/network'}, ws: { action: 'network/insert', bodyKey: 'network' } }); 
apiMap.set(API.updateNetwork, { http: { method: 'PUT', uri: '/network/{id}'}, ws: { action: 'network/update', bodyKey: 'network' } }); 
apiMap.set(API.deleteNetwork, { http: { method: 'DELETE', uri: '/network/{id}'}, ws: { action: 'network/delete' } }); 

apiMap.set(API.listUser, { http: { method: 'GET', uri: '/user'}, ws: { action: 'user/list' } });  
apiMap.set(API.countUser, { http: { method: 'GET', uri: '/user/count'}, ws: { action: 'user/count' } });  
apiMap.set(API.getUser, { http: { method: 'GET', uri: '/user/{id}'}, ws: { action: 'user/get' } });  
apiMap.set(API.addUser, { http: { method: 'POST', uri: '/user'}, ws: { action: 'user/insert', bodyKey: 'user' } });  
apiMap.set(API.updateUser, { http: { method: 'PUT', uri: '/user/{id}'}, ws: { action: 'user/update', bodyKey: 'user' } });  
apiMap.set(API.deleteUser, { http: { method: 'DELETE', uri: '/user/{id}'}, ws: { action: 'user/delete' } });  
apiMap.set(API.getCurrentUser, { http: { method: 'GET', uri: '/user/current'}, ws: { action: 'user/getCurrent' } });  
apiMap.set(API.updateCurrentUser, { http: { method: 'PUT', uri: '/user/current'}, ws: { action: 'user/updateCurrent', bodyKey: 'user' } });  
apiMap.set(API.getUserNetwork, { http: { method: 'GET', uri: '/user/{id}/network/{networkId}'}, ws: { action: 'user/getNetwork' } });  
apiMap.set(API.assignNetwork, { http: { method: 'PUT', uri: '/user/{id}/network/{networkId}'}, ws: { action: 'user/assignNetwork' } });  
apiMap.set(API.unassignNetwork, { http: { method: 'DELETE', uri: '/user/{id}/network/{networkId}'}, ws: { action: 'user/unassignNetwork' } });  

apiMap.set(API.registerPlugin, { http: { method: 'POST', uri: '/plugin/register'} }); // TODO WS


/**
 *
 */
class ApiMap {

    /**
     *
     * @param transport
     * @param key
     * @param parameters
     * @param body
     */
    static build(transport, key, parameters, body) {
        let transportAPI;

        switch (transport) {
            case 'http':
                transportAPI = new HttpApiReslover(apiMap.get(key).http);
                break;
            case 'ws':
                transportAPI = new WebSocketApiReslover(apiMap.get(key).ws);
                break;
        }

        return transportAPI.build(parameters, body);
    }
}


module.exports = ApiMap;