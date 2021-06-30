import { useState } from "react";
import { useEffect } from "react/cjs/react.development";

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
