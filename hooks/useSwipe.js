import { useSwipeable } from "react-swipeable";
import { useState } from "react";
export const useSwipe = (length) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swipeType, setSwipeType] = useState();
  const nextIndex = () => {
    setSwipeType("left");
    setActiveIndex((prevActiveIndex) => {
      const nIdx = prevActiveIndex + 1;
      if (nIdx === length) {
        return 0;
      }
      return nIdx;
    });
  };
  const prevIndex = () => {
    setSwipeType("right");
    setActiveIndex((prevActiveIndex) => {
      const pIdx = prevActiveIndex - 1;
      if (pIdx === -1) {
        return length - 1;
      }
      return pIdx;
    });
  };
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      nextIndex();
    },
    onSwipedRight: () => {
      prevIndex();
    },
    trackMouse: true,
  });
  return {
    activeIndex,
    setActiveIndex,
    prevIndex,
    nextIndex,
    swipeHandlers,
    swipeType,
  };
};
