const chai = require(`chai`);
const assert = chai.assert;
const CommandPollManyQuery = require('../../../src/models/query/CommandPollManyQuery.js');

describe('CommandPollManyQuery', () => {

    const expected = {
        deviceIds: 'string',
        networkIds: '2018-02-09T10:09:03.033Z',
        deviceTypeIds: 'string',
        names: 'string',
        timestamp: '2018-02-09T10:09:03.033Z',
        waitTimeout: 1,
        limit: 1
    };


    describe(('CommandPollManyQuery fileds'), () => {
        it('should create commandPollManyQuery', () => {
            const commandPollManyQuery = new CommandPollManyQuery(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof commandPollManyQuery[key] !== 'undefined');
            });
        });
    });

    describe(('CommandPollManyQuery .toObject'), () => {
        it('should convert commandPollManyQuery to object', () => {
            const commandPollManyQuery = new CommandPollManyQuery(expected);
            const commandPollManyQueryObject = commandPollManyQuery.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(commandPollManyQueryObject.hasOwnProperty(key));
            });
        });
    });
});