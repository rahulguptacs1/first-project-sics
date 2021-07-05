import useCart from "@bigcommerce/storefront-data-hooks/cart/use-cart";
import styles from "@styles/Cart/Cart.module.scss";
function Cart() {
  const { data: cart } = useCart();
  console.log(cart);
  return (
    <div className={styles.cart}>
      <div className={styles.head}>
        <p>Item</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
      </div>
      <div className={styles.items}>
        {cart?.line_items.physical_items.map((item, i) => (
          <div key={i} className={styles.item}>
            <div className={styles.name}>{item.name}</div>
            <div className={styles.price}>{item.extended_sale_price}</div>
            <div className={styles.quantity}>{item.quantity}</div>
            <div className={styles.total}>
              {item.extended_sale_price * item.quantity}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
