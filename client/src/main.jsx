import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Apply saved theme on first load
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.className = "dark";
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
