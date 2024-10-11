import { useState } from "react";

import { Button, useToast } from "@chakra-ui/react";

import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { addSupplier } from "../api/suppliers";

const AddSupplier = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState();

  const navigate = useNavigate();
  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Dobavljač je dodat",
      description: "Uspešno ste dodali novog dobavljača.",
      status: "success",
      position: "bottom-right",
      duration: 6000,
      isClosable: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      address,
      contact,
    };

    try {
      await addSupplier(productData);
      successToast();
      setName("");
      setAddress("");
      setContact("");
    } catch (err) {
      console.error("Greška pri dodavanju proizvoda:", err);
    }
  };

  return (
    <div className="bg-primary w-full px-10   text-white flex justify-center items-center ">
      <ArrowBackIcon
        boxSize={8}
        className="absolute top-16 left-14 cursor-pointer"
        onClick={() => navigate(-1)}
      />

      <form
        action="POST"
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-1/2 py-16 px-10 bg-secondary rounded-xl"
      >
        <h2 className="text-center text-2xl font-bold mb-10">Novi Dobavljač</h2>
        <input
          placeholder="Naziv"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="text-white bg-highlight py-2 px-3 rounded-md border-none focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <input
          placeholder="Adresa"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="text-white bg-highlight py-2 px-3 rounded-md border-none focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <input
          placeholder="Kontakt broj"
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
          className="text-white bg-highlight py-2 px-3 rounded-md border-none focus:outline-none focus:ring-1 focus:ring-blue-500"
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

export default AddSupplier;
