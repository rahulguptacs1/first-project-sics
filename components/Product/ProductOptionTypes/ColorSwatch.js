import styles from "@styles/Product/ProductOptionTypes/ColorSwatch.module.scss";
import classNames from "classnames";
function ColorSwatch({
  options,
  selectedOptionIdx,
  setSelectedOptionIdx,
  colors,
}) {
  // console.log(colors);
  return (
    <div className={styles.container}>
      {colors.map((color, i) => (
        <div
          key={i}
          className={classNames(styles.colorBox, {
            [styles.active]: i === selectedOptionIdx,
          })}
          onClick={() => setSelectedOptionIdx(i)}
        >
          {color.map((col, i) => (
            <p
              key={i}
              className={styles.col}
              style={{
                backgroundColor: col,
              }}
            ></p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ColorSwatch;
