import { Navigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
