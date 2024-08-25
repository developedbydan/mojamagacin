import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth.js";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.log("Greška pri odjvaljivanju", err);
    }
  };

  return (
    <>
      <div>Dashboard</div>
      <button onClick={handleLogout}>Odjavi se</button>
    </>
  );
};

export default Dashboard;
