function Post({ post }) {
  //   console.log(post);
  return (
    <div>
      <p>{post.id}</p>
      <p>{post.body}</p>
      <p>{post.title}</p>
      <p>{post.userId}</p>
    </div>
  );
}

export default Post;
export const getServerSideProps = async (context) => {
  //   console.log(context);
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
  );
  const data = await response.json();

  return { props: { post: data } };
};
