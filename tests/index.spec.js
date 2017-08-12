describe('Technical:', () => {
  it('Can be imported', () => {
    return expect(EventPool).to.not.be.undefined;
  })
});

describe('Basics:', () => {
  it('Single event: Catch correctly', (done) => {
    new EventPool({
      events: 'customEvent',
      callback() {
        done();
      }
    });

    const customEvent = new CustomEvent('customEvent');
    document.dispatchEvent(customEvent);
  });

  it('Single event: Receive CustomEvent.detail data', (done) => {
    new EventPool({
      events: 'onApplePick',
      callback(pool) {
        expect(pool).to.not.be.undefined;
        expect(pool[0].apples).to.equal(4);
        return done();
      }
    });

    const customEvent = new CustomEvent('onApplePick', {
      detail: { apples: 4 }
    });
    document.dispatchEvent(customEvent);
  });
});