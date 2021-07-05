import useCart from "@bigcommerce/storefront-data-hooks/cart/use-cart";
import { getConfig } from "@bigcommerce/storefront-data-hooks/api";
// import getAllProducts from "@bigcommerce/storefront-data-hooks/api/operations/get-all-products";
import useAddItem from "@bigcommerce/storefront-data-hooks/cart/use-add-item";

export async function getServerSideProps(context) {
  // Fetch data from external API
  const config = getConfig({ locale: "en-US" });
  // const { products } = await getAllProducts({
  //   config,
  //   preview: true,
  // });
  //   console.log(products);

  return { props: {} };
}
function Cart() {
  const { data } = useCart();
  console.log(data);
  return <div></div>;
}

export default Cart;
