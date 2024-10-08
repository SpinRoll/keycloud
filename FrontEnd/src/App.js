// src/App.js
import React from "react"; // Importo React per creare componenti
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"; // Importo i componenti necessari da react-router-dom per la navigazione
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import Apartments from "./components/apartments/Apartments";
import ApartmentDetail from "./components/apartments/ApartmentDetail";
import Header from "./components/header/Header";
import PricingPlans from "./components/pricing/PricingPlans";
import UserPage from "./components/user/UserPage";
import VerifyEmail from "./components/VerifyEmail";
import RecoverEmail from "./components/RecoverEmail";
import ResetPassword from "./components/ResetPassword";
import TwoFactorSetup from "./components/user/TwoFactorSetup";
import routes from "./routes"; // Importo l'oggetto routes per definire le route

function App() {
  return (
    // Definisco il router principale dell'applicazione
    <Router>
      {/* Header per la barra di navigazione globale */}
      <Header />
      {/* Contenitore principale per le rotte */}
      <div>
        {/* Definisco le rotte per l'applicazione */}
        <Routes>
          {/* Ridirige alla pagina di registrazione come percorso iniziale */}
          <Route path="/" element={<Navigate to={routes.SIGN_IN} />} />
          {/* Percorso per l'autenticazione */}
          <Route path={routes.SIGN_IN} element={<SignIn />} />

          {/* Percorso per la registrazione */}
          <Route path={routes.SIGN_UP} element={<SignUp />} />

          {/* Percorso per la dashboard principale */}
          <Route path={routes.DASHBOARD} element={<Dashboard />} />

          {/* Percorso per visualizzare gli appartamenti */}
          <Route path={routes.APARTMENTS} element={<Apartments />} />

          {/* Percorso per visualizzare i dettagli di un appartamento specifico, basato su un parametro ID */}
          <Route path={routes.APARTMENT_DETAIL} element={<ApartmentDetail />} />

          {/* Percorso per visualizzare i piani tariffari */}
          <Route path={routes.PRICING} element={<PricingPlans />} />
          {/* Percorso per visualizzare UserPage */}
          <Route path={routes.USER_PAGE} element={<UserPage />} />
          {/* Percorso per la verifica dell'email */}
          <Route path={routes.VERIFY_EMAIL} element={<VerifyEmail />} />
          {/* Percorso recover email */}
          <Route path={routes.RECOVER_EMAIL} element={<RecoverEmail />} />
          {/* Percorso reset password */}
          <Route path={routes.RESET_PASSWORD} element={<ResetPassword />} />
          {/* Percorso per il setup dell'MFA */}
          <Route path={routes.MFA_SETUP} element={<TwoFactorSetup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; // Esporto il componente App per l'uso in altre parti dell'applicazione
