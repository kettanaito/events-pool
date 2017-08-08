const EventPool = (customOptions) => {
  const options = Object.assign({}, {
    events: '',
    callback: () => ({}),
    timeout: 15,
  }, customOptions);

  const { events } = options;

  const eventsList = Array.isArray(events) ? events : [events];
  let pool = [];
  let hasTimerStarted = false;

  eventsList.forEach(eventName => document.addEventListener(eventName, (event) => {
    pool.push(event.detail);

    /* Set off the timeout after first caught event */
    if (!hasTimerStarted) {
      hasTimerStarted = true;

      setTimeout(() => {
        callback(pool, event);

        /* Empty the inner state for further accumulation */
        pool = [];
        hasTimerStarted = false;
      }, options.timeout);
    }
  }, false));
};

module.exports = EventPool;
