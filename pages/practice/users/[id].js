export const getStaticPaths = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();

  const userPaths = data.map((user) => {
    return { params: { id: user.id.toString() } };
  });

  return {
    paths: userPaths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const userID = context.params.id;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userID}`
  );
  const data = await response.json();

  return { props: { user: data } };
};
const UserInfo = ({ user }) => {
  return (
    <div>
      <h2>User Info</h2>
      <p>username: {user.username}</p>
      <p>email: {user.email}</p>
      <p>
        address: {user.address.street} - {user.address.city}
      </p>
      <p>phone: {user.phone}</p>
      <p>website: {user.website}</p>
    </div>
  );
};

export default UserInfo;
