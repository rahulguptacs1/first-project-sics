import { useDelayed } from "@hooks/useDelayed";
import styles from "@styles/Navbar/Sidebar/Sidebar.module.scss";
import { CSSTransition } from "react-transition-group";
function Sidebar({ show, close, children }) {
  const { copy: showDelayedCopy } = useDelayed(show, 500);

  return (
    <div
      className={styles.bar}
      style={{
        display: show || showDelayedCopy ? "block" : "none",
      }}
    >
      <CSSTransition in={show} timeout={500} classNames={`nav`} unmountOnExit>
        <div className={styles.nav}>{children}</div>
      </CSSTransition>
      <CSSTransition in={show} timeout={500} classNames={`bg`} unmountOnExit>
        <div className={styles.bg} onClick={close}></div>
      </CSSTransition>
    </div>
  );
}

export default Sidebar;
