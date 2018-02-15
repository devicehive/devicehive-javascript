const chai = require(`chai`);
const assert = chai.assert;
const UserCountQuery = require('../../../src/models/query/UserCountQuery.js');

describe('UserCountQuery', () => {

    const expected = {
        login: 'string',
        loginPattern: 'string',
        role: 1,
        status: 1,
    };


    describe(('UserCountQuery fileds'), () => {
        it('should create userCountQuery', () => {
            const userCountQuery = new UserCountQuery(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof userCountQuery[key] !== 'undefined');
            });
        });
    });

    describe(('UserCountQuery .toObject'), () => {
        it('should convert userCountQuery to object', () => {
            const userCountQuery = new UserCountQuery(expected);
            const userCountQueryObject = userCountQuery.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(userCountQueryObject.hasOwnProperty(key));
            });
        });
    });
});