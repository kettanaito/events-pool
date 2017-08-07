const EventPool = (customOptions) => {
  const options = Object.assign({}, {
    events: [],
    callback: () => ({}),
    timeout: 500,
  }, customOptions);

  const pool = [];
  const hasTimerStarted = false;

  events.forEach(eventName => document.addEventListener(eventName, (event) => {
    pool.push(event.detail);

    if (!hasTimerStarted) {
      hasTimerStarted = true;
      setTimeout(() => callback(pool, event), options.timeout);
    }
  }, false));
};

module.exports = EventPool;
