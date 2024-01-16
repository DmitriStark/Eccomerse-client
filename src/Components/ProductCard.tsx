import React from 'react';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
  // Add other properties if needed
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
    <Link to={`/products/${product.id}`}>
      <h3>{product.name}</h3>
    </Link>
    <p>$ {product.price}</p>
  </div>
  );
};

export default ProductCard;
