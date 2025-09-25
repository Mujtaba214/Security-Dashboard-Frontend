import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    // Redirect to signin but remember the requested page
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}
