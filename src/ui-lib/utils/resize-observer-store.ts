import rafSchd from "raf-schd";

export type ResizeObserverCallback = (
  entry: ResizeObserverEntry,
  observer: ResizeObserver,
) => void;

interface ResizeObserverStore {
  observer: ResizeObserver;
  subscribe(target: Element, callback: ResizeObserverCallback): void;
  unsubscribe(target: Element, callback: ResizeObserverCallback): void;
}

const createResizeObserverStore = (): ResizeObserverStore => {
  const callbacks: WeakMap<
    Element,
    Array<ResizeObserverCallback>
  > = new WeakMap();

  const observer = new ResizeObserver(rafSchd((entries: ResizeObserverEntry[], obs: ResizeObserver) => {
    for (let i = 0; i < entries.length; i += 1) {
      const cbs = callbacks.get(entries[i].target);
      cbs?.forEach((cb) => cb(entries[i], obs));
    }
  }),);

  return {
    observer,
    subscribe(target: Element, callback: ResizeObserverCallback) {
      observer.observe(target);
      const cbs = callbacks.get(target) ?? [];
      cbs.push(callback);
      callbacks.set(target, cbs);
    },
    unsubscribe(target: Element, callback: ResizeObserverCallback) {
      const cbs = callbacks.get(target);
      if (!cbs) {
        return;
      }

      const index = cbs.indexOf(callback);
      if (index !== -1) {
        cbs.splice(index, 1);
      }

      if (cbs.length === 0) {
        observer.unobserve(target);
        callbacks.delete(target);
      }
    },
  };
};

let currentResizeObserver: ReturnType<typeof createResizeObserverStore>;

const getResizeObserver = () => {
  if (!currentResizeObserver) {
    currentResizeObserver = createResizeObserverStore();
  }

  return currentResizeObserver;
};

export { getResizeObserver, createResizeObserverStore };
