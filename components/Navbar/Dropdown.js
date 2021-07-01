import { useState } from "react";
import styles from "@styles/Navbar/Dropdown.module.scss";
function Dropdown({ component, items, position }) {
  const [show, setShow] = useState();
  const handlers = {
    style: {
      //   color: "green",
    },
    classes: [show ? "hover" : ""],
    onClick: () => {
      console.log("clicked");
    },
  };
  return (
    <div
      className={styles.container}
      onMouseEnter={() => {
        // console.log("mouse entered");
        setShow(true);
      }}
      onMouseLeave={() => {
        // console.log("mouse leave");
        setShow(false);
      }}
    >
      {component(handlers)}
      {show && (
        <div className={[styles.dropdown, styles[position]].join(" ")}>
          {items.map((item, i) => item)}
        </div>
      )}
    </div>
  );
}

export default Dropdown;