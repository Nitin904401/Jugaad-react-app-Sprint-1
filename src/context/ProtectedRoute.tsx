import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { ReactNode } from "react";

type Role = "customer" | "vendor" | "admin";

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: Role[];
}

export const ProtectedRoute = ({
  children,
  roles,
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
