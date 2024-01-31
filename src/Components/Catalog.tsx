import React, { useEffect, useState } from "react";
import CatalogPagesLinks from "./CatalogPagesLinks";
import CatalogBoard from "./CatalogBoard";
import { itemsPerPage, serverHost } from "./constants";
import CatalogControls from "./CatalogControls";
import "../css/catalog.css"

export interface Product {
  id:number
  name: string;
  price: number;
  // Add any other properties of the product here
}

interface CatalogProps {}

const apiUrl = `${serverHost}/products`;

const Catalog: React.FC<CatalogProps> = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);
  const [curPageNum, setCurPageNum] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(apiUrl);
        const response = await res.json();
        const products: Product[] = response[0]?.products || [];
        console.log("Fetched Products:", products);
        setAllProducts(products);
        setSearchedProducts(products);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };    

    fetchData();
  }, []);

  const handleSearch = (str: string, sortCategory: 'name' | 'price') => {
    const filteredList = allProducts.filter((p) =>
      p.name.includes(str)
    );

    switch (sortCategory) {
      case 'name':
        filteredList.sort((p1, p2) => p1.name.localeCompare(p2.name));
        break;
      case 'price':
        filteredList.sort((p1, p2) => p1.price - p2.price);
        break;
    }

    setSearchedProducts(filteredList);
    setCurPageNum(1);
  };

  if (isLoading) return <div className="loading">Loading...</div>;

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
