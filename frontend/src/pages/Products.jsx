/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getAllProducts } from "../api/products.js";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import {
  SmallAddIcon,
  EditIcon,
  DeleteIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import AddProduct from "../components/AddProduct.jsx";

const Products = ({ authStatus }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error("Greška prilikom dobavljanja proizvoda", err);
    }
  };

  useEffect(() => {
    if (authStatus) {
      fetchProducts();
    }
  }, []);
  return (
    <div className=" bg-primary w-10/12  px-10 pt-10 pb-20 text-white  ">
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
        className=" mt-10 mb-12"
      >
        <BreadcrumbItem className="text-gray-500 text-sm font-bold">
          <BreadcrumbLink href="#">Početna</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage className="text-white text-sm font-bold">
          <BreadcrumbLink href="#">Magacin</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <div>
        {products.length > 0 ? (
          <div className="w-5/6 bg-secondary p-7 rounded-2xl">
            <div className="flex justify-between">
              <h4 className="font-meidum text-2xl font-semibold text-left mb-7">
                Tabela Proizvoda
              </h4>
              <div>
                <SmallAddIcon
                  boxSize={8}
                  className="bg-button rounded-full cursor-pointer hover:bg-blue-600"
                />
              </div>
            </div>
            <table className="w-full text-base  text-gray-500 dark:text-gray-400">
              <thead>
                <tr className="bg-highlight  ">
                  <th
                    scope="col"
                    className="pl-3 py-3 text-left font-medium rounded-l-lg"
                  >
                    Naziv
                  </th>
                  <th scope="col" className=" py-3  font-medium">
                    Količina
                  </th>
                  <th scope="col" className=" py-3  font-medium">
                    Cena
                  </th>
                  <th scope="col" className=" py-3  font-medium rounded-r-lg">
                    Akcija
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="pl-3 py-4 text-left">{product.name}</td>
                    <td className=" py-4 text-center ">{product.quantity}</td>
                    <td className=" py-4 text-center ">{product.price}</td>
                    <td className=" py-4 text-center">
                      <div className="flex justify-center gap-5">
                        <EditIcon
                          color={"yellow.400"}
                          className="cursor-pointer"
                        />
                        <DeleteIcon
                          color={"red.700"}
                          className="cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h3 className="text-white text-center text-2xl font-bold">
            Magacin je trenutno prazan. Dodajte proizvode.
          </h3>
        )}
      </div>
      <AddProduct />
    </div>
  );
};

export default Products;
