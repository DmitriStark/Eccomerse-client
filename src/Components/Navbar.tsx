import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/NavBar.css";

// import { Link } from "react-router-dom";

// export default function NavBar() {
//   return (
//     <>
//       <nav>
// <div className="navbar">
//   <ul>
//     <li><Link to="/">Home</Link></li>
//     <li><Link to="/products">Catalog</Link>
//     </li>
//     <li>
//       <Link to="/lessons">Lessons</Link>
//     </li>
//     <li>
//       <Link to="/games">Games</Link>
//     </li>
//     <li>
//       <Link to="/localstorage">LocalStorage</Link>
//     </li>
//     <li>
//       <Link to="/users">users</Link>
//     </li>
//   </ul>
// </div>
//       </nav>
//     </>
//   );
// }
export default function NavBar() {
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
              <Link to="/users">users</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
