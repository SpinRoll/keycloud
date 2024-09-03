// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import Apartments from "./components/apartments/Apartments";
import ApartmentDetail from "./components/apartments/ApartmentDetail";
import Header from "./components/header/Header"; // Importa il componente Header
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Header />
        <div>
          {/* Definisci le rotte per l'applicazione */}
          <Routes>
            {/* Ridirige alla pagina di signup come percorso iniziale */}
            <Route path="/" element={<Navigate to="/sign-up" />} />

            {/* Percorso per SignUp */}
            <Route path="/sign-up" element={<SignUp />} />

            {/* Percorso per SignIn */}
            <Route path="/sign-in" element={<SignIn />} />

            {/* Percorso per Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Percorso per Apartments */}
            <Route path="/apartments" element={<Apartments />} />

            {/* Percorso per ApartmentDetail con parametro id */}
            <Route path="/apartments/:id" element={<ApartmentDetail />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
