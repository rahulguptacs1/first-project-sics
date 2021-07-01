import Link from "next/link";
export const getStaticProps = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();

  return { props: { users: data } };
};
function Users({ users }) {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link
              href={`/practice/users/[id]`}
              as={`/practice/users/${user.id}`}
            >
              <p>{user.username}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
