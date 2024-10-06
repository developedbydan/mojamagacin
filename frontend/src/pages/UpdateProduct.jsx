/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
// import { getAllSuppliers } from "../api/suppliers";
import { getProduct, updateProduct } from "../api/products";

import { Button, useToast } from "@chakra-ui/react";

import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const [values, setValues] = useState({
    id: id,
    name: "",
    price: "",
    quantity: "",
  });

  const navigate = useNavigate();
  const toast = useToast();

  const successToast = () => {
    toast({
      title: "Proizvod je ažuriran",
      description: "Uspešno ste ažuriali proizvod",
      status: "success",
      position: "bottom-right",
      duration: 6000,
      isClosable: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProduct(id, values);
      successToast();
    } catch (err) {
      console.error("Greška pri dodavanju proizvoda:", err);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProduct(id);
        setValues({
          ...values,
          name: res.data.name,
          price: res.data.price,
          quantity: res.data.quantity,
        });
      } catch (err) {
        console.error("Greška prilikom dobavljanja proizvoda", err);
      }
    };
    fetchProduct();
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
          Izmena Proizvoda
        </h2>
        <input
          placeholder="Naziv"
          type="text"
          required
          defaultValue={values.name}
          className="text-white bg-highlight py-2 px-3 rounded-md border-none focus:outline-none focus:ring-1 focus:ring-blue-500"
          onChange={(e) => setValues({ ...values, name: e.target.value })}
        />

        <div className=" relative text-white bg-highlight  rounded-md border-none ">
          <input
            type="number"
            min={1}
            name="quantity"
            required
            defaultValue={values.quantity}
            placeholder="Količina"
            className="text-white bg-highlight py-2 px-3 w-full border-none focus:outline-none rounded-md focus:ring-1 focus:ring-blue-500"
            onChange={(e) => setValues({ ...values, quantity: e.target.value })}
          />
          <p className="absolute top-2 right-3 text-gray-300 ">kom</p>
        </div>

        <div className=" relative text-white bg-highlight  rounded-md border-none ">
          <input
            min={1}
            name="price"
            type="number"
            required
            defaultValue={values.price}
            placeholder="Cena"
            className="text-white bg-highlight py-2 px-3 w-full border-none focus:outline-none rounded-md focus:ring-1 focus:ring-blue-500"
            onChange={(e) => setValues({ ...values, price: e.target.value })}
          />
          <p className="absolute top-2 right-3 text-gray-300 ">din</p>
        </div>

        <Button
          type="submit"
          bg="#3686FF"
          marginTop="8"
          color="white"
          _hover={{ bg: "#1472FF", color: "white" }}
        >
          Ažuriraj Proizvod
        </Button>
      </form>
    </div>
  );
};

export default UpdateProduct;
