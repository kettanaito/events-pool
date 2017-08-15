function createElement (elementName) {
  return document.body.appendChild(document.createElement(elementName));
}

describe('Technical:', () => {
  it('Can be imported', () => {
    return expect(EventPool).to.not.be.undefined;
  })
});

describe('Basics:', () => {
  it('Dispatch events from document by defaul', (done) => {
    EventPool({
      events: 'documentEvent',
      callback() {
        return done();
      }
    });

    document.dispatchEvent(new CustomEvent('documentEvent'));
  });

  it('Dispatch events from custom eventTarget', (done) => {
    const eventTarget = createElement('eventtarget');

    EventPool({
      events: 'click',
      eventTarget,
      callback() {
        return done();
      }
    });

    eventTarget.click();
  });

  it('Single event: Catch correctly', (done) => {
    EventPool({
      events: 'customEvent',
      callback() {
        return done();
      }
    });

    const customEvent = new CustomEvent('customEvent');
    document.dispatchEvent(customEvent);
  });

  it('Single event: Receive data successfully', (done) => {
    EventPool({
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

  it('Multiple events: Catch correctly', (done) => {
    EventPool({
      events: 'multipleEvent_1',
      callback(pool) {
        expect(pool.length).to.equal(2);
        return done();
      }
    });

    const eventEntity = new CustomEvent('multipleEvent_1');

    document.dispatchEvent(eventEntity);
    document.dispatchEvent(eventEntity);
  });

  it('Multiple events: Aggregate data successfully', (done) => {
    EventPool({
      events: 'multipleEvent_2',
      callback(pool) {
        const sum = pool.reduce((number, entry) => number += entry.number, 0);

        expect(pool.length).to.equal(2);
        expect(sum).to.equal(10);
        return done();
      }
    });

    document.dispatchEvent(new CustomEvent('multipleEvent_2', {
      detail: { number: 2 }
    }));
    document.dispatchEvent(new CustomEvent('multipleEvent_2', {
      detail: { number: 8 }
    }));
  });
});