import styles from "@styles/Shared/Tabs.module.scss";
import classNames from "classnames";
import { useState } from "react";
function Tabs({
  tabs = [
    {
      name: "Description",
      content:
        "This is a multi-functional, 4K camera-equipped new quadcopter model by the Lindara gadget brand.",
    },
    {
      name: "Reviews",
      content:
        "Our in-house experts will work one-on-one with you to improve your SEO and conversion rates.",
    },
  ],
}) {
  const [activeTabIdx, setActiveTabIdx] = useState(0);

  return (
    <div className={styles.tabs}>
      <div className={styles.tabNames}>
        {tabs.map((tab, i) => (
          <p
            className={classNames(styles.tab, {
              [styles.active]: i === activeTabIdx,
            })}
            key={i}
            onClick={() => {
              // console.log("tab clicked");
              setActiveTabIdx(i);
            }}
          >
            {tab.name}
          </p>
        ))}
      </div>
      <div className={styles.tabContent}>
        <h6 className={styles.head}>{tabs[activeTabIdx].name}</h6>
        <p className={styles.content}>{tabs[activeTabIdx].content}</p>
      </div>
    </div>
  );
}

export default Tabs;
