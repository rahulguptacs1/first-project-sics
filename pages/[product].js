export const getStaticPaths = async () => {
  const { products } = await getAllProducts({
    config,
    preview: true,
  });

  const productPaths = products.map((product) => {
    return { params: { path: product.node.path } };
  });

  return {
    paths: productPaths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const productPath = context.params.path;
  const { product } = await getProduct({
    variables: { path: productPath },
    config,
    preview: true,
  });
  console.log(product);

  return { props: { product } };
};
function Product({ product }) {
  console.log(product);
  return <div>product page</div>;
}

export default Product;
