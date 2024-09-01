import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      {" "}
      {/* Utilizza il ThemeProvider personalizzato */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
