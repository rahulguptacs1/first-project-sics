import { useRef, useState } from "react";
import { useEffect } from "react/cjs/react.development";

export const useElementProperty = (
  property,
  attachListener,
  removeListener
) => {
  const [propertyValue, setPropertyValue] = useState();
  const ref = useRef();
  useEffect(() => {
    setPropertyValue(ref.current[property]);
    const cb = () => {
      setPropertyValue(ref.current[property]);
    };
    attachListener(cb);
    return () => {
      removeListener(cb);
    };
  }, []);
  return {
    propertyValue,
    ref,
  };
};
