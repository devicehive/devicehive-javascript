const chai = require(`chai`);
const assert = chai.assert;
const Configuration = require('../../../src/models/Configuration.js');

describe('Configuration', () => {

    const expected = {
        name: 'string',
        value: 'string'
    };


    describe(('Configuration fileds'), () => {
        it('should create configuration', () => {
            const configuration = new Configuration(expected);

            Object.keys(expected).forEach(key => {
                assert.isTrue(typeof configuration[key] !== 'undefined');
            });
        });
    });

    describe(('Configuration .toObject'), () => {
        it('should convert configuration to object', () => {
            const configuration = new Configuration(expected);
            const configurationObject = configuration.toObject();

            Object.keys(expected).forEach(key => {
                assert.isTrue(configurationObject.hasOwnProperty(key));
            });
        });
    });
});