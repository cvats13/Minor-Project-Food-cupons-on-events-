// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { getToken, decodeToken } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  try {
    const decoded = decodeToken(token);
    const currentTime = Date.now() / 1000;

    // If token is expired
    if (decoded?.exp && decoded.exp < currentTime) {
      localStorage.removeItem("token");
      return <Navigate to="/signin" replace />;
    }

    return children; // ✅ Valid token → show the protected page
  } catch (error) {
    console.error("❌ Invalid token:", error);
    localStorage.removeItem("token");
    return <Navigate to="/signin" replace />;
  }
};

export default ProtectedRoute;
