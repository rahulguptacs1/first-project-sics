import styles from "@styles/Home/Reviews/Reviews.module.scss";
import { useElementProperty } from "@hooks/useElementProperty";
import { useSwipe } from "@hooks/useSwipe";
import { usePrevious } from "@hooks/usePrevious";
import { range, modFunc } from "@helpers/utils";
import { CSSTransition } from "react-transition-group";
import Review from "./Review";
function Reviews() {
  const { activeIndex, swipeHandlers, prevIndex, nextIndex, swipeType } =
    useSwipe(5);
  const prevActiveIndex = usePrevious(activeIndex);
  const { propertyValue: reviewHeight, ref: reviewRef } = useElementProperty(
    "offsetHeight",
    (updaterFunc) => {
      window.addEventListener("resize", () => {
        // console.log("updating height");
        updaterFunc();
      });
    }
  );

  return (
    <div
      className={styles.reviews}
      style={{
        minHeight: `${reviewHeight}px`,
      }}
      {...swipeHandlers}
    >
      {range(0, 4).map((show, i) => {
        return (
          <CSSTransition
            in={i === activeIndex}
            key={i}
            timeout={300}
            classNames={`review-${swipeType}`}
            unmountOnExit
          >
            <div
              className={styles.review}
              style={{ zIndex: modFunc(prevActiveIndex)(i) }}
              ref={reviewRef}
            >
              <Review />
            </div>
          </CSSTransition>
        );
      })}
    </div>
  );
}

export default Reviews;
