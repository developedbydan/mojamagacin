import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Products from "./pages/Products.jsx";
import Suppliers from "./pages/Suppliers.jsx";
import Account from "./pages/Account.jsx";
import Settings from "./pages/Settings.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import UpdateProduct from "./pages/UpdateProduct.jsx";

import Sidenav from "./components/Sidenav.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import NotFound from "./pages/NotFound.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);

  // Lista ruta za Sidenav
  const routesWithSidenav = [
    "/kontrolna-tabla",
    "/dobavljaci",
    "/nalog",
    "/podesavanja",
    "/magacin",
  ];

  const showSideNav = routesWithSidenav.includes(location.pathname);

  return (
    <div className="h-lvh flex overflow-hidden">
      {showSideNav && isAuthenticated ? (
        <Sidenav authStatus={isAuthenticated} />
      ) : null}

      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/kontrolna-tabla"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/magacin"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dodaj-proizvod"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/azuriraj-proizvod/:id"
          element={
            <ProtectedRoute>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dobavljaci"
          element={
            <ProtectedRoute>
              <Suppliers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nalog"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/podesavanja"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

// const AppWrapper = () => (
//   <Router>
//     <App />
//   </Router>
// );

export default App;
