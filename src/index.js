const EventPool = (customOptions) => {
  const options = Object.assign({}, {
    events: '',
    callback: () => ({}),
    timeout: 500,
  }, customOptions);

  const { events } = options;

  const eventsList = Array.isArray(events) ? events : [events];
  const pool = [];
  const hasTimerStarted = false;

  eventsList.forEach(eventName => document.addEventListener(eventName, (event) => {
    pool.push(event.detail);

    if (!hasTimerStarted) {
      hasTimerStarted = true;
      setTimeout(() => callback(pool, event), options.timeout);
    }
  }, false));
};

module.exports = EventPool;
