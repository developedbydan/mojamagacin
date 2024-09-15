import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth.js";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(
          err.response.data.message || "Došlo je do greške pri prijavljivanju."
        );
      } else {
        setError("Došlo je do greške pri prijavljivanju.");
      }
    }
  };

  return (
    <div className="flex flex-col  items-center  h-lvh bg-primary w-full ">
      <div className=" flex flex-col  items-center w-68  mt-40 bg-secondary p-10 rounded-xl">
        <h2 className="text-2xl text-white font-semibold  mb-12">MojMagacin</h2>
        <form onSubmit={handleLogin} className="flex flex-col items-center">
          <div className="w-full mb-8">
            <Input
              variant="outline"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-white"
            />
          </div>
          <div className="mb-3">
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Lozinka"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-white"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Sakrij" : "Prikaži"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </div>
          {error && <p className="text-red-700 ">{error}</p>}

          <Button
            type="submit"
            bg="#3686FF"
            marginTop="8"
            color="white"
            _hover={{ bg: "#1472FF", color: "white" }}
          >
            Prijavi se
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
