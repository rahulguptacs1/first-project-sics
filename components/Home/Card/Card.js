import { useState } from "react";
import styles from "@styles/Home/Card/Card.module.scss";
import ImageOpenView from "./ImageOpenView";
import { conditionalLog } from "@helpers/utils";
import { useRouter } from "next/router";
import Button from "@components/Shared/Button";
// import Link from "next/link";
const clog = conditionalLog();
function Card({ product, openImage = true, detectClick = () => {} }) {
  // clog.c(product);
  // console.log(product.node.images.edges[0].node.urlOriginal)
  const router = useRouter();
  const [showImage, setShowImage] = useState(false);

  return (
    <div
      className={styles.card}
      onClick={() => {
        clog.c("card clicked", false);
        router.push(product.node.path);
      }}
    >
      {openImage && showImage && (
        <ImageOpenView
          src={product.node.images.edges[0].node.urlOriginal}
          close={() => {
            setShowImage(false);
          }}
        />
      )}
      <div className={styles.image}>
        <div className={styles.background}>
          <p
            className={styles.icon}
            onClick={(e) => {
              e.stopPropagation();
              setShowImage(true);
              detectClick();
            }}
          >
            <i className="fa fa-eye" aria-hidden="true"></i>
          </p>
        </div>
        <img src={product.node.images.edges[0].node.urlOriginal} />
      </div>

      <p className={styles.name}>
        {product.node.name.replace("[Sample] ", "")}
      </p>
      <p className={styles.price}>${product.node.prices.price.value}</p>

      <Button>
        <i className="fa fa-shopping-cart"></i>Add to cart
      </Button>
    </div>
  );
}

export default Card;
