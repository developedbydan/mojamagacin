/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getAllCategories } from "../api/categories";
import { getAllSuppliers } from "../api/suppliers";
import { addProduct } from "../api/products";

import { Button, useToast } from "@chakra-ui/react";

import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState();
  const [category, setCategory] = useState("");
  const [supplier, setSupplier] = useState("");

  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const navigate = useNavigate();
  const toast = useToast();

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error("Greška prilikom dobavljanja kategorija", err);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const data = await getAllSuppliers();
      setSuppliers(data);
    } catch (err) {
      console.error("Greška prilikom dobavljanja dobavljača", err);
    }
  };

  const successToast = () => {
    toast({
      title: "Proizvod je dodat",
      description: "Uspešno ste dodali novi proizvod u magacin",
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
      category,
      quantity,
      price,
      supplier,
    };

    try {
      await addProduct(productData);
      successToast();
      setName("");
      setCategory("");
      setQuantity("");
      setPrice("");
      setSupplier("");
    } catch (err) {
      console.error("Greška pri dodavanju proizvoda:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCategories();
      await fetchSuppliers();
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (categories.length > 0 && !category) {
      setCategory(categories[0]._id); // postavi prvu kategoriju kao default
    }
    if (suppliers.length > 0 && !supplier) {
      setSupplier(suppliers[0]._id); // postavi prvog dobavljača kao default
    }
  }, [categories, suppliers]);

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
        <h2 className="text-center text-2xl font-bold mb-10">Novi Proizvod</h2>
        <input
          placeholder="Naziv"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="text-white bg-highlight py-2 px-3 rounded-md border-none focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <select
          name="category"
          id="category"
          placeholder="Kategorija"
          className="bg-highlight cursor-pointer py-2 px-3 rounded-md border-none focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <div className=" relative text-white bg-highlight  rounded-md border-none ">
          <input
            type="number"
            min={1}
            name="quantity"
            value={quantity}
            required
            placeholder="Količina"
            onChange={(e) => setQuantity(e.target.value)}
            className="text-white bg-highlight py-2 px-3 w-full border-none focus:outline-none rounded-md focus:ring-1 focus:ring-blue-500"
          />
          <p className="absolute top-2 right-3 text-gray-300 ">kom</p>
        </div>

        <div className=" relative text-white bg-highlight  rounded-md border-none ">
          <input
            min={1}
            name="price"
            type="number"
            value={price}
            required
            placeholder="Cena"
            onChange={(e) => setPrice(e.target.value)}
            className="text-white bg-highlight py-2 px-3 w-full border-none focus:outline-none rounded-md focus:ring-1 focus:ring-blue-500"
          />
          <p className="absolute top-2 right-3 text-gray-300 ">din</p>
        </div>

        <select
          name="suppliers"
          id="suppliers"
          placeholder="Dobavljač"
          className="bg-highlight cursor-pointer py-2 px-3 rounded-md border-none focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
        >
          {suppliers.map((supplier) => (
            <option key={supplier._id} value={supplier._id}>
              {supplier.name}
            </option>
          ))}
        </select>
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
