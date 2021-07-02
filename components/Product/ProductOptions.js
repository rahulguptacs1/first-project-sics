import ProductOption from "./ProductOption";

function ProductOptions({
  productOptions,
  productOptionMapper,
  setProductOptionMapper,
}) {
  return (
    <div>
      {/* {productOptions.edges.map((productOption, i) => {
        return (
          <p key={i}>
            {productOption.node.displayName} :{" "}
            {
              productOption.node.values?.edges?.[productOptionMapper[i]]?.node
                ?.label
            }
          </p>
        );
      })} */}
      {productOptions.edges.map((productOption, i) => {
        return (
          <ProductOption
            key={i}
            productOption={productOption}
            productOptionMapper={productOptionMapper}
            setProductOptionMapper={setProductOptionMapper}
            index={i}
          />
        );
      })}
    </div>
  );
}

export default ProductOptions;
