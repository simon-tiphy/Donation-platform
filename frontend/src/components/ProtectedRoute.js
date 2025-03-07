import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ role, children }) => {
  const { isAuthenticated, role: userRole } = useSelector((state) => state.auth);

  if (!isAuthenticated || userRole !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;