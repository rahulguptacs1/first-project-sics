import Head from "next/head";
import { getConfig } from "@bigcommerce/storefront-data-hooks/api";
import getProduct from "@bigcommerce/storefront-data-hooks/api/operations/get-product";
import getAllProducts from "@bigcommerce/storefront-data-hooks/api/operations/get-all-products";
import styles from "@styles/Home/Home.module.scss";
// import getProduct from "@bigcommerce/storefront-data-hooks/api/operations/get-product";
import ImageOpenView from "@components/Home/Card/ImageOpenView";
import Card from "@components/Home/Card/Card";
import Link from "next/link";
import Slider from "@components/Shared/Slider";
import Reviews from "@components/Home/Reviews/Reviews";
import ScrollUp from "@components/Shared/ScrollUp";
import { useState } from "react";
export async function getStaticProps() {
  // Fetch data from external API
  const config = getConfig({ locale: "en-US" });
  const { products } = await getAllProducts({
    config,
    preview: true,
  });
  const { product } = await getProduct({
    variables: { path: "/tiered-wire-basket/" },
    config,
    preview: true,
  });
  console.log(product);

  return { props: { products } };
}

export default function Home({ products }) {
  // console.log(products);
  const [openImageIdx, setOpenImageIdx] = useState(-1);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p className={styles.first}> first page </p>
      <p>
        <Link href="/practice/about">
          <a>About App</a>
        </Link>
      </p>
      <div className={styles.section}>
        <h3 className={styles.head}>Top Rated Drones & Quadcopters</h3>
        <h4 className={styles.slug}>
          What differs our drone store from the rest of the crowd is our range
          and prices!
        </h4>
        <div className={styles.cards}>
          <Card product={products[0]} />
          <Card product={products[2]} />
          <Card product={products[3]} />
          <Card product={products[4]} />
        </div>
      </div>
      <Reviews />

      {Slider({ infinite: true })({
        insideCarousel: ({ isMoving }) =>
          products.map((product, i) => (
            <Card
              key={i}
              product={product}
              openImage={false}
              detectClick={() => {
                if (!isMoving) setOpenImageIdx(i);
              }}
            />
          )),
        outSideCarousel: () =>
          products.map((product, i) =>
            i === openImageIdx ? (
              <ImageOpenView
                key={i}
                src={product.node.images.edges[0].node.urlOriginal}
                close={() => {
                  setOpenImageIdx(-1);
                }}
              />
            ) : null
          ),
      })}

      <ScrollUp />
    </div>
  );
}
