// src/App.js
import React, { useState } from "react";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import Apartments from "./components/Apartments";
import ApartmentDetail from "./components/ApartmentDetail";
import Header from "./components/Header"; // Importa il componente Header
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  const [currentPage, setCurrentPage] = useState("signUp"); // Stato iniziale per il sign-up
  const [selectedApartment, setSelectedApartment] = useState(null); // Stato per l'appartamento selezionato

  // Funzioni per cambiare la pagina
  const handleSignUpClick = () => setCurrentPage("signUp");
  const handleSignInClick = () => setCurrentPage("signIn");
  const handleDashboardClick = () => setCurrentPage("dashboard");
  const handleViewApartmentsClick = () => setCurrentPage("apartments");
  const handleViewApartmentDetailClick = (apartment) => {
    setSelectedApartment(apartment);
    setCurrentPage("apartmentDetail");
  };

  // Funzione di Debug per accedere alla Dashboard
  const handleDebugClick = () => setCurrentPage("dashboard");

  return (
    <ThemeProvider>
      <Header />
      <div>
        {currentPage === "signUp" && (
          <SignUp
            onSignInClick={handleSignInClick}
            onDebugClick={handleDebugClick}
          />
        )}
        {currentPage === "signIn" && (
          <SignIn
            onSignUpClick={handleSignUpClick}
            onDebugClick={handleDebugClick}
          />
        )}
        {currentPage === "dashboard" && (
          <Dashboard onViewApartmentsClick={handleViewApartmentsClick} />
        )}
        {currentPage === "apartments" && (
          <Apartments onViewApartmentDetail={handleViewApartmentDetailClick} />
        )}
        {currentPage === "apartmentDetail" && selectedApartment && (
          <ApartmentDetail apartment={selectedApartment} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
