// ProtectedRoute component
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader } from './Loader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'customer' | 'vendor' | 'admin';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loader fullPage />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// AdminRoute component - Strictly for admin access only
// Redirects non-admin users to their respective login pages
export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <Loader fullPage />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin-panel/login" replace />;
  }

  if (user?.role !== 'admin') {
    // Redirect non-admins to appropriate login based on their role
    if (user?.role === 'vendor') {
      return <Navigate to="/vendor/login" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
