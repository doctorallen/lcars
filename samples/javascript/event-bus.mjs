export class EventBus {
  #listeners = new Map();

  on(eventName, listener) {
    const listeners = this.#listeners.get(eventName) ?? new Set();
    listeners.add(listener);
    this.#listeners.set(eventName, listeners);

    return () => listeners.delete(listener);
  }

  async emit(eventName, payload = {}) {
    const listeners = [...(this.#listeners.get(eventName) ?? [])];
    const results = await Promise.allSettled(
      listeners.map(async (listener) => listener({ eventName, payload, sentAt: new Date() })),
    );

    return results.filter(({ status }) => status === 'rejected');
  }
}

const bus = new EventBus();
bus.on('relay:ready', ({ payload }) => {
  console.log(`Relay ${payload.id} is ready at ${payload.location ?? 'an unknown location'}.`);
});

await bus.emit('relay:ready', { id: 'NR-7', location: 'Sector Nine' });
