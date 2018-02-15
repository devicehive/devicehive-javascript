const chai = require(`chai`);
const assert = chai.assert;
const User = require('../../../src/models/User.js');

describe('User', () => {

    const expected = {
        id: 1,
        login: 'string',
        role: 0,
        status: 0,
        password: 'string',
        lastLogin: '2018-02-09T10:09:03.033Z',
        data: {
            jsonString: 'string'
        },
        introReviewed: false,
        allDeviceTypesAvailable: false
    };


    describe(('User fileds'), () => {
        it('should create user', () => {
            const user = new User(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof user[key] !== 'undefined');
            });
        });
    });

    describe(('User .toObject'), () => {
        it('should convert user to object', () => {
            const user = new User(expected);
            const userObject = user.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(userObject.hasOwnProperty(key));
            });
        });
    });
});