const expect = require('chai').expect;
const EventPool = require('../lib');

describe('Basics:', () => {
    it('Exported correctly', () => {
        return expect(EventPool).to.not.be.undefined;
    });
});
