import styles from "@styles/Product/ProductOptionTypes/Radio.module.scss";
import classNames from "classnames";
import { useEffect, useState } from "react";

function Radio({ options, selectedOptionIdx, setSelectedOptionIdx }) {
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    window.addEventListener("click", () => {
      setClicked(false);
    });
  }, []);
  return (
    <div className={styles.options}>
      {options.map((option, i) => (
        <div className={styles.option}>
          <div className={styles.box}>
            <div
              className={classNames(styles.marker, {
                [styles.active]: i === selectedOptionIdx,
                [styles.clicked]: clicked && i === selectedOptionIdx,
              })}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedOptionIdx(i);
                setClicked(true);
              }}
            >
              <div className={styles.dot}></div>
            </div>{" "}
          </div>

          <div className={styles.name}>{option}</div>
        </div>
      ))}
    </div>
  );
}

export default Radio;
