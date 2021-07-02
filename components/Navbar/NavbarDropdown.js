import { useState } from "react";
import styles from "@styles/Navbar/NavbarDropdown.module.scss";
function NavbarDropdown({ component, items, position }) {
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

export default NavbarDropdown;
