const chai = require(`chai`);
const assert = chai.assert;
const Command = require('../../../src/models/Command.js');

describe('Command', () => {

    const expected = {
        id: 1,
        command: 'string',
        timestamp: '2018-02-09T10:09:03.032Z',
        lastUpdated: '2018-02-09T10:09:03.032Z',
        userId: 1,
        deviceId: 1,
        networkId: 1,
        parameters: {
            jsonString: 'string'
        },
        lifetime: 0,
        status: 'string',
        result: {
            jsonString: 'string'
        }
    };


    describe(('Command fileds'), () => {
        it('should create command', () => {
            const command = new Command(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof command[key] !== 'undefined');
            });
        });
    });

    describe(('Command .toObject'), () => {
        it('should convert command to object', () => {
            const command = new Command(expected);
            const commandObject = command.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(commandObject.hasOwnProperty(key));
            });
        });
    });
});