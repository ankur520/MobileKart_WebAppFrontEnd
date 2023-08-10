import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import ReactDOM from "react-dom/client";
import App from "./App";

// ------------------ CSS
import "./CSS/index.css";
import "bootstrap/dist/css/bootstrap.min.css";

// slide show css file
import "react-slideshow-image/dist/styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
