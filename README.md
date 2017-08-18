![Package version](https://badge.fury.io/js/events-pool.svg)
![Dependencies Status](https://david-dm.org/kettanaito/events-pool.svg)

<p align="center">
  <a href="https://github.com/kettanaito/events-pool">
    <img src="./icon.png" />
  </a>
</p>

# Events pool
Accumulate multiple events from different sources into a single pool and dispatch a callback function afterward. Supports data aggregation as well!

## Getting started
### Installation
Install `events-pool` using NPM:
```
npm install --save events-pool
```

### Usage
```js
import EventsPool from 'events-pool';

/* Create a new event pool */
new EventsPool({
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

document.dispatchEvent(promoViewEvent);
```

### Options
* `events: Array<string> | string` Event(s) to listen to.
* `eventTarget: EventTarget` Custom EventTarget (default: `document`).
* `timeout: number` Timeout duration (ms), or aggregate time (when `aggregate` is set to `true`).
* `callback: Function(pool: Array<mixed>, event: CustomEvent | Event)` Callback function to call after the set timeout is reached (or aggregation timeout is idle). A `pool` argument accumulates the data passed in `CustomEvent.detail`, or an event instances (in case of listening to general events).
* `aggregate: boolean` Enable aggregation mode. In this mode each next bubbled event prolongs the duration of the listener by the `timeout` value. Once no new event was dispatched within the aggregation period, a callback function is being called.

## Contribution
Feel free to submit a new [Issue](https://github.com/kettanaito/event-pool/issues) or a [Pull request](https://github.com/kettanaito/event-pool/pulls) in case you find the essential functionality missing in `EventsPool`, or discover a bug.
