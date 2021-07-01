import { useState, useEffect } from "react";

export const useDelayed = (value, delay) => {
  const [copy, setCopy] = useState(value);
  useEffect(() => {
    setTimeout(() => {
      setCopy(value);
    }, delay);
  }, [value]);
  return {
    copy,
  };
};
