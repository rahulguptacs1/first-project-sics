import MobileView from "@components/Shared/MobileView";
import { useState } from "react";
import styles from "@styles/practice/MobileViewTest.module.scss";
function MobileViewTest() {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    <div className={styles.item}>1</div>,
    <div className={styles.item}>2</div>,
    <div className={styles.item}>3</div>,
    <div className={styles.item}>4</div>,
  ];

  return (
    <div className={styles.test}>
      <MobileView
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        items={items}
      />
      <button onClick={prevIndex}>prev</button>
      <button onClick={nextIndex}>next</button>
    </div>
  );
}

export default MobileViewTest;
