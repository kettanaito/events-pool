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
  callback(events, data) {
    dataLayer.push(data);
  }
});

/* Dispatch a custom event with data */
const promoViewEvent = new CustomEvent('promotionView', {
  /* Accumulated data is accessible from callback's "data" argument */
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

#### `callback: Function(events: Array<CustomEvent | Event>, data: Array<mixed>)`
A callback function executed once the timeout is reached. An instance of each caught event (`Event` or `CustomEvent`) is being accumulated into a single pool - `events` argument.

Using `CustomEvent.detail` it is possible to pass and accumulate a custom data within the event. All the data provided this way will be accessible under a single `data` argument.

#### `aggregate: boolean`
Enable/disable aggregation mode. When the latter is enabled, each caught event prolongs the time within the pool expect to receive a new event by the amount of `timeout`. Once no events are received within this time period, a `callback` function is called.

## Contribution
Feel free to submit a new [Issue](https://github.com/kettanaito/events-pool/issues) or a [Pull request](https://github.com/kettanaito/events-pool/pulls) in case you find the essential functionality missing in `EventsPool`, or discover a bug.
