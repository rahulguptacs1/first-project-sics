import { getConfig } from "@bigcommerce/storefront-data-hooks/api";
import getAllProducts from "@bigcommerce/storefront-data-hooks/api/operations/get-all-products";
import getProduct from "@bigcommerce/storefront-data-hooks/api/operations/get-product";
import styles from "@styles/Product/Product.module.scss";
import { useState } from "react";
import Button from "@components/Shared/Button";
import classNames from "classnames";
import Tabs from "@components/Shared/Tabs";
import ProductOptions from "@components/Product/ProductOptions";
import { useEffect } from "react/cjs/react.development";
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
    variables: { locale: "en-US", path: "/" + productPath + "/" },
    config,
    preview: false,
  });
  // console.log(product);

  return { props: { product: product || null } };
};
const maxQuantity = 56;
function Product({ product }) {
  // console.log(product);
  const [productOptionMapper, setProductOptionMapper] = useState(() => {
    const mapper = {};
    for (let edge of product.productOptions.edges) {
      if (edge.node.__typename === "MultipleChoiceOption") {
        if (edge.node.displayName.endsWith("swatch")) {
          // console.log(edge.node.values.edges);
          let idx = 0;
          for (let i = 0; i < edge.node.values.edges.length; i++) {
            if (edge.node.values.edges[i].node.isDefault) {
              idx = i;
              break;
            }
          }
          mapper[edge.node.displayName] = edge.node.values.edges[idx];
        } else {
          mapper[edge.node.displayName] = edge.node.values.edges[0];
        }
      } else if (edge.node.__typename === "CheckboxOption") {
        mapper[edge.node.displayName] = false;
      }
    }
    // console.log(mapper);
    return mapper;
  });
  const [selectedVariant, setSelectedVariant] = useState();
  useEffect(() => {
    setSelectedVariant(
      product.variants.edges.find((variant) => {
        for (let edge of variant.node.productOptions.edges) {
          if (
            edge.node.values.edges[0].node.label !==
            productOptionMapper[edge.node.displayName].node.label
          ) {
            return false;
          }
        }
        return true;
      })
    );
    console.log(productOptionMapper);
  }, [productOptionMapper]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className={styles.product}>
      <div className={styles.firstSection}>
        <div className={styles.imageSection}>
          <div className={styles.image}>
            <img
              src={
                selectedVariant?.node?.defaultImage?.urlOriginal ||
                product.images.edges[0].node.urlOriginal
              }
            />
          </div>
          <div className={styles.imageGrid}>
            {product.images.edges.map((edge, i) => (
              <div className={styles.smallImage} key={i}>
                <img src={edge.node.urlOriginal} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.content}>
          <p className={styles.name}>{product.name.replace("[Sample] ", "")}</p>
          <div className={styles.rest}>
            <p className={styles.price}>
              &#8377;{" "}
              {selectedVariant?.node?.prices?.price.value ||
                product.prices.price.value}
              .00
            </p>
            <div className={styles.options}>
              <ProductOptions
                productOptions={product.productOptions}
                productOptionMapper={productOptionMapper}
                setProductOptionMapper={setProductOptionMapper}
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
        <Tabs
          tabs={[
            {
              name: "Description",
              content: product.description,
            },
            {
              name: "Reviews",
              content:
                "Our in-house experts will work one-on-one with you to improve your SEO and conversion rates.",
            },
          ]}
        />
      </div>
    </div>
  );
}

export default Product;
