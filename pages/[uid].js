const UserId = (props) => {
  return <div>{props.id}</div>;
};

export default UserId;

export async function getServerSideProps(context) {
  const { params } = context;

  const userId = params.uid;
  console.log(userId);
  return {
    props: {
      id: "1kd" + userId,
    },
  };
}
