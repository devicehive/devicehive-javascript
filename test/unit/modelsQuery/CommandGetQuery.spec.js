const chai = require(`chai`);
const assert = chai.assert;
const CommandGetQuery = require('../../../src/models/query/CommandGetQuery.js');

describe('CommandGetQuery', () => {

    const expected = {
        returnUpdatedCommands: true
    };


    describe(('CommandGetQuery fileds'), () => {
        it('should create commandGetQuery', () => {
            const commandGetQuery = new CommandGetQuery(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof commandGetQuery[key] !== 'undefined');
            });
        });
    });

    describe(('CommandGetQuery .toObject'), () => {
        it('should convert commandGetQuery to object', () => {
            const commandGetQuery = new CommandGetQuery(expected);
            const commandGetQueryObject = commandGetQuery.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(commandGetQueryObject.hasOwnProperty(key));
            });
        });
    });
});