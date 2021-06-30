import styles from "../styles/Review.module.scss";
function Review() {
  return (
    <div className={styles.review}>
      <div className={styles.image}>
        <img src="/images.jpeg" draggable={false} />
      </div>
      <div className={styles.icon}>
        <i className="fa fa-quote-left" aria-hidden="true"></i>
      </div>
      <div className={styles.text}>
        I typically buy a lot of gadgets each year – at least 3 or 4 of them.
        This means that knowing of an e-store where the range is big enough to
        have all the new arrivals and where the pricing also fits – is
        priceless!
      </div>
      <div className={styles.name}>- Matthew Harkin</div>
    </div>
  );
}

export default Review;
