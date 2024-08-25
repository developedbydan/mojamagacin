/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth.js";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      console.log("Ulogovan");

      // Azuriranje stanja u App
      setIsLoggedIn(true);

      // Preusmeravanje na dashboard
      navigate("/");
    } catch (err) {
      setError("Greška pri prijavljivanju. Proveri email i lozinku.", err);
    }
  };
  return (
    <div>
      <h2>Prijavi se</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Lozinka:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Prijavi se</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
