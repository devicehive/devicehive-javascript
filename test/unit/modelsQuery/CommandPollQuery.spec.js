const chai = require(`chai`);
const assert = chai.assert;
const CommandPollQuery = require('../../../src/models/query/CommandPollQuery.js');

describe('CommandPollQuery', () => {

    const expected = {
        deviceId: 'string',
        names: 'string',
        timestamp: '2018-02-09T10:09:03.033Z',
        returnUpdatedCommands: 'string',
        waitTimeout: 10,
        limit: 1,
    };


    describe(('CommandPollQuery fileds'), () => {
        it('should create commandPollQuery', () => {
            const commandPollQuery = new CommandPollQuery(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof commandPollQuery[key] !== 'undefined');
            });
        });
    });

    describe(('CommandPollQuery .toObject'), () => {
        it('should convert commandPollQuery to object', () => {
            const commandPollQuery = new CommandPollQuery(expected);
            const commandPollQueryObject = commandPollQuery.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(commandPollQueryObject.hasOwnProperty(key));
            });
        });
    });
});