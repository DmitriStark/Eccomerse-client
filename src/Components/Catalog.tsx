import { useState } from "react";
import { products } from "../products";
import ProductCard from "./ProductCard";
import CatalogPagesLinks from "./CatalogPagesBar";


const itemsPerPage = 12;

export  function Catalog() {
  const [curPageNum, setCurPageNum] = useState<number>(1);

  const firstIndex = (curPageNum - 1) * itemsPerPage;
  const secondIndex = firstIndex + itemsPerPage;

  const productsCards = products
    .slice(firstIndex, secondIndex)
    .map((p) => <ProductCard key={p.id} product={p} />);

  return (
    <>
      <div className="catalog-board">{productsCards}</div>
      <CatalogPagesLinks
      itemsPerPage={itemsPerPage}
        selectedPageNum={curPageNum}
        products={products}
        onPageBtnClick={(num) => setCurPageNum(num)}
      />
    </>
  );
}

