import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home";
import Catalog from "./Components/Catalog";
import Users from "./Components/Users";
import ProductPage from "./Components/ProductPage";
import { LocalStorageDemo } from "./Components/localStorage";
import { Games } from "./Components/Games";
import { Footer } from "./Components/Footer";
import { Lessons } from "./Components/Lessons";
import NavBar from "./Components/Navbar";
import UserPage from "./Components/UserPage";
import { Map } from "./Components/Map";
import { Register } from "./Components/userRegistration/userRegister";
import Login from "./Components/login/Login";
import { AuthProvider } from './Components/context/AuthProvider';

const App: React.FC = () => {
  return (
    <AuthProvider> {/* Wrap your application in AuthProvider */}
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
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/map" element={<Map />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </AuthProvider>
  );
};

export default App;
