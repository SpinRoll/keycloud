// src/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ element }) {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? element : <Navigate to="/sign-in" replace />;
}

export default PrivateRoute;
