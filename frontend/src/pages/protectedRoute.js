import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Auth';

const ProtectedRoute = ({ children }) => {
  const jwtToken = useAuth();
  const location = useLocation();

  const isTokenValid = jwtToken;

  if (!isTokenValid) {
    // Redirect to login page, preserving the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;