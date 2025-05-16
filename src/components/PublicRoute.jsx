// src/components/PublicRoute.js
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) return null;

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
