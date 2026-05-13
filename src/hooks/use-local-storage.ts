"use client";

import { useEffect, useState } from "react";

function readStoredValue<T>(key: string, initialValue: T): T {
  if (typeof window === "undefined") {
    return initialValue;
  }

  const item = window.localStorage.getItem(key);

  if (item === null) {
    return initialValue;
  }

  try {
    return JSON.parse(item) as T;
  } catch {
    return initialValue;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() =>
    readStoredValue(key, initialValue),
  );

  useEffect(() => {
    setStoredValue(readStoredValue(key, initialValue));
  }, [key, initialValue]);

  const setValue = (value: T | ((value: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;

    setStoredValue(valueToStore);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    }
  };

  const removeValue = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
    }
    setStoredValue(initialValue);
  };

  return [storedValue, setValue, removeValue] as const;
}
