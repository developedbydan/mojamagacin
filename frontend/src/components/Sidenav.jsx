import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getUser } from "../api/auth";
import { UserCircle } from "@phosphor-icons/react";

// eslint-disable-next-line react/prop-types
const Sidenav = ({ authStatus }) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getUsername = async () => {
      try {
        const res = await getUser();
        setUsername(res.username);
      } catch (err) {
        console.log("Greška prilikom dobavljanja korisničkog imena.", err);
      }
    };
    if (authStatus) {
      getUsername();
    }
  }, []);

  return (
    <>
      <div className="w-2/12 flex flex-col bg-secondary px-5 py-5 ">
        <h1 className="text-white text-2xl font-bold mt-5 mb-20 pl-2">
          MojMagacin
        </h1>
        <NavLink
          to="/kontrolna-tabla"
          className={({ isActive }) =>
            isActive
              ? "text-white py-2 pl-2 pr-20 bg-button rounded-md font-bold  text-sm mb-3 cursor-pointer"
              : "text-slate-400  py-2 pl-2 pr-20 font-medium text-sm mb-3 cursor-pointer"
          }
        >
          Kontrolna tabla
        </NavLink>

        <NavLink
          to="/magacin"
          className={({ isActive }) =>
            isActive
              ? "text-white py-2 pl-2 pr-20 bg-button rounded-md font-bold  text-sm mb-3 cursor-pointer"
              : "text-slate-400  py-2 pl-2 pr-20 font-medium text-sm mb-3 cursor-pointer"
          }
        >
          Magacin
        </NavLink>

        <NavLink
          to="/dobavljaci"
          className={({ isActive }) =>
            isActive
              ? "text-white py-2 pl-2 pr-20 bg-button rounded-md font-bold  text-sm mb-3 cursor-pointer"
              : "text-slate-400  py-2 pl-2 pr-20 font-medium text-sm mb-3 cursor-pointer"
          }
        >
          Dobavljači
        </NavLink>

        <NavLink
          to="/podesavanja"
          className={({ isActive }) =>
            isActive
              ? "text-white py-2 pl-2 pr-20 bg-button rounded-md font-bold text-sm mb-3 cursor-pointer"
              : "text-slate-400  py-2 pl-2 pr-20 font-medium text-sm mb-3 cursor-pointer"
          }
        >
          Podešavanja
        </NavLink>

        <NavLink
          to="/nalog"
          className="text-slate-400 py-4 pl-5 pr-20 font-medium text-sm mb-3 cursor-pointer mt-auto rounded-xl flex items-center gap-2 bg-highlight"
        >
          <UserCircle size={22} />
          {username}
        </NavLink>
      </div>
    </>
  );
};

export default Sidenav;
