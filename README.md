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
#### `events: Array<string> | string`
A single event, or a list of event names to listen to.

#### `eventTarget: EventTarget`
**Default:** `document`

Target of the subscribed event(s). For example, a DOMElement.

#### `timeout: number`
A duration (ms) of the timeout. When `aggregate: true`, stands for a time limit within which a new event is expected after catching the previous one.

#### `callback: Function(pool: Array<mixed>, event: CustomEvent | Event)`
A callback function executed once the timeout is reached. Each caught event is being accumulated into a `pool` argument. Depending on the type of the caught event, whether it is a general `Event` or a `CustomEvent`, pool gathers `Event` Objects or `CustomEvent.details` respectively.

#### `aggregate: boolean`
Enable/disable aggregation mode. When the latter is enabled, each caught event prolongs the time within the pool expect to receive a new event by the amount of `timeout`. Once no events are received within this time period, a `callback` function is called.

## Contribution
Feel free to submit a new [Issue](https://github.com/kettanaito/event-pool/issues) or a [Pull request](https://github.com/kettanaito/event-pool/pulls) in case you find the essential functionality missing in `EventsPool`, or discover a bug.
