'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
/**
 *
 * Copied from @mantine/hooks:
 * packages/@mantine/hooks/src/use-debounced-state/use-debounced-state.ts
 */
export function useDebouncedState<T = any>(
  defaultValue: T,
  wait: number,
  options = { leading: false }
) {
  'use client';
  const [value, setValue] = useState(defaultValue);
  const timeoutRef = useRef<number | null>(null);
  const leadingRef = useRef(true);

  const clearTimeout = () => window.clearTimeout(timeoutRef.current!);
  useEffect(() => clearTimeout, []);

  const debouncedSetValue = useCallback(
    (newValue: T) => {
      clearTimeout();
      if (leadingRef.current && options.leading) {
        setValue(newValue);
      } else {
        timeoutRef.current = window.setTimeout(() => {
          leadingRef.current = true;
          setValue(newValue);
        }, wait);
      }
      leadingRef.current = false;
    },
    [options.leading, wait]
  );

  return [value, debouncedSetValue] as const;
}
