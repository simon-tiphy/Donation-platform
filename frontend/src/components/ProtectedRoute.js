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


// import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProtectedRoute = ({ allowedRoles }) => {
//   const { user } = useSelector((state) => state.auth);

//   if (!user) return <Navigate to="/login" />;

//   return allowedRoles.includes(user.role) ? <Outlet /> : <Navigate to="/" />;
// };

// export default ProtectedRoute;


import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo || !allowedRoles.includes(userInfo.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
