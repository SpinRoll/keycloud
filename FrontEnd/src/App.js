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
import PricingPlans from "./components/pricing/PricingPlans";
import UserPage from "./components/user/UserPage";
import VerifyEmail from "./components/VerifyEmail";
import RecoverEmail from "./components/RecoverEmail";
import ResetPassword from "./components/ResetPassword";
import TwoFactorSetup from "./components/user/TwoFactorSetup";
import routes from "./routes";
import PrivateRoute from "./PrivateRoute"; // Import the PrivateRoute component
import { SessionProvider } from "./context/SessionContext";
import SessionExpiredModal from "./components/modals/SessionExpiredModal";

function App() {
  return (
    <SessionProvider>
      <Router>
        <Header />
        <SessionExpiredModal />
        <div>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to={routes.SIGN_IN} />} />
            <Route path={routes.SIGN_IN} element={<SignIn />} />
            <Route path={routes.SIGN_UP} element={<SignUp />} />
            <Route path={routes.VERIFY_EMAIL} element={<VerifyEmail />} />
            <Route path={routes.RECOVER_EMAIL} element={<RecoverEmail />} />
            <Route path={routes.RESET_PASSWORD} element={<ResetPassword />} />

            {/* Protected Routes */}
            <Route
              path={routes.DASHBOARD}
              element={<PrivateRoute element={<Dashboard />} />}
            />
            <Route
              path={routes.APARTMENTS}
              element={<PrivateRoute element={<Apartments />} />}
            />
            <Route
              path={routes.APARTMENT_DETAIL}
              element={<PrivateRoute element={<ApartmentDetail />} />}
            />
            <Route
              path={routes.PRICING}
              element={<PrivateRoute element={<PricingPlans />} />}
            />
            <Route
              path={routes.USER_PAGE}
              element={<PrivateRoute element={<UserPage />} />}
            />
            <Route
              path={routes.MFA_SETUP}
              element={<PrivateRoute element={<TwoFactorSetup />} />}
            />
          </Routes>
        </div>
      </Router>
    </SessionProvider>
  );
}

export default App;
