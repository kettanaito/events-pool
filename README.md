# Event pool
Accumulate multiple events from different sources into a single pool and dispatch a callback function afterward.

## Getting started
### Installation
Install `event-pool` using NPM:
```
npm install --save event-pool
```

### Usage
```js
import EventPool from 'event-pool';

/* Create a new event pool */
new EventPool({
  events: 'promotionView',
  callback(pool) {
    dataLayer.push(pool);
  }
});

/* Dispatch a custom event with data */
const promoViewEvent = new CustomEvent('promotionView', {
  /* Custom data is accessible from callback's "pool" argument */
  detail: { ... }
});

window.dispatchEvent(promoViewEvent);
```

### Options
* `events: Array<string> | string` Event(s) to listen to.
* `eventTarget: EventTarget` Custom EventTarget (default: `document`).
* `timeout: number` Timeout duration (ms), or aggregate time (when `aggregate` is set to `true`).
* `callback: Function(pool: Array<mixed>, event: CustomEvent | Event)` Callback function to call after the set timeout is reached (or aggregation timeout is idle). A `pool` argument accumulates the data passed in `CustomEvent.detail`, or an event instances (in case of listening to general events).
* `aggregate: boolean` Enable aggregation mode. In this mode each next bubbled event prolongs the duration of the listener by the `timeout` value. Once no new event was dispatched within the aggregation period, a callback function is being called.

## Contribution
Feel free to submit a new [Issue](https://github.com/kettanaito/event-pool/issues) or a [Pull request](https://github.com/kettanaito/event-pool/pulls) in case you find the essential functionality missing in `EventPool`, or discover a bug.