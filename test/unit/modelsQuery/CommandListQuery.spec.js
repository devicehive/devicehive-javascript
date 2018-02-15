const chai = require(`chai`);
const assert = chai.assert;
const CommandListQuery = require('../../../src/models/query/CommandListQuery.js');

describe('CommandListQuery', () => {

    const expected = {
        deviceId: 'string',
        start: '2018-02-09T10:09:03.033Z',
        end: '2018-02-09T10:09:03.033Z',
        command: 'string',
        status: 'string',
        sortField: 'string',
        sortOrder: 'string',
        take: 1,
        skip: 1
    };


    describe(('CommandListQuery fileds'), () => {
        it('should create commandListQuery', () => {
            const commandListQuery = new CommandListQuery(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof commandListQuery[key] !== 'undefined');
            });
        });
    });

    describe(('CommandListQuery .toObject'), () => {
        it('should convert commandListQuery to object', () => {
            const commandListQuery = new CommandListQuery(expected);
            const commandListQueryObject = commandListQuery.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(commandListQueryObject.hasOwnProperty(key));
            });
        });
    });
});