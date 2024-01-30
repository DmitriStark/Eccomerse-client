import { Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home";
import Catalog from "./Components/Catalog";
import Users from "./Components/Users";
import ProductPage from "./Components/ProductPage";
import { LocalStorageDemo } from "./Components/localStorage.tsx";
import { Games } from "./Components/Games";
import { Footer } from "./Components/Footer.tsx";
import { Lessons } from "./Components/Lessons.tsx";
import NavBar from "./Components/Navbar";
import { Header } from "./Components/Header.tsx";

export default function App() {
  return (
    <>
      <Header />
      <NavBar />
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/products" element={<Catalog />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/games" element={<Games />} />
          <Route path="/localstorage" element={<LocalStorageDemo />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
