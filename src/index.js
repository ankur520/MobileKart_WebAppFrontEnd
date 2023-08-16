import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// ------------------ CSS
import "./CSS/index.css";
import "bootstrap/dist/css/bootstrap.min.css";

// slide show css file
import "react-slideshow-image/dist/styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
