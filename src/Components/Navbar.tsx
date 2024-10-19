
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../css/NavBar.css";
import AuthContext from "../Components/context/AuthProvider"; // Import AuthContext
import React from "react";

export default function NavBar() {
  const { auth } = useContext(AuthContext); // Access auth context
  const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
  const [menuClass, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const updateMenu = () => {
    if (isMenuClicked) {
      setBurgerClass("burger-bar clicked");
      setMenuClass("menu visible");
    } else {
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  };

  return (
    <>
      <nav>
        <div className="burger-menu" onClick={updateMenu}>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
        </div>
        <p>Click The Burger To open Menu</p>
        <div className="register">
          {auth.accessToken ? ( // Check if the user is logged in
            <div className="user-icon">
              {/* Replace with user image or icon */}
              <img src="/path/to/icon.png" alt="User Icon" />
              {/* You can also use the user's name if available */}
              <span>{auth.email}</span> {/* Display user's email or name */}
            </div>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <br />
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
      <div className={menuClass}>
        <div className="navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Catalog</Link>
            </li>
            <li>
              <Link to="/lessons">Lessons</Link>
            </li>
            <li>
              <Link to="/games">Games</Link>
            </li>
            <li>
              <Link to="/localstorage">LocalStorage</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/map">Map</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
