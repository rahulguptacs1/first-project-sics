import Carousel from "react-multi-carousel";
import { useState, useEffect, useRef } from "react";

import { isMobile } from "react-device-detect";
import { conditionalLog } from "helpers/utils";
const clog = conditionalLog(false, {
  interval: true,
  index: true,
});
const responsiveDefault = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    partialVisibilityGutter: 40,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    partialVisibilityGutter: 30,
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 600 },
    items: 2,
    partialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
    // removing partialVisibilityGutter actually defaults to zero
    // so we have no next item visible
  },
};
function Slider({
  infinite = true,
  showDots = true,
  arrows = !isMobile,
  autoScroll = true,
  responsive = responsiveDefault,
}) {
  const [isMoving, setIsMoving] = useState(false);
  const carouselRef = useRef();
  const componentMountedRef = useRef(true);
  const intervalRef = useRef();
  const timeoutRef = useRef();
  const startAutoScroll = () => {
    if (autoScroll) {
      intervalRef.current = setInterval(() => {
        clog.c("interval ran", clog.interval);
        if (componentMountedRef.current && carouselRef.current) {
          clog.c("updating state", clog.interval);
          const nextSlide = carouselRef.current.state.currentSlide + 1;
          carouselRef.current.goToSlide(nextSlide, {
            skipBeforeChange: true,
          });
        } else {
          clearInterval(intervalRef.current);
        }
      }, 3000);
      clog.c("interval set " + intervalRef.current, clog.interval);
    }
  };
  useEffect(() => {
    const keyDownCallback = (e) => {
      clog.c(e.key);
      switch (e.key) {
        case "ArrowLeft":
          carouselRef.current.previous();
          break;
        case "ArrowRight":
          carouselRef.current.next();
          break;
      }
    };
    window.addEventListener("keydown", keyDownCallback);
    startAutoScroll();
    return () => {
      componentMountedRef.current = false;
      window.removeEventListener("keydown", keyDownCallback);
    };
  }, []);
  const manualControl = () => {
    clog.c("manual control", clog.interval);
    clearInterval(intervalRef.current);
    clog.c("interval cleared " + intervalRef.current, clog.interval);
    clearTimeout(timeoutRef.current);
    clog.c("timeout cleared " + timeoutRef.current, clog.interval);
    timeoutRef.current = setTimeout(() => {
      startAutoScroll();
    }, 3000);
    clog.c("timeout set " + timeoutRef.current, clog.interval);
  };
  return ({ insideCarousel = () => null, outSideCarousel = () => null }) => {
    // console.log(isMoving);
    return (
      <div>
        {outSideCarousel({
          isMoving,
          prev: () => carouselRef.current?.previous(),
          next: () => carouselRef.current?.next(),
        })}
        <Carousel
          arrows={arrows}
          ssr={true}
          infinite={infinite} // loops
          showDots={showDots}
          ref={(el) => (carouselRef.current = el)}
          responsive={responsive}
          beforeChange={() => {
            //   console.log("before change");
            setIsMoving(true);
            manualControl();
          }}
          afterChange={() => {
            //   console.log("after change");
            setIsMoving(false);
          }}
          partialVisible={true}
        >
          {insideCarousel({
            isMoving,
            prev: () => carouselRef.current?.previous(),
            next: () => carouselRef.current?.next(),
          })}
        </Carousel>
      </div>
    );
  };
}

export default Slider;
