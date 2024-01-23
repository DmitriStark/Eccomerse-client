import React from "react";
import ProductCard from "./ProductCard";
import { itemsPerPage } from "./constants";

interface Product {
 id:number
}

interface CatalogBoardProps {
  products: Product[];
  curPageNum: number;
}

const CatalogBoard: React.FC<CatalogBoardProps> = ({ products, curPageNum }) => {
  const cards = getPageCards(curPageNum, products);

  return (
    <div className="catalog-board">
      {cards}
    </div>
  );
};

function getPageCards(pageNum: number, allProducts: Product[]): JSX.Element[] {
  const firstProductIndex = (pageNum - 1) * itemsPerPage;

  const pageProducts = allProducts.slice(
    firstProductIndex,
    firstProductIndex + itemsPerPage
  );

  return pageProducts.map((p) => <ProductCard key={p.id} product={p} />);
}

export default CatalogBoard;
