import { useEffect, useState } from "react";
import { getAllCategories } from "../api/categories";
import { getAllSuppliers } from "../api/suppliers";
import { addProduct } from "../api/products";

import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  useToast,
} from "@chakra-ui/react";

import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("1");
  const [quantity, setQuantity] = useState("1");
  const [category, setCategory] = useState("");
  const [supplier, setSupplier] = useState("");

  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const navigate = useNavigate();
  const toast = useToast();
  const parse = (val) => val.replace(/^\$/, "");

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
      position: "top-right",
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
      setQuantity("1");
      setPrice("1");
      setSupplier("");
    } catch (err) {
      console.error("Greška pri dodavanju proizvoda:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSuppliers();
  }, []);

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

        <NumberInput
          defaultValue={1}
          min={1}
          max={999}
          onChange={(quantityString) => setQuantity(parse(quantityString))}
          value={quantity}
        >
          <NumberInputField bg="#161f40" border="none" />
          <NumberInputStepper>
            <NumberIncrementStepper color="white" border="none" />
            <NumberDecrementStepper color="white" border="none" />
          </NumberInputStepper>
        </NumberInput>

        <NumberInput
          defaultValue={1}
          min={1}
          max={99999}
          onChange={(priceString) => setPrice(parse(priceString))}
          value={price}
        >
          <NumberInputField bg="#161f40" border="none" />
          <NumberInputStepper>
            <NumberIncrementStepper color="white" border="none" />
            <NumberDecrementStepper color="white" border="none" />
          </NumberInputStepper>
        </NumberInput>

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
