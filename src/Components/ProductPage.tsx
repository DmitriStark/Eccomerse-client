import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverHost } from "./constants";
import {Product} from "./Catalog"


const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${serverHost}/products`;
        const res = await fetch(`${apiUrl}/${id}`);
        const data: Product = await res.json();
        console.log(data);
        setProduct(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <pre>{JSON.stringify(product, null, 2)}</pre>
    </>
  );
};

export default ProductPage;
