import  { useState } from "react";
import { products, Product } from "../products";
import ProductCard from "./ProductCard";
import CatalogPagesLinks from "./CatalogPagesLinks";

const itemsPerPage = 12;

const sortCategories = ['name', 'price'];

interface CatalogControlsProps {
  handleSearch: (str: string) => void;
  handleSort: (category: string) => void;
}

interface CatalogBoardProps {
  cards: JSX.Element[];
}


export function Catalog() {
  const [searchedProducts, setSearchedProducts] = useState<Product[]>(products);
  const [curPageNum, setCurPageNum] = useState<number>(1);
  const cards = getPageCards(curPageNum, searchedProducts);

  function handleSearch(str: string) {
    const result = products.filter((p) => p.name.includes(str));
    setSearchedProducts(result);
  }

  function handleSort(category: string) {
    const productsClone = [...products];

    switch (category) {
      case 'name':
        productsClone.sort((p1, p2) => p1.name.localeCompare(p2.name));
        break;
      case 'price':
        productsClone.sort((p1, p2) => p1.price - p2.price);
        break;
    }

    setSearchedProducts(productsClone);
  }

  const pagesCount = Math.ceil(searchedProducts.length / itemsPerPage);

  return (
    <>
      <CatalogControls handleSort={handleSort} handleSearch={handleSearch} />
      <CatalogBoard cards={cards} />
      <CatalogPagesLinks
        selectedPageNum={curPageNum}
        onPageBtnClick={(num) => setCurPageNum(num)}
        pagesCount={pagesCount}
      />
    </>
  );
}

function CatalogControls({ handleSearch, handleSort }: CatalogControlsProps) {
  const [inputVal, setInputVal] = useState<string>('');

  const sortOptions = ['', ...sortCategories].map((c) => (
    <option key={c} value={c}>
      {c}
    </option>
  ));

  return (
    <div className="catalog-board-controls">
      <input
        type="text"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      />
      <button onClick={() => handleSearch(inputVal)}>search</button>
      <select onChange={(e) => handleSort(e.target.value)}>
        {sortOptions}
      </select>
    </div>
  );
}

function getPageCards(pageNum: number, allProducts: Product[]): JSX.Element[] {
  const firstProductIndex = (pageNum - 1) * itemsPerPage;

  const pageProducts = allProducts.slice(
    firstProductIndex,
    firstProductIndex + itemsPerPage
  );

  return pageProducts.map((p) => <ProductCard key={p.id} product={p} />);
}

function CatalogBoard({ cards }: CatalogBoardProps) {
  return <div className="catalog-board">{cards}</div>;
}
