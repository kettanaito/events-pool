/* @flow */
type EventPoolOptions = {
  /* Name(s) of events to listen to */
  events: Array<string> | string,

  /* Function to call once timeout is reached */
  callback: (pool: Array<mixed>, event?: CustomEvent | Event) => void,

  /* Timeout (ms) before the callback / next aggregation */
  timeout: number,

  /* Aggregate the timeout by its value once next event is caught */
  aggregate: boolean
}

/* Default options */
const defaultOptions: EventPoolOptions = {
  events: '',
  callback: pool => console.log('Accumulated pool:', pool),
  timeout: 20,
  aggregate: false
};

const EventPool = (options: EventPoolOptions) => {
  /* Combine and destruct the options */
  const { events, timeout, callback } = { ...defaultOptions, ...options };

  /* Ensure event names are always in an Array */
  const eventsList = Array.isArray(events) ? events : [events];

  /* Declare internal state variables */
  let pool: Array<any> = [];
  let hasTimerStarted = false;

  /* Loop through each event name and attach a proper event listener to it */
  eventsList.forEach(eventName => document.addEventListener(eventName, (event: CustomEvent | Event) => {
    /* Aggregate custom event details or general event instances */
    pool.push((event instanceof CustomEvent) ? event.detail : event);

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

export default EventPool;
