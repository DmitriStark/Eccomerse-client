import { useParams } from "react-router-dom";
import { products } from "../products";

export function  ProductPage() {
    const { id } = useParams();
  
    const product = products.find(p => p.id === id);
  
    return <>
      <pre key={product?.id}>{JSON.stringify(product, null, 2)}</pre>
    </>;
  }