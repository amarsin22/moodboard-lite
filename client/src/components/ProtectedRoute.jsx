import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  // If no user, go to login instead of trying to render protected page
  if (!user) return <Navigate to="/login" replace />;
  
  return children;
}
