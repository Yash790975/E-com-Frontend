// // components/PrivateRoute.jsx - Create a component for protected routes

// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const PrivateRoute = () => {
//   const { isAuthenticated, loading } = useSelector(state => state.auth);
  
//   // If auth is being loaded, you might want to show a loading spinner
//   if (loading) {
//     return <div className="container text-center py-5">Loading...</div>;
//   }
  
//   // If not authenticated, redirect to login
//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// };

// export default PrivateRoute;


// ===================================2nd===================================



// // src/components/PrivateRoute.js
// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";

// const PrivateRoute = () => {
//   const { isAuthenticated } = useSelector(state => state.auth);
//   const location = useLocation();
  
//   // Store the current location before redirecting to login
//   if (!isAuthenticated) {
//     // Save the current path to redirect back after login
//     sessionStorage.setItem('redirectAfterLogin', location.pathname);
//     return <Navigate to="/login" />;
//   }

//   // If authenticated, render the protected routes
//   return <Outlet />;
// };

// export default PrivateRoute;


// ==============================3rd=======================================================


// // src/components/PrivateRoute.js
// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import React from "react";

// const PrivateRoute = () => {
//   const location = useLocation();
//   const token = localStorage.getItem("token");
  
//   if (!token) {
//     // Save the current path to redirect back after login
//     sessionStorage.setItem('redirectAfterLogin', location.pathname);
//     return <Navigate to="/login" />;
//   }

//   // If authenticated, render the protected routes
//   return <Outlet />;
// };

// export default PrivateRoute;


// ========================================4th======================================


// src/components/PrivateRoute.js
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) return null; // Optional: replace with spinner

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
