import { Navigate } from "react-router-dom";
import { getToken, decodeToken } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  try {
    const decoded = decodeToken();
    const currentTime = Date.now() / 1000;

    // If token expired
    if (decoded.exp && decoded.exp < currentTime) {
      localStorage.removeItem("token");
      return <Navigate to="/signin" replace />;
    }

    return children; // ✅ token valid
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/signin" replace />;
  }
};

export default ProtectedRoute;
