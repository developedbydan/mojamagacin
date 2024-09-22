import { createContext, useState, useEffect } from "react";
import { refreshAccessToken } from "../api/auth";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      // Proveri autentifikaciju
      const tokenExists = document.cookie.includes("access_token");
      setIsAuthenticated(tokenExists);
    };

    checkAuthStatus();

    const intervalId = setInterval(async () => {
      try {
        await refreshAccessToken(); // Osvezi token
      } catch (err) {
        console.error("Greška pri osvežavanju tokena", err);
        setIsAuthenticated(false);
      }
    }, 14 * 60 * 1000); // Svakih 14 minuta

    return () => clearInterval(intervalId);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
