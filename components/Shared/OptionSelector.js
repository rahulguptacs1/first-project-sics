import styles from "@styles/Shared/OptionSelector.module.scss";
import classNames from "classnames";
import { useEffect, useState } from "react";
function OptionSelector({ options, selectedOptionIdx, setSelectedOptionIdx }) {
  const [showOptions, setShowOptions] = useState(false);
  const [hoveredOptionIdx, setHoveredOptionIdx] = useState(selectedOptionIdx);

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
                  setSelectedOptionIdx(prevIdx);
                  return prevIdx;
                }
                setSelectedOptionIdx(options.length - 1);
                return options.length - 1;
              });

              break;
            case "ArrowDown":
              //   console.log("arrow down");
              setHoveredOptionIdx((prevVal) => {
                const nextIdx = prevVal + 1;
                if (nextIdx < options.length) {
                  setSelectedOptionIdx(nextIdx);
                  return nextIdx;
                }
                setSelectedOptionIdx(0);
                return 0;
              });

              break;
            case "Enter":
            case "Escape":
              setShowOptions(false);
              break;
          }
        }
        return showOptions;
      });
    });
    window.addEventListener("click", () => {
      setShowOptions(false);
    });
  }, []);

  return (
    <div className={styles.optionSelector}>
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

export default OptionSelector;
