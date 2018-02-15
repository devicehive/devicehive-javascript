const chai = require(`chai`);
const assert = chai.assert;
const CommandWaitQuery = require('../../../src/models/query/CommandWaitQuery.js');

describe('CommandWaitQuery', () => {

    const expected = {
        waitTimeout: 1
    };


    describe(('CommandWaitQuery fileds'), () => {
        it('should create commandWaitQuery', () => {
            const commandWaitQuery = new CommandWaitQuery(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof commandWaitQuery[key] !== 'undefined');
            });
        });
    });

    describe(('CommandWaitQuery .toObject'), () => {
        it('should convert commandWaitQuery to object', () => {
            const commandWaitQuery = new CommandWaitQuery(expected);
            const commandWaitQueryObject = commandWaitQuery.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(commandWaitQueryObject.hasOwnProperty(key));
            });
        });
    });
});