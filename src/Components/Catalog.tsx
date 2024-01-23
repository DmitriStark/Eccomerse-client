import React, { useEffect, useState } from "react";
import CatalogPagesLinks from "./CatalogPagesLinks";
import CatalogBoard from "./CatalogBoard";
import CatalogControls from "./CatalogControls";
import { itemsPerPage, apiUrl } from "./constants";
import "../css/catalog.css";


export interface Product {
  name: string;
  price: number;
  id:number
  // Add other properties as needed
}

export const Catalog: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);
  const [curPageNum, setCurPageNum] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(apiUrl);
        const products: Product[] = await res.json();
        setAllProducts(products);
        setSearchedProducts(products);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (str: string, sortCategory: string) => {
    const filteredList = allProducts.filter((p) =>
      p.name.toLowerCase().includes(str.toLowerCase())
    );

    switch (sortCategory) {
      case "name":
        filteredList.sort((p1, p2) => p1.name.localeCompare(p2.name));
        break;
      case "price":
        filteredList.sort((p1, p2) => p1.price - p2.price);
        break;
      // Add other cases as needed
    }

    setSearchedProducts(filteredList);
    setCurPageNum(1);
  };

  if (isLoading) return <div>Loading...</div>;

  const pagesCount = Math.ceil(searchedProducts.length / itemsPerPage);

  return (
    <>
      <CatalogControls handleSearch={handleSearch} />
      <CatalogBoard products={searchedProducts} curPageNum={curPageNum} />
      <CatalogPagesLinks
        selectedPageNum={curPageNum}
        onPageBtnClick={(num) => setCurPageNum(num)}
        pagesCount={pagesCount}
      />
    </>
  );
};

export default Catalog;
