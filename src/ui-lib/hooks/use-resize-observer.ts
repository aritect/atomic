import { type RefObject } from "react";

import { useIsomorphicLayoutEffect } from "@alxshelepenok/react-hooks";

import { useLatest } from "@/hooks-ui-lib/use-latest";
import { getResizeObserver, type ResizeObserverCallback } from "@/utils-ui-lib/resize-observer-store";

const useResizeObserver = <T extends HTMLElement | null>(
  target: RefObject<T> | T | null,
  callback: ResizeObserverCallback,
): ResizeObserver | undefined => {
  const resizeObserver = typeof window !== "undefined" ? getResizeObserver() : undefined;
  const storedCallback = useLatest(callback);

  useIsomorphicLayoutEffect(() => {
    let isUnsubscribed = false;
    const targetEl = target && "current" in target ? target.current : target;

    if (targetEl) {
      const resizeCallback = (
        entry: ResizeObserverEntry,
        observer: ResizeObserver,
      ) => {
        if (isUnsubscribed) {
          return;
        }
        storedCallback.current(entry, observer);
      };

      resizeObserver?.subscribe(targetEl as HTMLElement, resizeCallback);

      return () => {
        isUnsubscribed = true;
        resizeObserver?.unsubscribe(targetEl as HTMLElement, resizeCallback);
      };
    }

    return undefined;
  }, [target, resizeObserver, storedCallback]);

  return resizeObserver?.observer;
};

export { useResizeObserver };
