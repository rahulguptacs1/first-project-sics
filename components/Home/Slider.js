import Carousel from "react-multi-carousel";
import { useState, useEffect, useRef } from "react";
import ImageOpenView from "@components/Home/Card/ImageOpenView";
import Card from "@components/Home/Card/Card";
import styles from "@styles/Home/Slider.module.scss";
import { isMobile } from "react-device-detect";
import { conditionalLog } from "helpers/utils";
const clog = conditionalLog(false, {
  interval: true,
  index: true,
});
const responsive = {
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
function Slider({ products }) {
  const [isMoving, setIsMoving] = useState();
  const carouselRef = useRef();
  const [openImageIdx, setOpenImageIdx] = useState(-1);
  const componentMountedRef = useRef(true);
  const intervalRef = useRef();
  const timeoutRef = useRef();
  const startAutoScroll = () => {
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
  return (
    <div className={styles.slider}>
      {products.map((product, i) =>
        i === openImageIdx ? (
          <ImageOpenView
            key={i}
            src={product.node.images.edges[0].node.urlOriginal}
            close={() => {
              setOpenImageIdx(-1);
            }}
          />
        ) : null
      )}
      <Carousel
        arrows={!isMobile}
        ssr={true}
        infinite={true} // loops
        showDots={true}
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
        {products.map((product, i) => (
          <Card
            key={i}
            product={product}
            openImage={false}
            detectClick={() => {
              if (!isMoving) setOpenImageIdx(clog.c(i, clog.index));
            }}
          />
        ))}
      </Carousel>
    </div>
  );
}

export default Slider;
