import { useRef, useState } from "react";
import { useEffect } from "react/cjs/react.development";

export const useElementProperty = (property, attachListener) => {
  const [propertyValue, setPropertyValue] = useState();
  const ref = useRef();
  useEffect(() => {
    setPropertyValue(ref.current[property]);
    attachListener(() => {
      setPropertyValue(ref.current[property]);
    });
  }, []);
  return {
    propertyValue,
    ref,
  };
};
