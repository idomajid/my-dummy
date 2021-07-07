import { Fragment } from "react";
import path from "path";
import fs from "fs/promises";

export default function ProductDetailPage(props) {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    //
    return <p>Loading!!</p>;
  }
  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description} </p>
    </Fragment>
  );
}

const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
};

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);
  /* if (!product) {
    add this if you use fallback: true
    return { notFound: true };
  } */
  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);

  const idsPath = ids.map((id) => ({ params: { pid: id } }));
  return {
    paths: idsPath,
    // true : for selected which only page want to get pre-rendered (with some if operator ://)
    // block : same as true however it's gonna take more time
    fallback: false,
  };
}
