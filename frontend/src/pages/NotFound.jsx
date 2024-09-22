import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col items-center justify-center  bg-primary w-full">
      <h1 className="text-4xl text-white mb-8">
        404 - Stranica nije pronađena
      </h1>
      <Button bg="#3686FF" color="white" onClick={() => navigate(-1)}>
        Nazad
      </Button>
    </div>
  );
};

export default NotFound;
