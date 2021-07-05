import Dropdown from "./ProductOptionTypes/Dropdown";
import Checkbox from "./ProductOptionTypes/Checkbox";
import Radio from "./ProductOptionTypes/Radio";
import Rectangle from "./ProductOptionTypes/Rectangle";
import styles from "@styles/Product/ProductOption.module.scss";
import ColorSwatch from "./ProductOptionTypes/ColorSwatch";
const getName = (name) => {
  // Size-dropdown  ->>> Size
  const idx = [...name].findIndex((v) => v === "-");
  return name.slice(0, idx);
};
function ProductOption({
  productOption,
  productOptionMapper,
  index,
  setProductOptionMapper,
}) {
  // console.log(productOption);
  if (productOption.node.displayName.endsWith("checkbox")) {
    return (
      <div className={styles.option}>
        <Checkbox
          optionValue={productOptionMapper[index]}
          setOptionValue={(newValue) => {
            setProductOptionMapper((mapper) => {
              const updated = { ...mapper };
              updated[index] = newValue;
              return updated;
            });
          }}
        />
        <p
          className={styles.name}
          style={{
            display: "inline-block",
            marginLeft: `1rem`,
            textTransform: `initial`,
          }}
        >
          {getName(productOption.node.displayName)}
        </p>
      </div>
    );
  }
  const props = {
    options: productOption.node.values?.edges.map((value) => value.node.label),
    selectedOptionIdx: productOption.node.values.edges.findIndex(
      (v) => v.node.label === productOptionMapper[index].node.label
    ),
    setSelectedOptionIdx: (i) => {
      setProductOptionMapper((mapper) => {
        const updated = { ...mapper };
        updated[index] = productOption.node.values.edges[i];
        return updated;
      });
    },
  };
  if (productOption.node.displayName.endsWith("radio")) {
    return Wrapper(<Radio {...props} />);
  } else if (productOption.node.displayName.endsWith("color-swatch")) {
    return Wrapper(
      <ColorSwatch
        {...props}
        colors={productOption.node.values.edges.map(
          (val) => val.node.hexColors
        )}
      />
    );
  } else if (productOption.node.displayName.endsWith("dropdown")) {
    return Wrapper(<Dropdown {...props} />);
  } else if (productOption.node.displayName.endsWith("rectangle")) {
    return Wrapper(<Rectangle {...props} />);
  }
  return null;

  function Wrapper(component) {
    return (
      <div className={styles.option}>
        <p className={styles.name}>
          {getName(productOption.node.displayName)} :{" "}
        </p>
        {component}
      </div>
    );
  }
}

export default ProductOption;
