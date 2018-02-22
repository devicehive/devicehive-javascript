const chai = require(`chai`);
const assert = chai.assert;
const config = require('../config');

const EventEmitter = require('events');
const events = new EventEmitter();

const DeviceHive = require('../../../index');

const httpDeviceHive = new DeviceHive(config.server.http);
const wsDeviceHive = new DeviceHive(config.server.ws)


const testToken = {
    login: config.server.http.login,
    password: config.server.http.password
};

describe('TokenAPI', () => {

    before(done => {
        // Configaratuion DeviceHive

        Promise.all([httpDeviceHive.connect(), wsDeviceHive.connect()])
            .then(() => done());
    });

    it('TokenAPI.createUserToken()', done => {

        // Configurating Token model
        const token = new DeviceHive.models.UserToken({
            userId: 1,
            actions: ['string'],
            networkIds: ['string'],
            deviceTypeIds: ['string'],
            expiration: '2030-02-09T10:09:03.033Z'
        });

        Promise.all([httpDeviceHive.token.createUserToken(token), wsDeviceHive.token.createUserToken(token)])
            .then(dataAll => {
                for (const data of dataAll) {
                    const expectedkeys = ['accessToken', 'refreshToken'];
                    assert.isObject(data);
                    assert.containsAllKeys(data, expectedkeys);
                    testToken.accessToken = data.accessToken;
                    testToken.refreshToken = data.refreshToken;
                }
            })
            .then(done)
            .catch(done);
    });

    it('TokenAPI.refresh()', done => {

        // Configurating Token model
        
        Promise.all([httpDeviceHive.token.refresh(testToken.refreshToken)])
            .then(dataAll => {
                for (const data of dataAll) {
                    const expectedkeys = ['accessToken'];
                    assert.isObject(data);
                    assert.containsAllKeys(data, expectedkeys);
                    testToken.accessToken = data.accessToken;
                    testToken.refreshToken = data.refreshToken;
                }
            })
            .then(done)
            .catch(done);

        // sent data
        events.once('request', data => {
            assert.equal(data.method, 'POST', 'Not correct method');
            assert.equal(data.url.pathname, `/token/refresh`, 'Not correct URL');
            assert.deepEqual(data.body, expectedBody, 'Not correct body');

            done();
        });
    });


    it('TokenAPI.login()', done => {

        Promise.all([httpDeviceHive.token.login(testToken.login, testToken.password), wsDeviceHive.token.login(testToken.login, testToken.password)])
            .then(dataAll => {
                for (const data of dataAll) {
                    const expectedkeys = ['accessToken', 'refreshToken'];
                    assert.isObject(data);
                    assert.containsAllKeys(data, expectedkeys);
                    testToken.accessToken = data.accessToken;
                    testToken.refreshToken = data.refreshToken;
                }
            })
            .then(done)
            .catch(done)
    });
});