import { useContext } from "react";
import AuthContext from "../context/AuthProvider"; // Adjust path as necessary
import axios from "axios";
import React from "react";
import "./logout.css";
 
const LOGOUT_URL = import.meta.env.VITE_LOGOUT_URL;

const Logout: React.FC = () => {
  const { setAuth } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await axios.post(LOGOUT_URL, {}, { withCredentials: true }); // Adjust the URL as needed
      setAuth({
        pwd: null,
        roles: null,
        accessToken: null,
        email: null,
      }); // Clear auth context properly
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
