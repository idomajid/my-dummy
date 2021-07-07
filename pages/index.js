import path from "path";
import fs from "fs/promises";
import Link from "next/link";

export default function Home(props) {
  const { products } = props;

  return (
    <div>
      {products.map((product) => (
        <ul key={product.id}>
          <li>
            <Link href={`/products/${product.id}`}>{product.title}</Link>
          </li>
        </ul>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  //setting direct to '/no-data' if client did't find a data
  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  //setting direct to 404 Page if data 0
  if (data.products.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}
