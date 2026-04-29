import { Navigate, useLocation } from "react-router-dom";
import { getStoredUser, getToken } from "../lib/auth";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = getToken();
  const user = getStoredUser();

  if (!token || !user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
