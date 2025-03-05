// import { Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const ProtectedRoute = ({ allowedRoles }) => {
//   const { user } = useSelector((state) => state.auth);

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (!allowedRoles.includes(user.role)) {
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;


import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = useSelector((state) => state.auth.role);
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
