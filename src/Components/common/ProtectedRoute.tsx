// ProtectedRoute component
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { vendorGetMe } from '../../api/vendor';
import { Loader } from './Loader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'customer' | 'vendor' | 'admin';
}

interface VendorUser {
  id: number;
  name: string;
  email: string;
  company_name: string;
  business_type: string;
  role: 'vendor';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();
  const [vendorUser, setVendorUser] = useState<VendorUser | null>(null);
  const [vendorLoading, setVendorLoading] = useState(true);

  // Check vendor authentication if requiredRole is 'vendor'
  useEffect(() => {
    if (requiredRole === 'vendor') {
      vendorGetMe()
        .then((data) => {
          setVendorUser({ ...data, role: 'vendor' });
        })
        .catch(() => {
          setVendorUser(null);
        })
        .finally(() => {
          setVendorLoading(false);
        });
    } else {
      setVendorLoading(false);
    }
  }, [requiredRole]);

  if (isLoading || vendorLoading) {
    return <Loader fullPage />;
  }

  // For vendor routes
  if (requiredRole === 'vendor') {
    if (!vendorUser) {
      return <Navigate to="/vendor/login" state={{ from: location }} replace />;
    }
    return <>{children}</>;
  }

  // For customer and admin routes
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
