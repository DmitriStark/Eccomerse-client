import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverHost } from "./constants";
import { Product } from "./Catalog";
import "../css/ProductPage.css";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${serverHost}/product`;
        const res = await fetch(`${apiUrl}/${id}`);
        const data: Product = await res.json();
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
    <div className="product-container">
      <div className="product-details">
        <h2>{product?.name}</h2>
        <p>Price: ${product?.price}</p>
        {/* Add other product details as needed */}
      </div>
    </div>
  );
};

export default ProductPage;
