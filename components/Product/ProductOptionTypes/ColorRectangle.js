import styles from "@styles/Product/ProductOptionTypes/ColorRectangle.module.scss";
import classNames from "classnames";
function ColorRectangle({
  options,
  selectedOptionIdx,
  setSelectedOptionIdx,
  colors,
}) {
  // console.log(colors);
  return (
    <div className={styles.container}>
      {colors.map((color, i) => (
        <p
          key={i}
          className={classNames(styles.colorBox, {
            [styles.active]: i === selectedOptionIdx,
          })}
          style={{
            backgroundColor: color,
          }}
          onClick={() => setSelectedOptionIdx(i)}
        ></p>
      ))}
    </div>
  );
}

export default ColorRectangle;
