import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "@styles/Shared/ScrollUp.module.scss";
function ScrollUp() {
  const [showScrollUpButton, setShowScrollUpButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      // console.log(window.scrollY);
      // console.log(window.innerHeight);
      setShowScrollUpButton(window.scrollY > window.innerHeight / 2);
    });
  }, []);
  return (
    <CSSTransition
      in={showScrollUpButton}
      timeout={300}
      classNames={`scroll-up-button`}
      unmountOnExit
    >
      <div
        className={styles.scrollUp}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <i className="fa fa-arrow-up" aria-hidden="true"></i>
      </div>
    </CSSTransition>
  );
}

export default ScrollUp;
