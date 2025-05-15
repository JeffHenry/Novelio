import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return null; // or show a spinner

  // Redirect logged-in users to /books
  if (user) return <Navigate to="/books" replace />;

  return <>{children}</>;
}
