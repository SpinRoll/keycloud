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
import Header from "./components/header/Header";
import PricingPlans from "./components/pricing/PricingPlans"; // Importa PricingPlans

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/sign-up" />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/apartments" element={<Apartments />} />
          <Route path="/apartments/:id" element={<ApartmentDetail />} />
          <Route path="/pricing" element={<PricingPlans />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
