import { Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home";
import { Catalog } from "./Components/Catalog";
import { ProductPage } from "./Components/ProductPage";
import NavBar from "./Components/Navbar";



export default function App() {
  return <>
  
    <NavBar/>  
    <div className="main">
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/products' element={<Catalog />} />
      <Route path='/products/:id' element={<ProductPage />} />
    </Routes>
    </div>
  </>
}





