import styles from "@styles/Product/ProductOptionTypes/Rectangle.module.scss";
import classNames from "classnames";
function Rectangle({ options, selectedOptionIdx, setSelectedOptionIdx }) {
  return (
    <div className={styles.rectangles}>
      {options.map((option, i) => (
        <div
          className={classNames(styles.rectangle, {
            [styles.active]: i === selectedOptionIdx,
          })}
          key={i}
          onClick={(e) => {
            setSelectedOptionIdx(i);
          }}
        >
          <div className={styles.text}>{option}</div>
        </div>
      ))}
    </div>
  );
}

export default Rectangle;
