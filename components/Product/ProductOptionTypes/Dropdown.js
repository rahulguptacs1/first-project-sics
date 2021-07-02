import styles from "@styles/Product/ProductOptionTypes/Dropdown.module.scss";
import classNames from "classnames";
import { useEffect, useState } from "react";
function Dropdown({ options, selectedOptionIdx, setSelectedOptionIdx }) {
  const [showOptions, setShowOptions] = useState(false);
  const [hoveredOptionIdx, setHoveredOptionIdx] = useState(selectedOptionIdx);
  const [keyDown, setKeyDown] = useState(false);
  useEffect(() => {
    // console.log(keyDown);
    // console.log(hoveredOptionIdx);
    if (keyDown) {
      setSelectedOptionIdx(hoveredOptionIdx);
    }
  }, [keyDown, hoveredOptionIdx]);
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      //   console.log(e);

      setShowOptions((showOptions) => {
        if (showOptions) {
          e.preventDefault();
          switch (e.key) {
            case "ArrowUp":
              setHoveredOptionIdx((prevVal) => {
                const prevIdx = prevVal - 1;
                if (prevIdx >= 0) {
                  return prevIdx;
                }
                return options.length - 1;
              });

              break;
            case "ArrowDown":
              //   console.log("arrow down");
              setHoveredOptionIdx((prevVal) => {
                const nextIdx = prevVal + 1;
                if (nextIdx < options.length) {
                  return nextIdx;
                }
                return 0;
              });

              break;
            case "Enter":
            case "Escape":
              setShowOptions(false);
              break;
          }
          setKeyDown(true);
        }
        return showOptions;
      });
    });
    window.addEventListener("keyup", (e) => {
      e.preventDefault();
      setKeyDown(false);
    });

    window.addEventListener("click", () => {
      setShowOptions(false);
    });
  }, []);

  return (
    <div className={styles.dropdown}>
      <div
        className={styles.input}
        onClick={(e) => {
          e.stopPropagation();
          setShowOptions(true);
        }}
      >
        {options[selectedOptionIdx]}
      </div>
      {showOptions && (
        <div className={styles.options}>
          {options.map((option, i) => (
            <p
              onMouseEnter={() => {
                setHoveredOptionIdx(i);
              }}
              key={i}
              className={classNames(styles.option, {
                [styles.hover]: i === hoveredOptionIdx,
              })}
              onClick={() => {
                setSelectedOptionIdx(i);
              }}
            >
              {option}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
