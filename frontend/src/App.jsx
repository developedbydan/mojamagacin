import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Products from "./pages/Products.jsx";
import Suppliers from "./pages/Suppliers.jsx";
import Account from "./pages/Account.jsx";
import Settings from "./pages/Settings.jsx";

import Sidenav from "./components/Sidenav.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import NotFound from "./pages/NotFound.jsx";

const App = () => {
  const location = useLocation(); // Hook za praćenje trenutne putanje
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Lista ruta za Sidenav
  const routesWithSidenav = [
    "/kontrolna-tabla",
    "/magacin",
    "/dobavljaci",
    "/nalog",
    "/podesavanja",
  ];

  const showSideNav = routesWithSidenav.includes(location.pathname);

  return (
    <div className="h-lvh flex">
      {showSideNav && <Sidenav />}

      <Routes>
        <Route
          path="/"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />

        {/* Zaštićene rute */}
        <Route
          path="/kontrolna-tabla"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/magacin"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dobavljaci"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Suppliers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nalog"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Account setIsAuthenticated={setIsAuthenticated} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/podesavanja"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* Za nepostojece rute */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
