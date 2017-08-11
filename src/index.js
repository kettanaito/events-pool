/* @flow */
type EventPoolOptions = {
  events: Array<string> | string,
  callback: Function,
  timeout: number
}

/* Default options */
const defaultOptions: EventPoolOptions = {
  events: [],
  timeout: 20
};

const EventPool = (options: EventPoolOptions) => {
  const { events, timeout, callback } = { ...defaultOptions, ...options };

  /* Ensure event names are always in an Array */
  const eventsList = Array.isArray(events) ? events : [events];

  /* Declare internal state variables */
  let pool = [];
  let hasTimerStarted = false;

  /* Loop through each event name and attach a proper event listener to it */
  eventsList.forEach(eventName => document.addEventListener(eventName, (event) => {
    pool.push(event.detail);

    if (!hasTimerStarted) {
      /* Set off the timeout after first caught event */
      hasTimerStarted = true;

      /* Set the timeout to execute a callback function after it is reached */
      setTimeout(() => {
        callback(pool, event);

        /* Reset the inner state for the further accumulation */
        pool = [];
        hasTimerStarted = false;
      }, timeout);
    }
  }, false));
};

module.exports = EventPool;
