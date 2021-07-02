import Dropdown from "./ProductOptionTypes/Dropdown";
import Checkbox from "./ProductOptionTypes/Checkbox";
import Radio from "./ProductOptionTypes/Radio";
import styles from "@styles/Product/ProductOption.module.scss";
import ColorRectangle from "./ProductOptionTypes/ColorRectangle";
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
  if (productOption.node.displayName.endsWith("checkbox")) {
    return (
      <div className={styles.option}>
        <Checkbox
          optionValue={productOptionMapper[index]}
          setOptionValue={(newValue) => {
            setProductOptionMapper((mapper) => {
              const updated = [...mapper];
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
    selectedOptionIdx: productOptionMapper[index],
    setSelectedOptionIdx: (i) => {
      setProductOptionMapper((mapper) => {
        const updated = [...mapper];
        updated[index] = i;
        return updated;
      });
    },
  };
  if (productOption.node.displayName.endsWith("radio")) {
    return Wrapper(<Radio {...props} />);
  } else if (productOption.node.displayName.endsWith("color-rectangle")) {
    return Wrapper(
      <ColorRectangle
        {...props}
        colors={props.options.map((option) => option.toLowerCase())}
      />
    );
  } else if (productOption.node.displayName.endsWith("dropdown")) {
    return Wrapper(<Dropdown {...props} />);
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
