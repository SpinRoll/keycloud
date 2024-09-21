// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // React.StrictMode è un componente che aiuta a rilevare problemi potenziali nella tua applicazione.
  // <React.StrictMode>
  <ThemeProvider>
    <App />
  </ThemeProvider>
  // </React.StrictMode>
);
