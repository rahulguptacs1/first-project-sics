import { useState } from "react";
import styles from "../styles/SideItem.module.scss";
function SideItem({ text, items = [], level }) {
  const [showChildren, setShowChildren] = useState(false);
  return (
    <div className={styles.container}>
      <p
        className={styles.sideItem}
        onClick={() => setShowChildren(!showChildren)}
      >
        {text}
      </p>
      {showChildren && (
        <div
          className={styles.children}
          style={{
            paddingLeft: `${level}rem`,
          }}
        >
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SideItem;
