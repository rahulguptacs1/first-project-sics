import { useEffect, useState } from "react";
import styles from "../styles/Card.module.scss";
import Button from "./Button";
import ImageOpenView from "./ImageOpenView";
function Card({ product, openImage = true, detectClick = () => {} }) {
  // console.log(product);
  // console.log(product.node.images.edges[0].node.urlOriginal)
  const [showImage, setShowImage] = useState(false);

  return (
    <div
      className={styles.card}
      onClick={() => {
        setShowImage(true);
        detectClick();
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
          <p className={styles.icon}>
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
