import { type RefObject, useCallback, useEffect, useState } from "react";

import { useResizeObserver } from "@/hooks-ui-lib/use-resize-observer";

const useIsOverflown = <T>(
  ref: RefObject<HTMLElement | null>,
  dependencyValue: T,
  checkYOverflown?: boolean,
): boolean => {
  const [isOverflown, setIsOverflown] = useState(false);

  const updateOverflown = useCallback(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    setIsOverflown(checkYOverflown
      ? element.scrollHeight > element.clientHeight
      : element.offsetWidth < element.scrollWidth,);
  }, [checkYOverflown, ref]);

  useResizeObserver(ref, updateOverflown);

  useEffect(() => {
    updateOverflown();
  }, [updateOverflown, dependencyValue]);

  return isOverflown;
};

export { useIsOverflown };
