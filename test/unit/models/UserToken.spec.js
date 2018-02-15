const chai = require(`chai`);
const assert = chai.assert;
const UserToken = require('../../../src/models/UserToken.js');

describe('UserToken', () => {

    const expected = {
        userId: 1,
        actions: ['string'],
        networkIds: ['string'],
        deviceTypeIds: ['string'],
        expiration: '2018-02-09T10:09:03.033Z'
    };


    describe(('UserToken fileds'), () => {
        it('should create userToken', () => {
            const userToken = new UserToken(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof userToken[key] !== 'undefined');
            });
        });
    });

    describe(('UserToken .toObject'), () => {
        it('should convert userToken to object', () => {
            const userToken = new UserToken(expected);
            const userTokenObject = userToken.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(userTokenObject.hasOwnProperty(key));
            });
        });
    });
});