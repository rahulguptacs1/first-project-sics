import { getConfig } from "@bigcommerce/storefront-data-hooks/api";
import getAllProducts from "@bigcommerce/storefront-data-hooks/api/operations/get-all-products";
import getProduct from "@bigcommerce/storefront-data-hooks/api/operations/get-product";
import OptionSelector from "@components/Product/OptionSelector";
import styles from "@styles/Product/Product.module.scss";
import { useState } from "react";
import Button from "@components/Shared/Button";
import classNames from "classnames";
import Tabs from "@components/Shared/Tabs";
export const getStaticPaths = async () => {
  const config = getConfig({ locale: "en-US" });
  const { products } = await getAllProducts({
    config,
    preview: true,
  });
  // console.log(products);
  const productPaths = [];
  products.forEach((product) => {
    const stringPath = `${product.node.path}`;
    const strippedPath = stringPath.slice(1, stringPath.length - 1);

    productPaths.push({
      params: { productPath: strippedPath },
    });
  });

  return {
    paths: productPaths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const config = getConfig({ locale: "en-US" });
  const productPath = context.params.productPath;
  // console.log(productPath);
  const { product } = await getProduct({
    variables: { path: "/" + productPath + "/" },
    config,
    preview: true,
  });
  // console.log(product);

  return { props: { product: product || null } };
};
const colors = ["Blue", "Green", "Red"];
const maxQuantity = 56;
function Product({ product }) {
  console.log(product);
  const [color, setColor] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className={styles.product}>
      <div className={styles.firstSection}>
        <div className={styles.image}>
          <img src={product.images.edges[0].node.urlOriginal} />
        </div>
        <div className={styles.content}>
          <p className={styles.name}>{product.name.replace("[Sample] ", "")}</p>
          <div className={styles.rest}>
            <p className={styles.price}>
              &#8377; {product.prices.price.value}.00
            </p>
            <div className={styles.options}>
              <p className={styles.text}>Color:</p>
              <OptionSelector
                options={colors}
                selectedOptionIdx={color}
                setSelectedOptionIdx={setColor}
              />
            </div>
            <div className={styles.inputs}>
              <p className={styles.input}>
                Quantity:{" "}
                <input
                  type="number"
                  min={1}
                  max={maxQuantity}
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                />
              </p>
              <p className={styles.input}>
                {" "}
                Available Quantity : <span>{maxQuantity}</span>
              </p>
            </div>
            <div className={styles.buttons}>
              <Button
                onClick={() => {
                  console.log("clicked");
                }}
                style={{
                  padding: `1rem`,
                }}
              >
                <i className="fa fa-shopping-cart"></i>Add to cart
              </Button>
              <Button
                style={{
                  padding: `1rem`,
                }}
              >
                Compare
              </Button>
            </div>
            <div className={styles.icons}>
              <i className={classNames(styles.icon, "fab fa-facebook-f")}></i>
              <i className={classNames(styles.icon, "fab fa-twitter")}></i>
              <i
                className={classNames(styles.icon, "fab fa-google-plus-g")}
              ></i>
              <i className={classNames(styles.icon, "fab fa-pinterest")}></i>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.tabs}>
        <Tabs />
      </div>
    </div>
  );
}

export default Product;
