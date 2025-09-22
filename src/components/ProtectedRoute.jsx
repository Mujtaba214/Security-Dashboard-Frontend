import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router";


export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

