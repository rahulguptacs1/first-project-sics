import Link from "next/link";
function Posts({ posts }) {
  //   console.log(posts);
  return (
    <div>
      {posts.map((post, i) => (
        <div key={i}>
          <p>
            <Link href="/practice/posts/[id]" as={`/practice/posts/${post.id}`}>
              visit
            </Link>
          </p>
          <p>{post.title}</p>
        </div>
      ))}
    </div>
  );
}
export const getServerSideProps = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();

  return { props: { posts: data } };
};
export default Posts;
