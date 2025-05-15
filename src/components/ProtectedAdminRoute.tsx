import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isAdmin } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user || !isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <>{children}</>;
}
