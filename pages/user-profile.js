export default function userProfile(props) {
  return <div>{props.userName}</div>;
}

export async function getServerSideProps(context) {
  const { params, req, res } = context;
  console.log(params);
  console.log(req);
  console.log(res);
  return {
    props: {
      userName: "Isidora Stephanova",
    },
  };
}
