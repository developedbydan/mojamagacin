import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth.js";

// eslint-disable-next-line react/prop-types
const Account = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      setIsAuthenticated(false);
      navigate("/");
    } catch (err) {
      console.log("Greška pri odjvaljivanju", err);
    }
  };
  return (
    <div className="bg-primary w-10/12 px-10 pt-10 pb-20 ">
      <button
        className="text-white bg-red-700 p-3 rounded-md"
        onClick={handleLogout}
      >
        Odjavi se
      </button>
    </div>
  );
};

export default Account;