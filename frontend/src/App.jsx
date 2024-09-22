import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

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

  // Lista ruta za Sidenav
  const routesWithSidenav = [
    "/kontrolna-tabla",
    "/magacin",
    "/dobavljaci",
    "/nalog",
    "/podesavanja",
  ];

  const showSideNav = routesWithSidenav.includes(location.pathname);
  const authStatus = localStorage.getItem("isAuthenticated");

  return (
    <div className="h-lvh flex">
      {showSideNav && authStatus ? <Sidenav authStatus={authStatus} /> : null}

      <Routes>
        <Route path="/" element={<Login />} />

        {/* Zaštićene rute */}
        <Route path="/kontrolna-tabla" element={<Dashboard />} />
        <Route
          path="/magacin"
          element={
            <ProtectedRoute authStatus={authStatus}>
              <Products authStatus={authStatus} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dobavljaci"
          element={
            <ProtectedRoute authStatus={authStatus}>
              <Suppliers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nalog"
          element={
            <ProtectedRoute authStatus={authStatus}>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/podesavanja"
          element={
            <ProtectedRoute authStatus={authStatus}>
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
