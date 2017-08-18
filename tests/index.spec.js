function createElement (elementName) {
  return document.body.appendChild(document.createElement(elementName));
}

/**
 * Module
 */
describe('Module', () => {
  it('Can be imported', () => {
    return expect(EventPool).to.not.be.undefined;
  })
});

/**
 * Basics
 */
describe('Basics', () => {
  it('Dispatch events from document by default', (done) => {
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

  /**
   * Single event
   */
  describe('Single event', () => {
    it('Catch event correctly', (done) => {
      EventPool({
        events: 'customEvent',
        callback() {
          return done();
        }
      });
  
      const customEvent = new CustomEvent('customEvent');
      document.dispatchEvent(customEvent);
    });
  
    it('Receive data successfully', (done) => {
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
  });

  /**
   * Multiple events
   */
  describe('Multiple events', () => {
    it('Catch events correctly', (done) => {
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

    it('Aggregate data successfully', (done) => {
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

});

/**
 * Advanced
 */
describe('Advanced', () => {

  describe('Aggregation mode', () => {
    it('Enable only when explicitly requested', function (done) {
      EventPool({
        events: 'aggregateEvent_2',
        timeout: 300,
        callback(pool) {
          console.log('test1:', pool);
          expect(pool.length).to.equal(2);
          return done();
        }
      });

      const customEvent = new CustomEvent('aggregateEvent_2');
      const dispatchEvent = () => document.dispatchEvent(customEvent);
      dispatchEvent();

      setTimeout(() => dispatchEvent(), 200);
      setTimeout(() => dispatchEvent(), 400);
    });

    it('Calculate aggregation timeout correctly', (done) => {
      EventPool({
        events: 'aggregateEvent',
        aggregate: true,
        timeout: 300,
        callback(pool) {
          expect(pool.length).to.equal(3);
          return done();
        }
      });
  
      const aggregateEvent = new CustomEvent('aggregateEvent');
      const dispatchEvent = (callback) => {
        document.dispatchEvent(aggregateEvent);
        if (callback) callback();
      };
  
      /* Dispatch delayed events */
      dispatchEvent(() => setTimeout(() => {
        dispatchEvent(() => setTimeout(() => {
          dispatchEvent();
        }, 200));
      }, 100));
    });

  });

});
