import styles from "../styles/ImageOpenView.module.scss";
function ImageOpenView({ src, close }) {
  return (
    <div
      className={styles.imageOpenView}
      onClick={(e) => {
        e.stopPropagation();
        close();
      }}
    >
      <div className={styles.image}>
        <p className={styles.icon}>
          <i className="fa fa-times" aria-hidden="true"></i>
        </p>
        <img
          src={src}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      </div>
    </div>
  );
}

export default ImageOpenView;
