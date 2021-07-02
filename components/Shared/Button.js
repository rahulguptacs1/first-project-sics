import styles from "@styles/Shared/Button.module.scss";
function Button({ children, onClick = () => {}, style = {} }) {
  return (
    <div className={styles.button} style={style} onClick={onClick}>
      {children}
    </div>
  );
}

export default Button;
