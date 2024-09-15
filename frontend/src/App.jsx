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

const App = () => {
  const location = useLocation(); // Hook za praćenje trenutne putanje

  return (
    <div className="h-lvh flex">
      {location.pathname !== "/login" && <Sidenav />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/magacin" element={<Products />} />
        <Route path="/dobavljaci" element={<Suppliers />} />
        <Route path="/nalog" element={<Account />} />
        <Route path="/podesavanja" element={<Settings />} />
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
