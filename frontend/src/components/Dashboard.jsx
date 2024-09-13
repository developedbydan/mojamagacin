/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { logout, refreshAccessToken } from "../api/auth.js";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    refreshAccessToken();
  }, []);

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
    <div className="min-h-lvh bg-slate-950 flex">
      <div className="w-2/12 flex flex-col bg-slate-900 px-5 py-5 ">
        <h1 className="text-white text-2xl font-bold mt-5 mb-20 pl-2">
          MojMagacin
        </h1>
        <h2 className="text-white py-2 pl-2 pr-20 bg-blue-600 rounded-md font-medium text-sm mb-3 cursor-pointer">
          Kontrolna tabla
        </h2>
        <h2 className="text-slate-400 py-2 pl-2 pr-20 font-medium text-sm mb-3 cursor-pointer">
          Magacin
        </h2>
        <h2 className="text-slate-400  py-2 pl-2 pr-20 font-medium text-sm mb-3 cursor-pointer">
          Dobavljači
        </h2>
        <h2 className="text-slate-400  py-2 pl-2 pr-20 font-medium text-sm mb-3 cursor-pointer">
          Nalog
        </h2>
        <h2 className="text-slate-400  py-2 pl-2 pr-20 font-medium text-sm mb-3 cursor-pointer">
          Podešavanja
        </h2>
      </div>
      <div className=" w-11/12 flex flex-col items-center justify-center gap-5">
        <h2 className="text-white text-center text-2xl font-bold">Dashboard</h2>
        <button
          className="text-white bg-red-700 p-3 rounded-md"
          onClick={handleLogout}
        >
          Odjavi se
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
