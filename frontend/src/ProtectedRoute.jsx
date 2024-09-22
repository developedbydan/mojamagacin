import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ authStatus, children }) => {
  console.log("isAuthenticated:", authStatus); // Proverite vrednost

  if (!authStatus) {
    console.log("Preusmeravanje na login stranicu...");
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
