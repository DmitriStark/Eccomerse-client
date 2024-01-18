import { Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home";
import { Catalog } from "./Components/Catalog";
import { ProductPage } from "./Components/ProductPage";
import NavBar from "./Components/Navbar";
import { Lessons } from "./Components/Lessons";
import { Games } from "./Components/Games";
import { Footer } from "./Components/Footer";





export default function App() {
  return <>
    <NavBar/>  
    <div className="main">
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/lessons' element={<Lessons />} />
      <Route path='/products' element={<Catalog />} />
      <Route path='/products/:id' element={<ProductPage />} />
      <Route path='/games' element={<Games />} />
    </Routes>
    </div>
    <Footer/>
  </>
}







