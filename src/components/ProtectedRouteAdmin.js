import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRouteAdmin = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);
    const roles = decoded.rol || [];
    const isAdmin = roles.some(r => r.authority === "ROLE_ADMIN");

    return isAdmin ? children : <Navigate to="/" />;
  } catch {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRouteAdmin;
