import { capitalize } from "@helpers/utils";
import { useEffect } from "react";

export const setDimension = (
  property,
  setElementRef,
  getElementRef,
  runInitially = true
) => {
  // console.log("update dimension called");
  useEffect(() => {
    let cb = () => {
      // console.log(getElementRef.current.style[property]);
      if (setElementRef.current && getElementRef.current) {
        setElementRef.current.style[property] =
          getElementRef.current["offset" + capitalize(property)] + "px";
      }
    };

    window.addEventListener("resize", cb);
    if (runInitially) {
      cb();
    }
    return () => {
      window.removeEventListener("resize", cb);
    };
  }, []);
};
