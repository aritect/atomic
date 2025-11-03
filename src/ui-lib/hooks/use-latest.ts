import { type MutableRefObject, useRef } from "react";

const useLatest = <T extends unknown>(current: T): MutableRefObject<T> => {
  const storedValue = useRef(current);
  storedValue.current = current;
  return storedValue;
};

export { useLatest };
