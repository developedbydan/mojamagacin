import { createContext, useState, useEffect } from "react";
import { checkAuthStatus, refreshAccessToken } from "../api/auth";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") return;

    const verifyAuth = async () => {
      const authStatus = await checkAuthStatus();
      setIsAuthenticated(authStatus);
    };

    verifyAuth();

    const intervalId = setInterval(async () => {
      try {
        await refreshAccessToken();
      } catch (err) {
        console.error("Greška pri osvežavanju tokena", err);
        setIsAuthenticated(false);
      }
    }, 2 * 60 * 1000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
