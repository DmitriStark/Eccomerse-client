import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from "./constants";
import {Product} from "./Catalog"



export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${apiUrl}/${id}`);
        const data: Product = await res.json();
        setProduct(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error as needed
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

