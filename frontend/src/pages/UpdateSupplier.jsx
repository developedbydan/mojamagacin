/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { Button, useToast } from "@chakra-ui/react";

import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import { getSupplier, updateSupplier } from "../api/suppliers";

const UpdateSupplier = () => {
  const { id } = useParams();
  const [values, setValues] = useState({
    id: id,
    name: "",
    address: "",
    contact: "",
  });

  const navigate = useNavigate();
  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Dobavljač je ažuriran",
      description: "Uspešno ste ažuriali dobavljača",
      status: "success",
      position: "bottom-right",
      duration: 6000,
      isClosable: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateSupplier(id, values);
      successToast();
    } catch (err) {
      console.error("Greška pri azuriranju dobavljača:", err);
    }
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await getSupplier(id);
        setValues({
          ...values,
          name: res.data.name,
          address: res.data.address,
          contact: res.data.contact,
        });
      } catch (err) {
        console.error("Greška prilikom dobavljanja dobavljača", err);
      }
    };
    fetchSuppliers();
  }, [id]);
  return (
    <div className="bg-primary w-full px-10   text-white flex justify-center items-center ">
      <ArrowBackIcon
        boxSize={8}
        className="absolute top-16 left-14 cursor-pointer"
        onClick={() => navigate(-1)}
      />

      <form
        action="PUT"
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-1/2 py-16 px-10 bg-secondary rounded-xl"
      >
        <h2 className="text-center text-2xl font-bold mb-10">
          Izmena Dobavljača
        </h2>
        <input
          placeholder="Naziv"
          type="text"
          required
          defaultValue={values.name}
          className="text-white bg-highlight py-2 px-3 rounded-md border-none focus:outline-none focus:ring-1 focus:ring-blue-500"
          onChange={(e) => setValues({ ...values, name: e.target.value })}
        />

        <input
          placeholder="Adresa"
          type="text"
          required
          defaultValue={values.address}
          className="text-white bg-highlight py-2 px-3 rounded-md border-none focus:outline-none focus:ring-1 focus:ring-blue-500"
          onChange={(e) => setValues({ ...values, address: e.target.value })}
        />

        <input
          placeholder="Kontakt broj"
          type="text"
          required
          defaultValue={values.contact}
          className="text-white bg-highlight py-2 px-3 rounded-md border-none focus:outline-none focus:ring-1 focus:ring-blue-500"
          onChange={(e) => setValues({ ...values, contact: e.target.value })}
        />

        <Button
          type="submit"
          bg="#3686FF"
          marginTop="8"
          color="white"
          _hover={{ bg: "#1472FF", color: "white" }}
        >
          Ažuriraj Dobavljača
        </Button>
      </form>
    </div>
  );
};

export default UpdateSupplier;
