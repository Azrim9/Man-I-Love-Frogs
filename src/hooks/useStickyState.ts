import { useState, useEffect } from "react";

const useStickyState = (defaultValue, key) => {
  const [value, setValue] = useState(() => {
    const persistedValue = window.localStorage.getItem(key);
    return persistedValue !== null ? JSON.parse(persistedValue) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value]);
  return [value, setValue];
};

export default useStickyState;
