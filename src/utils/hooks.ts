import { useState, useRef, useEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export function useControlledState<T>(
  defaultStateValue: T | (() => T),
  option?: {
    value?: T;
  },
): [T, (value: T) => void] {
  const { value } = option || {};
  const [innerValue, setInnerValue] = useState<T>(() => {
    if (value !== undefined) {
      return value;
    } else {
      return typeof defaultStateValue === 'function'
        ? (defaultStateValue as (() => T))()
        : defaultStateValue;
    }
  });

  const mergedValue = value !== undefined ? value : innerValue;

  const triggerChange = (newValue: T) => {
    setInnerValue(newValue);
  };

  return [mergedValue as T, triggerChange];
}

export function useCache<T>(value: T): T {
  const ref = useRef<T>(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

interface EffectDependency {
  old: any;
  new: any;
}

type EffectTrigger = Record<string, EffectDependency>;

export function useExactEffect(effectHook: (trigger: EffectTrigger) => void, dependencies: any[], dependencyNames: string[]) {
  const previousDeps = useCache(dependencies);
  const changedDeps: EffectTrigger = dependencies.reduce((accum, dependency, index) => {
    if (dependency !== previousDeps[index]) {
      const keyName = dependencyNames[index] || index;
      return {
        ...accum,
        [keyName]: {
          old: previousDeps[index],
          new: dependency,
        },
      };
    } else {
      return accum;
    }
  }, {});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => effectHook(changedDeps), dependencies);
}

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>(() => { });

  // 保存新回调
  useEffect(() => {
    savedCallback.current = callback;
  });

  // 建立 interval
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function useMeasure<T extends Element>(): [
  { ref: React.MutableRefObject<T | null> },
  {
    left: number;
    top: number;
    width: number;
    height: number;
  },
] {
  const ref = useRef<T>(null);
  const [bounds, set] = useState({
    left: 0, top: 0, width: 0, height: 0,
  });
  const [ro] = useState(() => new ResizeObserver(([entry]) => {
    requestAnimationFrame(() => set(entry.contentRect));
  }));
  useEffect(() => {
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ro]);
  return [{ ref }, bounds];
}
