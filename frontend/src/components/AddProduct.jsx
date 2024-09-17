import { Input, Button } from "@chakra-ui/react";
import { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  return (
    <div className="absolute top-1/3 left-1/3 bg-secondary w-1/3 rounded-xl px-10 py-8 border border-yellow-300 ">
      <h1 className="text-center text-2xl font-bold">Novi Proizvod</h1>
      <form action="POST" className="flex flex-col">
        <Input
          variant="outline"
          placeholder="Naziv"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="text-white"
        />
        <Button
          type="submit"
          bg="#3686FF"
          marginTop="8"
          color="white"
          _hover={{ bg: "#1472FF", color: "white" }}
        >
          Dodaj Proizvod
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
