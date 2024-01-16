

interface Product {
    id: string;
    name: string;
    price: number;
  }
  interface CatalogPagesLinksProps {
    selectedPageNum: number;
    products: Product[];
    onPageBtnClick: (num: number) => void;
    itemsPerPage: number;
  }
export default function CatalogPagesLinks({
    selectedPageNum,
    products,
    onPageBtnClick,
    itemsPerPage,
  }: CatalogPagesLinksProps) {
    const pagesCount = Math.ceil(products.length / itemsPerPage);
    const pagesBtns: JSX.Element[] = [];
  
    for (let i = 0; i < pagesCount; i++) {
      pagesBtns.push(
        <button
          key={i}
          style={{
            backgroundColor: i + 1 === selectedPageNum ? "red" : "",
          }}
          onClick={() => onPageBtnClick(i + 1)}
        >
          {i + 1}
        </button>
      );
    }
  
    return <div className="pages-links">{pagesBtns}</div>;
  }
  