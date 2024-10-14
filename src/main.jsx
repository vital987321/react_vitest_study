// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import { PlayGround } from './PlayGroud.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     {/* <App /> */}
//     <PlayGround/>
//   </StrictMode>,
// )


import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import routes from "./routers";

axios.defaults.baseURL = "http://localhost:3000";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);