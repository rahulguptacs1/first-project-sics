import Carousel from "react-multi-carousel";
import { getConfig } from "@bigcommerce/storefront-data-hooks/api";
import getAllProducts from "@bigcommerce/storefront-data-hooks/api/operations/get-all-products";
import Card from "../components/Card";
import { isMobile } from "react-device-detect";
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
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    // removing partialVisibilityGutter actually defaults to zero
    // so we have no next item visible
  },
};
// when centerMode is true
//  partialVisibilityGutter is 50%
import styles from "../styles/first.module.scss";
import { useEffect, useRef, useState } from "react";
import ImageOpenView from "../components/ImageOpenView";
import next from "next";

function CarouselPrac({ products }) {
  const [isMoving, setIsMoving] = useState();
  const [openImageIdx, setOpenImageIdx] = useState(-1);
  const [myWindow, setMyWindow] = useState();
  const carouselRef = useRef();
  useEffect(() => {
    console.log(window.innerWidth);
    setMyWindow(window);
  }, []);
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      console.log(e.key);
      switch (e.key) {
        case "ArrowLeft":
          carouselRef.current.previous();
          break;
        case "ArrowRight":
          carouselRef.current.next();
          break;
      }
    });
  }, []);
  return (
    <div className={styles.first}>
      <div className={styles.carousel}>
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
          ssr={true}
          showDots={true}
          keyBoardControl={true}
          ref={(el) => (carouselRef.current = el)}
          responsive={responsive}
          transitionDuration={100}
          removeArrowOnDeviceType={["mobile", "tablet"]}
          deviceType={
            myWindow?.innerWidth <= 600
              ? "mobile"
              : myWindow?.innerWidth <= 900
              ? "tablet"
              : "desktop"
          }
          beforeChange={(nextSlide, { currentSlide, onMove }) => {
            console.log("before change");
            setIsMoving(true);
            console.log(nextSlide);
            console.log(currentSlide);
            console.log(onMove);
          }}
          afterChange={() => {
            console.log("after change");
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
                if (!isMoving) setOpenImageIdx(i);
              }}
            />
          ))}
        </Carousel>

        <button
          onClick={() => {
            const nextSlide = carouselRef.current.state.currentSlide + 1;
            carouselRef.current.next();
            // carouselRef.current.goToSlide(nextSlide, {
            //   skipBeforeChange: true,
            // });
          }}
        >
          next slide
        </button>
        <button
          onClick={() => {
            const nextSlide = carouselRef.current.state.currentSlide + 1;
            carouselRef.current.previous();
            // carouselRef.current.goToSlide(nextSlide, {
            //   skipBeforeChange: true,
            // });
          }}
        >
          prev slide
        </button>
        {products.map((product, i) => (
          <p
            key={i}
            onClick={() => {
              carouselRef.current.goToSlide(i, false);
              // true -> before and after change are not ran
              // {skipBeforeChange: true,} -> before change is not ran
              // false -> both are ran
            }}
          >
            {i}
          </p>
        ))}
      </div>
      <div>
        <button onClick={() => console.log("clicked")}>clicked</button>
      </div>
    </div>
  );
}

export default CarouselPrac;

export async function getServerSideProps({
  preview = "false",
  locale = "en-US",
}) {
  // Fetch data from external API
  const config = getConfig({ locale });
  const { products } = await getAllProducts({
    config,
    preview: true,
  });

  return { props: { products } };
}
