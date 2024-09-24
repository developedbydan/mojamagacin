import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Spinner } from "@chakra-ui/react";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated === undefined) {
    return (
      <div className="bg-primary w-full flex justify-center items-center">
        <Spinner color="#0E1438" />
      </div>
    );
  }

  return isAuthenticated === null ? (
    <div className="bg-primary w-full  flex justify-center items-center">
      <Spinner color="#0E1438" />
    </div>
  ) : isAuthenticated ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
