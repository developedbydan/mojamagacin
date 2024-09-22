import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllCategories } from "../api/categories";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error("Greška prilikom dobavljanja kategorija", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-secondary w-1/3  rounded-xl px-10 py-8 border border-yellow-300 ">
      <h1 className="text-center text-2xl font-bold mb-10">Novi Proizvod</h1>
      <form action="POST" className="flex flex-col gap-5">
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
        >
          <option value="" disabled selected hidden>
            Odaberi kategoriju
          </option>
          {categories.map((category) => (
            <option key={category._id}>{category.name}</option>
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
