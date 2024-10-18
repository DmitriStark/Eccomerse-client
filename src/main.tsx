// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App'
// import { BrowserRouter } from 'react-router-dom'
// import './css/index.css';

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
// 	<BrowserRouter>
// 		<App />
// 	</BrowserRouter>
// </React.StrictMode>
// )

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router-dom";
import "./css/index.css";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_Google_id as string}>
        <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

