import { useDelayed } from "@hooks/useDelayed";
import { usePrevious } from "@hooks/usePrevious";
import styles from "@styles/Shared/MobileView.module.scss";
import { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { CSSTransition } from "react-transition-group";
function MobileView({ items = [], activeIndex, setActiveIndex }) {
  const [swipeType, setSwipeType] = useState("left");
  const prevActiveIndex = usePrevious(activeIndex);
  const delayedActiveIndex = useDelayed(activeIndex, 1);
  const itemRef = useRef();
  useEffect(() => {
    // console.log("active", activeIndex);
    // console.log("prev Active", prevActiveIndex);
    if (activeIndex > prevActiveIndex) {
      if (activeIndex === items.length - 1 && prevActiveIndex === 0)
        setSwipeType("right");
      else setSwipeType("left");
    } else {
      if (activeIndex === 0 && prevActiveIndex === items.length - 1)
        setSwipeType("left");
      else setSwipeType("right");
    }
  }, [activeIndex]);
  const prevIndex = () => {
    let prevActiveIndex = activeIndex - 1;
    if (prevActiveIndex >= 0) {
      setActiveIndex(prevActiveIndex);
    } else {
      setActiveIndex(items.length - 1);
    }
  };
  const nextIndex = () => {
    let nextActiveIndex = activeIndex + 1;
    if (nextActiveIndex < items.length) {
      setActiveIndex(nextActiveIndex);
    } else {
      setActiveIndex(0);
    }
  };
  const handlers = useSwipeable({
    onSwipedLeft: nextIndex,
    onSwipedRight: prevIndex,
    trackMouse: true,
  });
  return (
    <div
      className={styles.mobileView}
      style={{
        width: itemRef.current?.offsetWidth + "px",
        height: itemRef.current?.offsetHeight + "px",
      }}
      {...handlers}
    >
      {items.map((item, i) => {
        return (
          <CSSTransition
            key={i}
            in={i === delayedActiveIndex}
            timeout={300}
            classNames={`mobile-swipe-${swipeType}`}
            unmountOnExit
          >
            <div className={styles.item} ref={itemRef}>
              {item}
            </div>
          </CSSTransition>
        );
      })}
    </div>
  );
}

export default MobileView;
