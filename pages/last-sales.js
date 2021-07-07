import { useEffect, useState } from "react";

export default function LastSales() {
  const [sales, setSales] = useState();
  const [loading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);

    fetch("https://my-program-a6b1f-default-rtdb.firebaseio.com/sales.json")
      .then((response) => response.json())
      .then((data) => {
        const transformedSale = [];
        for (const key in data) {
          transformedSale.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }
      });
  }, []);

  if (loading) {
    return <p>Loading!!!</p>;
  }
  return <ul></ul>;
}
