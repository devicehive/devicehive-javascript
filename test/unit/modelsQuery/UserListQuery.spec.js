const chai = require(`chai`);
const assert = chai.assert;
const UserListQuery = require('../../../src/models/query/UserListQuery.js');

describe('UserListQuery', () => {

    const expected = {
        login: 'string',
        loginPattern: 'string',
        role: 1,
        status: 1,
        sortField: 'string',
        sortOrder: 'string',
        take: 1,
        skip: 1,
    };


    describe(('UserListQuery fileds'), () => {
        it('should create userCountQuery', () => {
            const userCountQuery = new UserListQuery(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof userCountQuery[key] !== 'undefined');
            });
        });
    });

    describe(('UserListQuery .toObject'), () => {
        it('should convert userCountQuery to object', () => {
            const userCountQuery = new UserListQuery(expected);
            const userCountQueryObject = userCountQuery.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(userCountQueryObject.hasOwnProperty(key));
            });
        });
    });
});